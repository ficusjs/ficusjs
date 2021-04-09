class BasePersist {
  /**
   * Create an instance of persistence with the unique namespace identifier
   * @param {string} namespace
   * @param {object} storage
   */
  constructor (namespace, storage) {
    this.namespace = namespace
    this.storage = storage
  }

  /**
   * Set state in the persistence store
   * @param {*} state
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
