class BasePersist {
  /**
   * Create an instance of persistence with the unique namespace identifier
   * @param namespace
   */
  constructor (namespace, storage) {
    this.namespace = namespace
    this.storage = storage
  }

  /**
   * Set state in the persistence store
   * @param key
   * @param state
   */
  setState (state) {
    if (state) {
      this.storage.setItem(`${this.namespace}:state`, typeof state === 'string' ? state : JSON.stringify(state))
      this.storage.setItem(`${this.namespace}:lastUpdated`, new Date().getTime().toString())
    } else {
      this.removeState()
    }
  }

  /**
   * Get state from the persistence store
   * @returns {string}
   */
  getState () {
    return JSON.parse(this.storage.getItem(`${this.namespace}:state`))
  }

  /**
   * Get the last updated time in milliseconds since the Unix Epoch
   * @returns {number}
   */
  lastUpdated () {
    return parseInt(this.storage.getItem(`${this.namespace}:lastUpdated`), 10)
  }

  /**
   * Remove state from the persistence store
   */
  removeState () {
    this.storage.removeItem(`${this.namespace}:state`)
    this.storage.removeItem(`${this.namespace}:lastUpdated`)
  }
}

class Store {
  constructor (options) {
    const self = this

    // Add some default objects to hold our getters, actions, mutations and state
    self.getters = {}
    self.actions = {}
    self.mutations = {}
    self.state = {}

    // create a getter cache
    self.getterCache = {}

    // A status enum to set during actions and mutations
    self.status = 'resting'

    // Transactional flag for batch actions/mutations without triggering re-rendering
    self.transaction = false
    self.transactionCache = {}

    // We store callbacks for when the state changes in here
    self.callbacks = []

    // Look in the passed params object for getters, actions and mutations
    // that might have been passed in
    if (options.getters) {
      self.getters = new Proxy((options.getters || {}), {
        get (getters, key) {
          // check the getter cache first
          if (!self.getterCache[key]) {
            const result = getters[key](self.state)
            self.getterCache[key] = result
          }
          return self.getterCache[key]
        }
      })
    }

    if (options.actions) {
      self.actions = options.actions
    }

    if (options.mutations) {
      self.mutations = options.mutations
    }

    // initial state values
    let initialState = options.initialState || {}
    self.copyOfInitialState = self._copyValue(initialState)

    // time to live settings
    self.ttl = -1
    self.lastUpdatedState = {}
    if (options.ttl) {
      self.ttl = options.ttl
      Object.keys(self.copyOfInitialState).forEach(k => (self.lastUpdatedState[k] = new Date().getTime()))
    }

    // persistence
    if (options.persist) {
      self.persist = typeof options.persist === 'string' ? createPersist(options.persist) : options.persist

      // check for initial state
      const initState = self.persist.getState()
      const lastUpdated = self.persist.lastUpdated()
      if (initState &&
        lastUpdated &&
        (self.ttl === -1 || self._lastUpdatedTimeDiff(lastUpdated) < self.ttl)) {
        initialState = initState
      }
    }

    // set-up state
    this._processState(initialState)
  }

  /**
   * Set-up the internal state object
   * @param {object} initialState
   * @private
   */
  _processState (initialState) {
    const self = this
    // Set our state to be a Proxy. We are setting the default state by
    // checking the params and defaulting to an empty object if no default
    // state is passed in
    self.state = new Proxy(initialState, {
      set (state, key, value) {
        // cache first value changed if we're in transaction mode
        if (self.transaction && !self.transactionCache[key]) {
          self.transactionCache[key] = self._copyValue(state[key])
        }

        // Set the value as we would normally
        state[key] = value
        self.lastUpdatedState[key] = new Date().getTime()

        // clear the getter cache
        self.getterCache = {}

        if (self.status !== 'clear') {
          // Fire off our callback processor because if there's listeners,
          // they're going to want to know that something has changed
          self._processCallbacks(self.state)

          // Reset the status ready for the next operation
          self.status = 'resting'
        }

        return true
      },
      get (state, key) {
        if (self.ttl > -1 && self._lastUpdatedTimeDiff(self.lastUpdatedState[key]) > self.ttl) {
          if (self.persist) {
            self.persist.removeState()
          }
          return self.copyOfInitialState[key]
        }
        return state[key]
      }
    })
  }

  /**
   * Last updated state time difference in seconds
   * @param key
   * @returns {number}
   * @private
   */
  _lastUpdatedTimeDiff (value) {
    return Math.round((new Date().getTime() - value) / 1000)
  }

