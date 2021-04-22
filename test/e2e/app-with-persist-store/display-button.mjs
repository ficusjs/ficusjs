import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createComponent(
  'display-button',
  withStore(store, {
    computed: {
      count () {
        return this.store.state.count
      }
    },
    render () {
      return html`<div>You have clicked ${this.count} times!</div>`
    }
  })
)
