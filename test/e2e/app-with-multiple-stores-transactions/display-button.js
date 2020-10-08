import { html, createComponent, withStore } from '../util/component.js'
import { store } from './store.js'

createComponent(
  'display-button',
  withStore(store, {
    computed: {
      count () {
        return this.store.count.state.count
      },
      count2 () {
        return this.store.count2.state.count
      },
      count3 () {
        return this.store.count3.state.count
      }
    },
    render () {
      return html`<div>
  <p id="p-1">1. You have clicked ${this.count} times!</p>
  <p id="p-2">2. You have clicked ${this.count2} times!</p>
  <p id="p-3">3. You have clicked ${this.count3} times!</p>
  </div>`
    }
  })
)