  /**
   * A dispatcher for actions that looks in the actions
   * collection and runs the action if it can find it
   *
   * @param {string} actionKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch (actionKey, payload) {
    // Run a quick check to see if the action actually exists
    // before we try to run it
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Dude, the store action "${actionKey}" doesn't exist.`)
      return false
    }

    // Let anything that's watching the status know that we're dispatching an action
    this.status = 'action'

    // Actually call the action and pass it the Store context and whatever payload was passed
    return this.actions[actionKey](this, payload)
  }

  /**
   * Look for a mutation and modify the state object
   * if that mutation exists by calling it
   *
   * @param {string} mutationKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  commit (mutationKey, payload) {
    // Run a quick check to see if this mutation actually exists
    // before trying to run it
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.error(`Dude, the store mutation "${mutationKey}" doesn't exist`)
      return false
    }

    // Let anything that's watching the status know that we're mutating state
    this.status = 'mutation'

    // Get a new version of the state by running the mutation and storing the result of it
    const newState = this.mutations[mutationKey](this.state, payload)

    // Update the old state with the new state returned from our mutation
    this.state = newState

    // if we have persistence pass the new state to it
    if (this.persist) {
      this.persist.setState(newState)
    }

    return true
  }

  /**
   * Fire off each callback that's run whenever the state changes
   * We pass in some data as the one and only parameter.
   * Returns a boolean indicating if the callbacks were called
   * @private
   * @param {object} data
   * @returns {boolean}
   */
  _processCallbacks (data) {
    if (!this.callbacks.length || this.transaction) {
      return false
    }

    // We've got callbacks, so loop each one and fire it off
    this.callbacks.forEach(callback => callback(data))

    return true
  }

  /**
   * Allow an outside entity to subscribe to state changes with a valid callback.
   * Returns a function for unsubscription
   *
   * @param {function} callback
   * @returns {function}
   */
  subscribe (callback) {
    if (typeof callback !== 'function') {
      console.error('Dude, you can only subscribe to store changes with a valid function')
      return false
    }

    // create an unsubscribe function
    const unsubscribe = () => {
      this.callbacks = this.callbacks.filter(c => c !== callback)
    }

    // A valid function, so it belongs in our collection
    this.callbacks.push(callback)

    return unsubscribe
  }

  /**
   * Copy any value
   * @param value
   * @returns {any}
   * @private
   */
  _copyValue (value) {
    return JSON.parse(JSON.stringify(value))
  }

  /**
   * Begin a sequence of store changes as a single unit of work
   */
  begin () {
    this.transactionCache = {}
    this.transaction = true
  }

  /**
   * End the sequence of changes made to the store and notify subscribers
   */
  end () {
    this.transaction = false
    this._processCallbacks(this.state)
  }

  /**
   * Rollback a sequence of store changes
   */
  rollback () {
    Object.keys(this.transactionCache).forEach(k => (this.state[k] = this.transactionCache[k]))
    this.end()
  }

  /**
   * Clear the store and reset back to the initial state
   * @param {boolean} notifySubscribers A boolean to indicate if subscribers should be notified
   */
  clear (notifySubscribers = true) {
    this.getterCache = {}
    this.transactionCache = {}
    this.lastUpdatedState = {}

    // remove any persistence
    if (this.persist) {
      this.persist.removeState()
    }

    // set the special clear status
    this.status = 'clear'

    // merge the copy of initial state with the current state
    const initialState = this._copyValue(this.copyOfInitialState)
    for (const key in initialState) {
      this.state[key] = initialState[key]
    }

    this.status = 'resting'

    if (notifySubscribers) this._processCallbacks(this.state)
  }
}

/**
 * Function to create a store instance
 * @param key
 * @param options
 * @returns {Store}
 */
export function createStore (key, options) {
  const store = new Store(options)
  if (typeof window !== 'undefined') {
    window.__ficusjs__ = window.__ficusjs__ || {}
    window.__ficusjs__.store = window.__ficusjs__.store || {}
    window.__ficusjs__.store[key] = store
  }
  return store
}

/**
 * Function to create persistence for the store
 * @param {string} namespace
 * @param {string} storageName
 * @returns {BasePersist}
 */
export function createPersist (namespace, storageName = 'session') {
  if (storageName === 'local') {
    return new BasePersist(namespace, window.localStorage)
  }
  return new BasePersist(namespace, window.sessionStorage)
}

/**
 * Function to retrieve a Store instance
 * @param {string} key
 * @returns {T}
 */
export function getStore (key) {
  if (typeof window !== 'undefined' && window.__ficusjs__ && window.__ficusjs__.store && window.__ficusjs__.store[key]) {
    return window.__ficusjs__.store[key]
  }
}
