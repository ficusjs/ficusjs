import { html, renderer, customElementCreator, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

customElementCreator('clear-button',
  withWorkerStore(worker, {
    renderer,
    clear () {
      this.dispatch('clear')
    },
    render () {
      return html`<button type="button" @click=${this.clear}>Clear</button>`
    }
  })
)
