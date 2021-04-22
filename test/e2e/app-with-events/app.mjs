import { html, createComponent, withEventBus } from '../util/component.mjs'
import { eventBus } from './events.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'

createComponent(
  'mock-app-with-events',
  withEventBus(eventBus, {
    render () {
      return html`<div>
        <publish-button></publish-button>
        <subscribe-button></subscribe-button>
      </div>`
    }
  })
)
