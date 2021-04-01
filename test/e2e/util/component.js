import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'
import { createComponent as componentCreator } from '../../../src/component.mjs'
import { withStore } from '../../../src/with-store.mjs'
import { withStateTransactions } from '../../../src/with-state-transactions.mjs'
import { withStyles } from '../../../src/with-styles.mjs'
import { withEventBus } from '../../../src/with-event-bus.mjs'
import { createStore, getStore } from '../../../src/store.js'
import { createEventBus, getEventBus } from '../../../src/event-bus.mjs'

function createComponent (tagName, options) {
  componentCreator(tagName, { ...options, renderer })
}

const nothing = ''

export { createComponent, createStore, createEventBus, getEventBus, getStore, html, nothing, withStore, withStateTransactions, withEventBus, withStyles }
