import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

import './increment-button.js'
import './clear-button.js'
import './display-button.js'

createComponent('mock-app-with-store', {
  store,
  render () {
    return html`<diiv>
  <increment-button></increment-button>
  <clear-button></clear-button>
  <display-button></display-button>
    </diiv>`
  }
})
