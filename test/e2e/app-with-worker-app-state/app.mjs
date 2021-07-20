import { html, renderer, customElementCreator, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

customElementCreator('mock-app-with-store',
  withWorkerStore(worker, {
    renderer,
    mounted () {
      this.dispatch('start')
    },
    render () {
      return html`<div>
      <increment-button></increment-button>
      <clear-button></clear-button>
      <display-button></display-button>
        </div>`
    }
  })
)
