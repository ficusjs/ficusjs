import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/lit-html'
import { createComponent as componentCreator } from '../../../src/component.mjs'
import { createCustomElement as customElementCreator } from '../../../src/custom-element.mjs'
import { withStore, withWorkerStore, withStateTransactions, withStyles, withEventBus, withLazyRender, withLocalState, withXStateService, withStateMachine } from '../../../src/index.mjs'
import { createStore, getStore } from '../../../src/store.mjs'
import { createAppState, getAppState } from '../../../src/app-state.mjs'
import { createEventBus, getEventBus } from '../../../src/event-bus.mjs'

function createComponent (tagName, options) {
  componentCreator(tagName, withLocalState({ ...options, renderer }))
}

function createComponentWithStateMachine (tagName, machine, options) {
  customElementCreator(tagName, withStateMachine(machine, { ...options, renderer }))
}

function createComponentWithXStateService (tagName, service, options) {
  customElementCreator(tagName, withXStateService(service, { ...options, renderer }))
}

const nothing = ''

export {
  createComponent,
  customElementCreator,
  createComponentWithStateMachine,
  createComponentWithXStateService,
  createStore,
  createEventBus,
  getEventBus,
  getStore,
  renderer,
  html,
  nothing,
  withStore,
  withWorkerStore,
  withStateTransactions,
  withEventBus,
  withStyles,
  createAppState,
  getAppState,
  withLazyRender,
  withXStateService
}
