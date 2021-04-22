import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

import './increment-button.mjs'
import './display-button.mjs'

createComponent('mock-app-with-store',
  withStore(store, {
    render () {
      return html`<div>
    <increment-button></increment-button>
    <display-button></display-button>
      </div>`
    }
  })
)
