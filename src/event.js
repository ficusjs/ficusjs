class Events {
  constructor () {
    if (typeof window !== 'undefined' && window.__ficusjs__ && window.__ficusjs__.events) {
      return window.__ficusjs__.events
    }
    this.events = {}
    if (typeof window !== 'undefined') {
      window.__ficusjs__ = window.__ficusjs__ || {}
      window.__ficusjs__.events = window.__ficusjs__.events || this
    }
  }

  /**
   * Either create a new event instance for passed `event` name
   * or push a new callback into the existing collection
   *
   * @param {string} event
   * @param {function} callback
   * @returns {number} A count of callbacks for this event
   * @memberof Events
   */
  subscribe (event, callback) {
    const self = this

    // If there's not already an event with this name set in our collection
    // go ahead and create a new one and set it with an empty array, so we don't
    // have to type check it later down-the-line
    if (!self.events[event]) {
      self.events[event] = []
    }

    // create an unsubscribe function
    const unsubscribe = () => {
      self.events[event] = self.events[event].filter(c => c !== callback)
    }

    // We know we've got an array for this event, so push our callback in there with no fuss
    self.events[event].push(callback)

    return unsubscribe
  }

  /**
   * If the passed event has callbacks attached to it, loop through each one
   * and call it
   *
   * @param {string} event
   * @param {object} [data={}]
   * @returns {array} The callbacks for this event, or an empty array if no event exits
   * @memberof Events
   */
  publish (event, data = {}) {
    const self = this

    // There's no event to publish to, so bail out
    if (!self.events[event]) {
      return []
    }

    // Get each subscription and call its callback with the passed data
    return self.events[event].map(callback => callback(data))
  }
}

/**
 * Function to create an Events instance
 * @returns {Events}
 */
export function createEvents () {
  return new Events()
}

/**
 * Function to get the running Events instance
 * @returns {Events}
 */
export function getEvents () {
  return createEvents()
}
