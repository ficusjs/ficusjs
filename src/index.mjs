import { createComponent } from './component.mjs'
import { withEventBus } from './with-event-bus.mjs'
import { withStateTransactions } from './with-state-transactions.mjs'
import { withLazyRender } from './with-lazy-render.mjs'
import { withStore } from './with-store.mjs'
import { withStyles } from './with-styles.mjs'
import { createEventBus, getEventBus } from './event-bus.mjs'
import { createStore, getStore } from './store.mjs'
import { createAppState, getAppState } from './app-state.mjs'
import { createPersist } from './base-persist.mjs'

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

      // app state
      createAppState,
      getAppState,

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
  withStyles,
  withLazyRender,

  // event bus
  createEventBus,
  getEventBus,

  // app state
  createAppState,
  getAppState,

  // stores
  createPersist,
  createStore,
  getStore,

  // modules
  use
}
