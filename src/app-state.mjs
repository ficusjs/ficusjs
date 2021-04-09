import { isPromise } from './util/is-promise.mjs'
import { createPersist } from './base-persist.mjs'

class Store {
  constructor (options) {
    const self = this

    // An object to hold our state
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

    // Allow actions to be added to this instance
    this._processActions(options)

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
   * Attach actions to the store instance
   * @param {object} options
   * @private
   */
  _processActions (options) {
    const self = this
    const keys = Object.keys(options)
    if (!keys.length) return

    // Run through and bind to the component instance
    keys.forEach(key => {
      if (!self[key] && typeof options[key] === 'function') {
        self[key] = options[key].bind(self)
      }
    })
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
   * @param {number} value
   * @returns {number}
   * @private
   */
  _lastUpdatedTimeDiff (value) {
    return Math.round((new Date().getTime() - value) / 1000)
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
      if (!isExistingTransaction) {
        this.transactionCache = {}
        this.transaction = true
      }

      for (const key in data) {
        if (!this.state[key] || (this.state[key] !== data[key])) this.state[key] = data[key]
      }

      // end the transaction
      if (!isExistingTransaction) {
        this.transaction = false

        // if we have persistence pass the new state to it
        if (this.persist) {
          this.persist.setState(this.state)
        }

        this._processCallbacks(this.state)
      }
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
 * @param {string} key
 * @param {object} options
 * @returns {Store}
 */
function createAppState (key, options) {
  let store = getAppState(key)
  if (store) return store
  store = new Store(options)
  globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
  globalThis.__ficusjs__.store = globalThis.__ficusjs__.store || {}
  globalThis.__ficusjs__.store[key] = store
  return store
}

/**
 * Function to retrieve a Store instance
 * @param {string} key
 * @returns {Store|undefined}
 */
function getAppState (key) {
  if (globalThis.__ficusjs__ && globalThis.__ficusjs__.store && globalThis.__ficusjs__.store[key]) {
    return globalThis.__ficusjs__.store[key]
  }
}

export { createAppState, getAppState, createPersist }
