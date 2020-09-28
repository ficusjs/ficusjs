import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

createComponent('increment-button', {
  store,
  increment () {
    this.store.count.dispatch('increment', this.store.count.state.count + 1)
  },
  render () {
    return html`<button type="button" @click=${this.increment}>Increment</button>`
  }
})
