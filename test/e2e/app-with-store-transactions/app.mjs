import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

import './rollback-button.mjs'
import './display-button.mjs'

createComponent('mock-app-with-store',
  withStore(store, {
    render () {
      return html`<div>
    <rollback-button></rollback-button>
    <display-button></display-button>
      </div>`
    }
  })
)
