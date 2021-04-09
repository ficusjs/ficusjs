import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/lit-html'
import { createComponent as componentCreator } from '../../../src/component.mjs'
import { withStore, withStateTransactions, withStyles, withEventBus } from '../../../src/index.mjs'
import { createStore, getStore } from '../../../src/store.mjs'
import { createEventBus, getEventBus } from '../../../src/event-bus.mjs'

function createComponent (tagName, options) {
  componentCreator(tagName, { ...options, renderer })
}

const nothing = ''

export { createComponent, createStore, createEventBus, getEventBus, getStore, html, nothing, withStore, withStateTransactions, withEventBus, withStyles }
