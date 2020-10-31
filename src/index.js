import { createComponent } from './component.js'
import { withEventBus } from './with-event-bus.js'
import { withStateTransactions } from './with-state-transactions.js'
import { withStore } from './with-store.js'
import { createEventBus, getEventBus } from './event.js'
import { createPersist, createStore, getStore } from './store.js'

/**
 * Function to use another FicusJS module
 * @param {Object} module
 */
function use (module, { renderer, ...args }) {
  if (module.create && typeof module.create === 'function') {
    return module.create({
      // components
      createComponent,
      renderer,
      ...args,

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
  withStateTransactions,
  withStore,
  withEventBus,

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
