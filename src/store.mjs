import { isPromise } from './util/is-promise.mjs'

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
    const state = this.storage.getItem(`${this.namespace}:state`)
    return state ? JSON.parse(state) : undefined
  }

  /**
   * Get the last updated time in milliseconds since the Unix Epoch
   * @returns {number}
   */
  lastUpdated () {
    const lastUpdated = this.storage.getItem(`${this.namespace}:lastUpdated`)
    return lastUpdated ? parseInt(lastUpdated, 10) : undefined
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
    // self.getters = {}
    self.actions = {}
    // self.mutations = {}
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

    if (options.actions) {
      self.actions = options.actions
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

        if (!self.transaction) {
          // if we have persistence pass the new state to it
          if (self.persist) {
            self.persist.setState(self.state)
          }

          // Reset the status ready for the next operation
          self.status = 'resting'

          // Fire off our callback processor because if there's listeners,
          // they're going to want to know that something has changed
          self._processCallbacks(self.state)
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
   * @memberOf Store
   */
  dispatch (actionKey, payload) {
    // Run a quick check to see if the action actually exists
    // before we try to run it
    if (typeof this.actions[actionKey] !== 'function') {
      throw new Error(`Dude, the store action "${actionKey}" doesn't exist.`)
    }

    // Let anything that's watching the status know that we're dispatching an action
    this.status = 'action'

    // Actually call the action and pass it the Store context and whatever payload was passed
    return this.actions[actionKey](this, payload)
  }

  /**
   * A method to set state
   * @param {Function|Promise} stateFn
   * @memberOf Store
   */
  setState (stateFn) {
    const setter = data => {
      if (!data || typeof data !== 'object') return

      const isExistingTransaction = this.transaction

      // begin a transaction
      if (!isExistingTransaction) this.begin()

      for (const key in data) {
        if (!this.state[key] || (this.state[key] !== data[key])) this.state[key] = data[key]
      }

      // end the transaction
      if (!isExistingTransaction) this.end()
    }

    // Get a new version of the state by running the mutation and storing the result of it
    const res = stateFn(this.state)

    // set the state
    isPromise(res) ? res.then(setter) : setter(res)
  }

  /**
   * A method to return state
   * @param {string} key
   * @returns {undefined|*}
   */
  getState (key) {
    // If path is not defined or it has false value
    if (!key) return undefined

    // check the getter cache first
    if (!this.getterCache[key]) {
      // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
      // Regex explained: https://regexr.com/58j0k
      const keyArray = Array.isArray(key) ? key : key.match(/([^[.\]])+/g)

      // get the result
      const result = keyArray.reduce((prevObj, key) => prevObj && prevObj[key], this.state)

      // if the result is not defined
      if (result == null) return undefined

      // cache the result
      this.getterCache[key] = result
    }

    return this.getterCache[key]
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
    if (!this.callbacks.length) {
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
      throw new Error('Dude, you can only subscribe to store changes with a valid function')
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
    if (!value) return value
    return JSON.parse(JSON.stringify(value))
  }

  /**
   * Begin a sequence of store changes as a single unit of work
   * @memberOf Store
   */
  begin () {
    this.transactionCache = {}
    this.transaction = true
  }

  /**
   * End the sequence of changes made to the store and notify subscribers
   * @memberOf Store
   */
  end () {
    this.transaction = false

    // if we have persistence pass the new state to it
    if (this.persist) {
      this.persist.setState(this.state)
    }

    this._processCallbacks(this.state)
  }

  /**
   * Rollback a sequence of store changes
   * @memberOf Store
   */
  rollback () {
    Object.keys(this.transactionCache).forEach(k => (this.state[k] = this.transactionCache[k]))
    this.end()
  }

  /**
   * Clear the store and reset back to the initial state
   * @param {boolean} notifySubscribers A boolean to indicate if subscribers should be notified
   * @memberOf Store
   */
  clear (notifySubscribers = true) {
    this.getterCache = {}
    this.transactionCache = {}
    this.lastUpdatedState = {}

    // remove any persistence
    if (this.persist) {
      this.persist.removeState()
    }

    // start a transaction
    this.transaction = true
    this.status = 'clear'

    // merge the copy of initial state with the current state
    const initialState = this._copyValue(this.copyOfInitialState)
    for (const key in initialState) {
      this.state[key] = initialState[key]
    }

    this.transaction = false
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
  globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
  globalThis.__ficusjs__.store = globalThis.__ficusjs__.store || {}
  globalThis.__ficusjs__.store[key] = store
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
    return new BasePersist(namespace, globalThis.localStorage)
  }
  return new BasePersist(namespace, globalThis.sessionStorage)
}

/**
 * Function to retrieve a Store instance
 * @param {string} key
 * @returns {T}
 */
export function getStore (key) {
  if (globalThis.__ficusjs__ && globalThis.__ficusjs__.store && globalThis.__ficusjs__.store[key]) {
    return globalThis.__ficusjs__.store[key]
  }
}
