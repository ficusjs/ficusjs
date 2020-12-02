import { render as renderer, html } from 'https://unpkg.com/lit-html?module'
import { createComponent as componentCreator } from '../../../src/component.js'
import { withStore } from '../../../src/with-store.js'
import { withStateTransactions } from '../../../src/with-state-transactions.js'
import { withStyles } from '../../../src/with-styles.js'
import { withEventBus } from '../../../src/with-event-bus.js'
import { createStore, getStore } from '../../../src/store.js'
import { createEventBus, getEventBus } from '../../../src/event.js'

function createComponent (tagName, options) {
  componentCreator(tagName, { ...options, renderer })
}

const nothing = ''

export { createComponent, createStore, createEventBus, getEventBus, getStore, html, nothing, withStore, withStateTransactions, withEventBus, withStyles }
