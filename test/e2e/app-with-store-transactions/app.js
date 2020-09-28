import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

import './rollback-button.js'
import './display-button.js'

createComponent('mock-app-with-store', {
  store,
  render () {
    return html`<div>
  <rollback-button></rollback-button>
  <display-button></display-button>
    </div>`
  }
})
