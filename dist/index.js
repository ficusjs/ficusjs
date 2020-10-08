function toKebabCase (str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function collateObservedAttrs (props) {
  if (!props) return []
  const oa = [];
  const opk = Object.keys(props);
  opk.forEach(k => {
    if (props[k].observed != null && !props[k].observed) return
    oa.push(toKebabCase(k));
  });
  return oa
}

function isPromise (obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function emit (elem, name, opts = {}) {
  const defs = {
    bubbles: true,
    cancelable: true,
    composed: false
  };
  const eventOptions = Object.assign({}, defs, opts);
  let e;
  if ('composed' in CustomEvent.prototype) {
    e = new CustomEvent(name, eventOptions);
  } else {
    e = document.createEvent('CustomEvent');
    e.initCustomEvent(
      name,
      eventOptions.bubbles,
      eventOptions.cancelable,
      eventOptions.detail
    );
    Object.defineProperty(e, 'composed', { value: eventOptions.composed });
  }
  return elem.dispatchEvent(e)
}

/* global HTMLElement */

function createComponent (tagName, props) {
  const observedAttrs = collateObservedAttrs(props.props);

  window.customElements.get(tagName) ||
  window.customElements.define(
    tagName,
    class FicusComponent extends HTMLElement {
      // standard HTMLElement props and lifecycle hooks

      static get observedAttributes () {
        return observedAttrs
      }

      connectedCallback () {
        this._checkInit();
        this._preprocess();
      }

      disconnectedCallback () {
        if (typeof this.removed === 'function') {
          this.removed();
          this.isRemovedCalled = true;
        }
      }

      attributeChangedCallback () {
        this._checkInit();
        this._preprocess();
      }

      // custom props and private methods

      get initialised () {
        return this._props && this._state && this._computed && this.templateRenderer
      }

      _checkInit () {
        if (!this.initialised) {
          this._init(props);
        }
      }

      _init (options) {
        // It's handy to access what was passed through originally, so we'll store in private props
        this._props = options.props || {};
        this._computed = options.computed || {};

        // check the state
        if (options.state && typeof options.state !== 'function') throw new Error('State must be a function!')
        this._state = options.state || {};

        // create a cache for the computed functions
        this.computedCache = {};

        // A status enum to set during operations
        this.status = 'render';

        // Run passed props through the props processor
        this.props = this._processProps();

        // Take whatever is passed and set it as a proxy in local state
        if (typeof this._state === 'function') {
          this._state = this._state.bind(this)();
        }
        this.state = this._monitorState(this._state);

        // Allow methods and computed properties to be added to this instance
        this._processMethodsAndComputedProps(options);

        // Determine what our root is. It can be a pointer for `this` or a shadow root
        this.root = this._processRoot(options.root);

        // do we have child nodes, if so create them as slots
        this.slots = this._processSlots();

        // Pull out a render method if there is one defined
        this.render = options.render || null;

        // set the default template renderer
        this.templateRenderer = options.renderer;

        // Create a template instance we can call with each render
        this.template = null;

        // Find lifecycle handlers
        this.created = options.created || null;
        this.mounted = options.mounted || null;
        this.updated = options.updated || null;
        this.removed = options.removed || null;
        this.isCreatedCalled = false; // ensure callback is only called once
        this.isMountedCalled = false; // ensure callback is only called once
        this.isRemovedCalled = false; // ensure callback is only called once

        // event handlers - the ability to emit an event from the component
        this.emit = (eventName, data) => {
          emit(this, eventName, { detail: data });
        };

        // create instance properties
        this._processInstanceProps(this._props);

        // fire the created method
        if (typeof this.created === 'function' && !this.isCreatedCalled) {
          this.created();
          this.isCreatedCalled = true;
        }
      }

      _processProps () {
        const response = {};

        Object.keys(this._props).forEach(key => {
          const instanceResponse = {};
          const instance = this._props[key];
          const attributeValue = this._getAttribute(key);
          let defaultValue = null;

          if (instance.default != null) {
            defaultValue = instance.default;
          }

          // If there's a required attribute with no value we need to do generate the most useful feedback
          if (instance.required && attributeValue == null) {
            // If there's a default value, this is less severe, so set a warning and return out
            if (defaultValue != null) {
              console.info(`No biggie, the required prop '${key}' has no value set, so the default has been set`);
              instanceResponse[key] = defaultValue;
            } else {
              // If there's no default, this is an error. We'll set the data to be null too
              instanceResponse[key] = null;
              console.error(`The required prop '${key}' has no value set`);
            }
          } else {
            // We're all good here, so let's process the data
            // Make sure the data matches the declared type
            switch (instance.type) {
              case String:
              default:
                instanceResponse[key] = attributeValue || defaultValue;
                break
              case Number:
                instanceResponse[key] = attributeValue != null ? parseFloat(attributeValue) : defaultValue != null ? defaultValue : 0;
                break
              case Boolean:
                instanceResponse[key] = attributeValue != null ? attributeValue.toString() === 'true' : defaultValue != null ? defaultValue : false;
                break
              case Object:
                try {
                  instanceResponse[key] = attributeValue != null ? JSON.parse(attributeValue) : defaultValue != null ? defaultValue : undefined;
                } catch (ex) {
                  instanceResponse[key] = defaultValue != null ? defaultValue : undefined;
                  console.error('An object parse issue occurred', ex);
                }
                break
            }
          }

          // Set this data in the main response object
          response[key] = instanceResponse[key];

          // Override the props data if we have an instanceProp
          if (this._instanceProps && this._instanceProps[key]) {
            response[key] = this._instanceProps[key];
          }
        });

        return response
      }

      _processMethodsAndComputedProps (props) {
        const self = this;
        const protectedMethods = ['state', 'created', 'mounted', 'updated', 'removed', 'render', 'renderer'];
        const keys = Object.keys(props);
        if (!keys.length) return
        // Run through and bind to the component instance
        keys.forEach(key => {
          if (!self[key] && !protectedMethods.includes(key) && typeof props[key] === 'function') {
            self[key] = props[key].bind(self);
          }
          if (key === 'computed') {
            this._processComputed(props[key]);
          }
        });
      }

      _processRoot (key) {
        switch (key) {
          case 'standard':
          default:
            return this
          case 'shadow':
            return this.attachShadow({ mode: 'open' })
          case 'shadow:closed':
            return this.attachShadow({ mode: 'closed' })
        }
      }

      _processComputed (obj) {
        const self = this;
        const keys = Object.keys(obj);

        // Bail out if there's not any getters
        if (!keys.length) return

        // Run through and create a real getter
        keys.forEach(key => {
          if (self[key]) {
            console.warn(`Computed property '${key}' already exists on the component instance`);
            return
          }
          Object.defineProperty(self, key, {
            get () {
              // check the computed cache first
              if (!self.computedCache[key]) {
                self.computedCache[key] = obj[key].bind(self)();
              }
              return self.computedCache[key]
            }
          });
        });
      }

      _processRender () {
        // Check if there's a render method and get the result if it does exist
        const template = this.render ? this.render() : undefined;

        // Nothing to render so bail out
        if (!template) return

        // Set the template for rendering
        this.template = template;

        // Render the template
        this._updateRender();
      }

      _monitorState (objectInstance) {
        const self = this;

        return new Proxy(objectInstance, {
          set (obj, property, value) {
            // We don't want to do anything if there's no actual changes to make
            if (obj[property] === value) return true

            // Allow the value to be set with no dramas
            obj[property] = value;

            // clear the computed cache
            self.computedCache = {};

            // Run the render processor now that there's changes
            if (self.status === 'render') self._processRender();

            return true
          }
        })
      }

      _processSlots () {
        const children = this.childNodes;
        const slots = {
          default: []
        };
        if (children.length > 0) {
          [...children].forEach(child => {
            const to = child.getAttribute ? child.getAttribute('slot') : null;
            if (!to) {
              slots.default.push(child);
            } else {
              slots[to] = child;
            }
          });
        }
        return slots
      }

      _getAttribute (key) {
        try {
          return this.getAttribute(toKebabCase(key))
        } catch (ex) {
          console.error('A get prop error occurred', ex);
          return ''
        }
      }

      _processInstanceProps (props) {
        const self = this;
        const keys = Object.keys(props);
        // set instance properties for any defined props
        if (props) {
          keys.forEach(key => {
            let existingPropValue;
            if (self[key]) {
              existingPropValue = self[key];
              delete self[key];
            }
            Object.defineProperty(self, key, {
              get () {
                if (this._instanceProps && this._instanceProps[key]) {
                  return this._instanceProps[key]
                }
                return this.getAttribute(toKebabCase(key))
              },
              set (newValue) {
                if (!this._instanceProps) {
                  this._instanceProps = {};
                }
                this._instanceProps[key] = newValue;

                // set the HTML attribute value
                this.setAttribute(toKebabCase(key), typeof newValue === 'object' ? JSON.stringify(newValue) : newValue.toString());
                this.attributeChangedCallback();
                return true
              },
              enumerable: true
            });
            if (existingPropValue) self[key] = existingPropValue;
          });
        }
      }

      _preprocess () {
        this.computedCache = {};
        this.props = this._processProps();
        this._processRender();
      }

      _updateRender () {
        if (this.template) {
          // is this an async render?
          if (isPromise(this.template)) {
            this.template
              .then(template => {
                this.templateRenderer(template, this.root);
                this._callLifecycleMethods();
              })
              .catch(e => console.error('A component render error occurred', e));
          } else {
            this.templateRenderer(this.template, this.root);
            this._callLifecycleMethods();
          }
        }
      }

      _callLifecycleMethods () {
        if (typeof this.mounted === 'function' && !this.isMountedCalled) {
          this.mounted();
          this.isMountedCalled = true;
        }
        if (typeof this.updated === 'function' && this.isMountedCalled) {
          this.updated();
        }
      }
    });
}

function withEventBus (eventBus, options) {
  return {
    ...options,
    created () {
      this.setEventBus(eventBus);
      if (options.created) options.created.call(this);
    },
    mounted () {
      this._subscribeToEventBus();
      if (options.mounted) options.mounted.call(this);
    },
    updated () {
      this._subscribeToEventBus();
      if (options.updated) options.updated.call(this);
    },
    removed () {
      this._unsubscribeFromEventBus();
      if (options.removed) options.removed.call(this);
    },
    setEventBus (eventBus) {
      const self = this;
      self._eventBus = eventBus;
      self._eventSubscriptions = {};
      self.eventBus = {
        subscribe (event, callback) {
          self._eventSubscriptions[event] = { unsubscribe: self._eventBus.subscribe(event, callback), callback };
          return function () {
            const { unsubscribe } = self._eventSubscriptions[event];
            unsubscribe && unsubscribe();
            self._eventSubscriptions[event].unsubscribe = null;
          }
        },
        publish (event, data = {}) {
          self._eventBus.publish(event, data);
        }
      };
    },
    _subscribeToEventBus () {
      for (const k in this._eventSubscriptions) {
        const { unsubscribe, callback } = this._eventSubscriptions[k];
        if (!unsubscribe) {
          this._eventSubscriptions[k].unsubscribe = this._eventBus.subscribe(k, callback);
        }
      }
    },
    _unsubscribeFromEventBus () {
      for (const k in this._eventSubscriptions) {
        const { unsubscribe } = this._eventSubscriptions[k];
        unsubscribe && unsubscribe();
        this._eventSubscriptions[k].unsubscribe = null;
      }
    }
  }
}

function withStateTransactions (options) {
  return {
    ...options,
    created () {
      this.state = this._monitorTransactionState(this._state);
      if (options.created) options.created.call(this);
    },
    beginTransaction () {
      this.transactionCache = {};
      this.transaction = true;
      this.status = 'transaction';
    },
    endTransaction () {
      this.transaction = false;
      this.status = 'render';
      this._processRender();
    },
    rollbackTransaction () {
      Object.keys(this.transactionCache).forEach(k => (this.state[k] = this.transactionCache[k]));
      this.endTransaction();
    },
    _monitorTransactionState (objectInstance) {
      const self = this;
      return new Proxy(objectInstance, {
        set (state, key, value) {
          // We don't want to do anything if there's no actual changes to make
          if (state[key] === value) return true

          // cache first value changed if we're in transaction mode
          if (self.transaction && !self.transactionCache[key]) {
            self.transactionCache[key] = self._copyValue(state[key]);
          }

          // Allow the value to be set with no dramas
          state[key] = value;

          // clear the computed cache
          self.computedCache = {};

          // Run the render processor now that there's changes
          if (self.status === 'render') self._processRender();

          return true
        },
        get (state, key) {
          return state[key]
        }
      })
    },
    _copyValue (value) {
      return JSON.parse(JSON.stringify(value))
    }
  }
}

function withStore (store, options) {
  return {
    ...options,
    created () {
      // create a subscription callback
      this.subscribeCallback = () => {
        // clear the getter cache
        this.computedCache = {};

        // Run the render processor now that there's changes
        this._processRender();
      };
      this.setStore(store);
      if (options.created) options.created.call(this);
    },
    mounted () {
      this._subscribeToStores(false);
      if (options.mounted) options.mounted.call(this);
    },
    updated () {
      this._subscribeToStores(false);
      if (options.updated) options.updated.call(this);
    },
    removed () {
      this._unsubscribeFromStores();
      if (options.removed) options.removed.call(this);
    },
    setStore (store) {
      this.store = store;
      this._subscribeToStores();
    },
    _subscribeToStores (invokeSubscribeCallback = true) {
      if (this.store && this.store.subscribe && typeof this.store.subscribe === 'function' && !this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(this.subscribeCallback);
        if (invokeSubscribeCallback) this.subscribeCallback();
      } else if (this.store && typeof this.store === 'object' && !this.store.subscribe) {
        this.unsubscribe = {};
        const keys = Object.keys(this.store);
        keys.forEach(k => {
          if (this.store[k] && this.store[k].subscribe && typeof this.store[k].subscribe === 'function' && !this.unsubscribe[k]) {
            this.unsubscribe[k] = this.store[k].subscribe(this.subscribeCallback);
          }
        });
        if (invokeSubscribeCallback) this.subscribeCallback();
      }
    },
    _unsubscribeFromStores () {
      if (this.store && this.unsubscribe && typeof this.unsubscribe === 'object') {
        const keys = Object.keys(this.unsubscribe);
        keys.forEach(k => {
          this.unsubscribe[k]();
        });
        this.unsubscribe = null;
      } else if (this.store && this.unsubscribe && typeof this.unsubscribe === 'function') {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
  }
}

class Events {
  constructor () {
    if (typeof window !== 'undefined' && window.__ficusjs__ && window.__ficusjs__.eventBus) {
      return window.__ficusjs__.eventBus
    }
    this.events = {};
    if (typeof window !== 'undefined') {
      window.__ficusjs__ = window.__ficusjs__ || {};
      window.__ficusjs__.eventBus = window.__ficusjs__.eventBus || this;
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
    const self = this;

    // If there's not already an event with this name set in our collection
    // go ahead and create a new one and set it with an empty array, so we don't
    // have to type check it later down-the-line
    if (!self.events[event]) {
      self.events[event] = [];
    }

    // create an unsubscribe function
    const unsubscribe = () => {
      self.events[event] = self.events[event].filter(c => c !== callback);
    };

    // We know we've got an array for this event, so push our callback in there with no fuss
    self.events[event].push(callback);

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
    const self = this;

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
function createEventBus () {
  return new Events()
}

/**
 * Function to get the running Events instance
 * @returns {Events}
 */
function getEventBus () {
  return createEventBus()
}

class BasePersist {
  /**
   * Create an instance of persistence with the unique namespace identifier
   * @param namespace
   */
  constructor (namespace, storage) {
    this.namespace = namespace;
    this.storage = storage;
  }

  /**
   * Set state in the persistence store
   * @param key
   * @param state
   */
  setState (state) {
    if (state) {
      this.storage.setItem(`${this.namespace}:state`, typeof state === 'string' ? state : JSON.stringify(state));
      this.storage.setItem(`${this.namespace}:lastUpdated`, new Date().getTime().toString());
    } else {
      this.removeState();
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
    this.storage.removeItem(`${this.namespace}:state`);
    this.storage.removeItem(`${this.namespace}:lastUpdated`);
  }
}

class Store {
  constructor (options) {
    const self = this;

    // Add some default objects to hold our getters, actions, mutations and state
    self.getters = {};
    self.actions = {};
    self.mutations = {};
    self.state = {};

    // create a getter cache
    self.getterCache = {};

    // A status enum to set during actions and mutations
    self.status = 'resting';

    // Transactional flag for batch actions/mutations without triggering re-rendering
    self.transaction = false;
    self.transactionCache = {};

    // We store callbacks for when the state changes in here
    self.callbacks = [];

    // Look in the passed params object for getters, actions and mutations
    // that might have been passed in
    if (options.getters) {
      self.getters = new Proxy((options.getters || {}), {
        get (getters, key) {
          // check the getter cache first
          if (!self.getterCache[key]) {
            const result = getters[key](self.state);
            self.getterCache[key] = result;
          }
          return self.getterCache[key]
        }
      });
    }

    if (options.actions) {
      self.actions = options.actions;
    }

    if (options.mutations) {
      self.mutations = options.mutations;
    }

    // initial state values
    let initialState = options.initialState || {};
    self.copyOfInitialState = self._copyValue(initialState);

    // time to live settings
    self.ttl = -1;
    self.lastUpdatedState = {};
    if (options.ttl) {
      self.ttl = options.ttl;
      Object.keys(self.copyOfInitialState).forEach(k => (self.lastUpdatedState[k] = new Date().getTime()));
    }

    // persistence
    if (options.persist) {
      self.persist = typeof options.persist === 'string' ? createPersist(options.persist) : options.persist;

      // check for initial state
      const initState = self.persist.getState();
      const lastUpdated = self.persist.lastUpdated();
      if (initState &&
        lastUpdated &&
        (self.ttl === -1 || self._lastUpdatedTimeDiff(lastUpdated) < self.ttl)) {
        initialState = initState;
      }
    }

    // set-up state
    this._processState(initialState);
  }

  /**
   * Set-up the internal state object
   * @param {object} initialState
   * @private
   */
  _processState (initialState) {
    const self = this;
    // Set our state to be a Proxy. We are setting the default state by
    // checking the params and defaulting to an empty object if no default
    // state is passed in
    self.state = new Proxy(initialState, {
      set (state, key, value) {
        // cache first value changed if we're in transaction mode
        if (self.transaction && !self.transactionCache[key]) {
          self.transactionCache[key] = self._copyValue(state[key]);
        }

        // Set the value as we would normally
        state[key] = value;
        self.lastUpdatedState[key] = new Date().getTime();

        // clear the getter cache
        self.getterCache = {};

        if (self.status !== 'clear') {
          // Fire off our callback processor because if there's listeners,
          // they're going to want to know that something has changed
          self._processCallbacks(self.state);

          // Reset the status ready for the next operation
          self.status = 'resting';
        }

        return true
      },
      get (state, key) {
        if (self.ttl > -1 && self._lastUpdatedTimeDiff(self.lastUpdatedState[key]) > self.ttl) {
          if (self.persist) {
            self.persist.removeState();
          }
          return self.copyOfInitialState[key]
        }
        return state[key]
      }
    });
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
      console.error(`Dude, the store action "${actionKey}" doesn't exist.`);
      return false
    }

    // Let anything that's watching the status know that we're dispatching an action
    this.status = 'action';

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
      console.error(`Dude, the store mutation "${mutationKey}" doesn't exist`);
      return false
    }

    // Let anything that's watching the status know that we're mutating state
    this.status = 'mutation';

    // Get a new version of the state by running the mutation and storing the result of it
    const newState = this.mutations[mutationKey](this.state, payload);

    // Update the old state with the new state returned from our mutation
    this.state = newState;

    // if we have persistence pass the new state to it
    if (this.persist) {
      this.persist.setState(newState);
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
    this.callbacks.forEach(callback => callback(data));

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
      console.error('Dude, you can only subscribe to store changes with a valid function');
      return false
    }

    // create an unsubscribe function
    const unsubscribe = () => {
      this.callbacks = this.callbacks.filter(c => c !== callback);
    };

    // A valid function, so it belongs in our collection
    this.callbacks.push(callback);

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
    this.transactionCache = {};
    this.transaction = true;
  }

  /**
   * End the sequence of changes made to the store and notify subscribers
   */
  end () {
    this.transaction = false;
    this._processCallbacks(this.state);
  }

  /**
   * Rollback a sequence of store changes
   */
  rollback () {
    Object.keys(this.transactionCache).forEach(k => (this.state[k] = this.transactionCache[k]));
    this.end();
  }

  /**
   * Clear the store and reset back to the initial state
   * @param {boolean} notifySubscribers A boolean to indicate if subscribers should be notified
   */
  clear (notifySubscribers = true) {
    this.getterCache = {};
    this.transactionCache = {};
    this.lastUpdatedState = {};

    // remove any persistence
    if (this.persist) {
      this.persist.removeState();
    }

    // set the special clear status
    this.status = 'clear';

    // merge the copy of initial state with the current state
    const initialState = this._copyValue(this.copyOfInitialState);
    for (const key in initialState) {
      this.state[key] = initialState[key];
    }

    this.status = 'resting';

    if (notifySubscribers) this._processCallbacks(this.state);
  }
}

/**
 * Function to create a store instance
 * @param key
 * @param options
 * @returns {Store}
 */
function createStore (key, options) {
  const store = new Store(options);
  if (typeof window !== 'undefined') {
    window.__ficusjs__ = window.__ficusjs__ || {};
    window.__ficusjs__.store = window.__ficusjs__.store || {};
    window.__ficusjs__.store[key] = store;
  }
  return store
}

/**
 * Function to create persistence for the store
 * @param {string} namespace
 * @param {string} storageName
 * @returns {BasePersist}
 */
function createPersist (namespace, storageName = 'session') {
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
function getStore (key) {
  if (typeof window !== 'undefined' && window.__ficusjs__ && window.__ficusjs__.store && window.__ficusjs__.store[key]) {
    return window.__ficusjs__.store[key]
  }
}

/**
 * Function to use another FicusJS module
 * @param {Object} module
 */
function use (module, renderer, html) {
  if (module.create && typeof module.create === 'function') {
    return module.create({
      // components
      createComponent,
      renderer,
      html,

      // event bus
      createEventBus,
      getEventBus,

      // stores
      createPersist,
      createStore,
      getStore,

      // modules
      use
    })
  }
}

export { createComponent, createEventBus, createPersist, createStore, getEventBus, getStore, use, withEventBus, withStateTransactions, withStore };
