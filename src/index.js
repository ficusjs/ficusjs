import { createComponent } from './component.js'
import { createEventBus, getEventBus } from './event.js'
import { createPersist, createStore, getStore } from './store.js'

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

export {
  // components
  createComponent,

  // event bus
  createEventBus,
  getEventBus,

  // stores
  createPersist,
  createStore,
  getStore,

  // modules
  use
}
