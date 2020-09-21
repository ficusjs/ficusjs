import { collateObservedAttrs } from './util/collate-observed-attrs.js'
import { toKebabCase } from './util/to-kebab-case.js'
import { isPromise } from './util/is-promise.js'

function createComponent (tagName, props) {
  const observedAttrs = collateObservedAttrs(props.props)

  window.customElements.get(tagName) ||
  window.customElements.define(
    tagName,
    class FicusComponent extends HTMLElement {
      static get observedAttributes () {
        return observedAttrs
      }

      get initialised () {
        return this._props && this._state && this._computed && this.templateRenderer
      }

      connectedCallback () {
        this._checkInit()
        this._preprocess()
        if (typeof this.mounted === 'function' && !this.isMountedCalled) {
          this.mounted()
          this.isMountedCalled = true
        }
        if (typeof this.updated === 'function' && this.isMountedCalled) {
          this.updated()
        }
      }

      disconnectedCallback () {
        if (typeof this.removed === 'function') {
          this.removed()
          this.isRemovedCalled = true
        }
      }

      attributeChangedCallback () {
        this._checkInit()
        this._preprocess()
      }

      _checkInit () {
        if (!this.initialised) {
          this._init(props)
        }
      }

      _init (options) {
        // It's handy to access what was passed through originally, so we'll store in private props
        this._props = options.props || {}
        this._computed = options.computed || {}

        // check the state
        if (options.state && typeof options.state !== 'function') throw new Error('State must be a function!')
        this._state = options.state || {}

        // create a getter cache for the computed functions
        this.computedCache = {}

        // create a subscription callback
        this.subscribeCallback = () => {
          // clear the getter cache
          this.computedCache = {}

          // Run the render processor now that there's changes
          this._processRender()
        }

        // Run passed props through the props processor
        this.props = this._processProps()

        // Take whatever is passed and set it as a proxy in local state
        if (typeof this._state === 'function') {
          this._state = this._state.bind(this)()
        }
        this.state = this._monitorState(this._state)

        // Allow methods and computed properties to be added to this instance
        this._processInitProps(options)

        // Determine what our root is. It can be a pointer for `this` or a shadow root
        this.root = this._processRoot(options.root)

        // do we have child nodes, if so create them as slots
        this.slots = this._processSlots()

        // Pull out a render method if there is one defined
        this.render = options.render || null

        // set the default template renderer
        this.templateRenderer = options.renderer

        // Create a template instance we can call with each render
        this.template = null

        // Find lifecycle handlers
        this.created = options.created || null
        this.mounted = options.mounted || options.ready || null
        this.updated = options.updated || null
        this.removed = options.removed || null
        this.isCreatedCalled = false // ensure callback is only called once
        this.isMountedCalled = false // ensure callback is only called once
        this.isRemovedCalled = false // ensure callback is only called once

        // event handlers - the ability to emit an event from the component
        this.emit = (eventName, data) => {
          emit(this, eventName, { detail: data })
        }

        // create instance properties
        this._processInstanceProps(this._props)

        // fire the created method
        if (typeof this.created === 'function' && !this.isCreatedCalled) {
          this.created()
          this.isCreatedCalled = true
        }
      }

      _processProps () {
        const response = {}

        Object.keys(this._props).forEach(key => {
          const instanceResponse = {}
          const instance = this._props[key]
          const attributeValue = this._getAttribute(key)
          let defaultValue = null

          if (instance.default != null) {
            defaultValue = instance.default
          }

          // If there's a required attribute with no value we need to do generate the most useful feedback
          if (instance.required && attributeValue == null) {
            // If there's a default value, this is less severe, so set a warning and return out
            if (defaultValue != null) {
              console.info(`No biggie, the required prop '${key}' has no value set, so the default has been set`)
              instanceResponse[key] = defaultValue
            } else {
              // If there's no default, this is an error. We'll set the data to be null too
              instanceResponse[key] = null
              console.error(`The required prop '${key}' has no value set`)
            }
          } else {
            // We're all good here, so let's process the data
            // Make sure the data matches the declared type
            switch (instance.type) {
              case String:
              default:
                instanceResponse[key] = attributeValue || defaultValue
                break
              case Number:
                instanceResponse[key] = attributeValue != null ? parseFloat(attributeValue) : defaultValue != null ? defaultValue : 0
                break
              case Boolean:
                instanceResponse[key] = attributeValue != null ? attributeValue.toString() === 'true' : defaultValue != null ? defaultValue : false
                break
              case Object:
                try {
                  instanceResponse[key] = attributeValue != null ? JSON.parse(attributeValue) : defaultValue != null ? defaultValue : undefined
                } catch (ex) {
                  instanceResponse[key] = defaultValue != null ? defaultValue : undefined
                  console.error('An object parse issue occurred', ex)
                }
                break
            }
          }

          // Set this data in the main response object
          response[key] = instanceResponse[key]

          // Override the props data if we have an instanceProp
          if (this._instanceProps && this._instanceProps[key]) {
            response[key] = this._instanceProps[key]
          }
        })

        return response
      }

      _processInitProps (props) {
        const self = this
        const protectedMethods = ['state', 'created', 'mounted', 'updated', 'removed', 'render']
        const keys = Object.keys(props)
        if (!keys.length) return
        // Run through and bind to the component instance
        keys.forEach(key => {
          if (!self[key] && typeof props[key] === 'function' && !protectedMethods.includes(key)) {
            self[key] = props[key].bind(self)
          }
          if (key === 'computed') {
            this._processComputed(props[key])
          }
        })
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
        const self = this
        const keys = Object.keys(obj)

        // Bail out if there's not any getters
        if (!keys.length) return

        // Run through and create a real getter
        keys.forEach(key => {
          if (self[key]) {
            console.warn(`Computed property '${key}' already exists on the component instance`)
            return
          }
          Object.defineProperty(self, key, {
            get () {
              // check the computed cache first
              if (!self.computedCache[key]) {
                self.computedCache[key] = obj[key].bind(self)()
              }
              return self.computedCache[key]
            }
          })
        })
      }

      _processRender () {
        // Check if there's a render method and get the result if it does exist
        const template = this.render ? this.render() : undefined

        // Nothing to render so bail out
        if (!template) return

        // Set the template for rendering
        this.template = template

        // Render the template
        this._updateRender()
      }

      _monitorState (objectInstance) {
        const self = this

        return new Proxy(objectInstance, {
          set (obj, property, value) {
            // We don't want to do anything if there's no actual changes to make
            if (obj[property] === value) return true

            // Allow the value to be set with no dramas
            obj[property] = value

            // clear the computed cache
            self.computedCache = {}

            // Run the render processor now that there's changes
            self._processRender()

            return true
          }
        })
      }

      _processSlots () {
        const children = this.childNodes
        const slots = {
          default: []
        }
        if (children.length > 0) {
          [...children].forEach(child => {
            const to = child.getAttribute ? child.getAttribute('slot') : null
            if (!to) {
              slots.default.push(child)
            } else {
              slots[to] = child
            }
          })
        }
        return slots
      }

      _getAttribute (key) {
        try {
          return this.getAttribute(toKebabCase(key))
        } catch (ex) {
          console.error('A get prop error occurred', ex)
          return ''
        }
      }

      _processInstanceProps (props) {
        const self = this
        const keys = Object.keys(props)
        // set instance properties for any defined props
        if (props) {
          keys.forEach(key => {
            if (self[key]) {
              console.warn(`Instance property '${key}' already exists on the component instance`)
              return
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
                  this._instanceProps = {}
                }
                this._instanceProps[key] = newValue

                // set the HTML attribute value
                this.setAttribute(toKebabCase(key), typeof newValue === 'object' ? JSON.stringify(newValue) : newValue.toString())
                this.attributeChangedCallback()
                return true
              },
              enumerable: true
            })
          })
        }
      }

      _preprocess () {
        this.computedCache = {}
        this.props = this._processProps()
        this._processRender()
      }

      _updateRender () {
        if (this.template) {
          // is this an async render?
          if (isPromise(this.template)) {
            this.template
              .then(template => this.templateRenderer(template, this.root))
              .catch(e => console.error('A component render error occurred', e))
          } else {
            this.templateRenderer(this.template, this.root)
          }
        }
      }
    })
}

export { createComponent }
