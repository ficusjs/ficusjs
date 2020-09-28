import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

import './increment-button.js'
import './display-button.js'

createComponent('mock-app-with-store', {
  store,
  render () {
    return html`<div>
  <increment-button></increment-button>
  <display-button></display-button>
    </div>`
  }
})
