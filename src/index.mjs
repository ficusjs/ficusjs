import { createCustomElement } from './custom-element.mjs'
import { createComponent } from './component.mjs'
import { withEventBus } from './with-event-bus.mjs'
import { withStateTransactions } from './with-state-transactions.mjs'
import { withLazyRender } from './with-lazy-render.mjs'
import { withStore } from './with-store.mjs'
import { withWorkerStore } from './with-worker-store.mjs'
import { withStyles } from './with-styles.mjs'
import { withLocalState } from './with-local-state.mjs'
import { withStateMachine } from './with-state-machine.mjs'
import { withXStateService } from './with-xstate-service.mjs'
import { createEventBus, getEventBus } from './event-bus.mjs'
import { createStore, getStore } from './store.mjs'
import { createAppState, getAppState, createPersist } from './app-state.mjs'
import { createI18n, getI18n, withI18n } from './i18n.mjs'

/**
 * Function to use another FicusJS module
 * @param {object} module
 * @param {function} renderer
 * @param {*} args
 * @returns {*}
 */
function use (module, { renderer, ...args }) {
  if (module.create && typeof module.create === 'function') {
    return module.create({
      // components
      createCustomElement,
      renderer,
      ...args,

      createComponent,

      // event bus
      createEventBus,
      getEventBus,

      // app state
      createAppState,
      getAppState,
      createPersist,

      createStore,
      getStore,

      // i18n
      createI18n,
      getI18n,

      // modules
      use
    })
  }
}

export {
  // components
  createCustomElement,

  // components - DEPRECATED
  createComponent,

  // extending components
  withLocalState,
  withStyles,
  withLazyRender,
  withStateMachine,
  withXStateService,
  withStore,
  withWorkerStore,
  withEventBus,
  withI18n,

  // extending components - DEPRECATED
  withStateTransactions,

  // event bus
  createEventBus,
  getEventBus,

  // app state
  createAppState,
  getAppState,
  createPersist,

  // stores - DEPRECATED
  createStore,
  getStore,

  // i18n
  createI18n,
  getI18n,

  // modules
  use
}
