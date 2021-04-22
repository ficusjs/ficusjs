import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createComponent('clear-button',
  withStore(store, {
    clear () {
      this.store.clear()
    },
    render () {
      return html`<button type="button" @click=${this.clear}>Clear</button>`
    }
  })
)
