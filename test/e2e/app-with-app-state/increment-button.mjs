import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createComponent('increment-button',
  withStore(store, {
    increment () {
      this.store.increment(this.store.state.count + 1)
    },
    render () {
      return html`<button type="button" @click=${this.increment}>Increment</button>`
    }
  })
)
