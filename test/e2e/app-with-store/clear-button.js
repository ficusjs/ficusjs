import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

createComponent('clear-button', {
  store,
  clear () {
    this.store.clear()
  },
  render () {
    return html`<button type="button" @click=${this.clear}>Clear</button>`
  }
})
