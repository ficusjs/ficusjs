import { withBreakpointRender } from './with-breakpoint-render.mjs'
import { withLazyRender } from './with-lazy-render.mjs'
import { withStyles } from './with-styles.mjs'
import { withEventBus } from './with-event-bus.mjs'
import { withI18n } from './with-i18n.mjs'
import { withLocalState } from './with-local-state.mjs'
import { withStore } from './with-store.mjs'
import { withWorkerStore } from './with-worker-store.mjs'

class ExtensionBuilderClass {
  constructor () {
    this.extensions = {}
  }

  withBreakpointRender (breakpointConfig) {
    this.extensions[withBreakpointRender] = { func: withBreakpointRender, arg: breakpointConfig }
    return this
  }

  withEventBus (eventBus) {
    this.extensions[withEventBus] = { func: withEventBus, arg: eventBus }
    return this
  }

  withI18n (i18n) {
    this.extensions[withI18n] = { func: withI18n, arg: i18n }
    return this
  }

  withLazyRender () {
    this.extensions[withLazyRender] = { func: withLazyRender, arg: undefined }
    return this
  }

  withStyles () {
    this.extensions[withStyles] = { func: withStyles, arg: undefined }
    return this
  }

  withLocalState () {
    this.extensions[withLocalState] = { func: withLocalState, arg: undefined }
    return this
  }

  withStore (store) {
    this.extensions[withStore] = { func: withStore, arg: store }
    return this
  }

  withWorkerStore (worker) {
    this.extensions[withWorkerStore] = { func: withWorkerStore, arg: worker }
    return this
  }

  create (options) {
    return Object.keys(this.extensions)
      .reduce((prev, current) => {
        const extension = this.extensions[current]
        return extension.func(extension.arg, prev)
      }, options)
  }
}

export const ExtensionBuilder = {
  newInstance () {
    return new ExtensionBuilderClass()
  }
}
