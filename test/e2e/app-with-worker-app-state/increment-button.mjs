import { html, renderer, customElementCreator, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

customElementCreator('increment-button',
  withWorkerStore(worker, {
    renderer,
    increment () {
      this.dispatch('increment', this.state.count + 1)
    },
    render () {
      return html`<button type="button" @click=${this.increment}>Increment</button>`
    }
  })
)
