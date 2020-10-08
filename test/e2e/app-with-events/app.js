import { html, createComponent, withEventBus } from '../util/component.js'
import { eventBus } from './events.js'

import './publish-button.js'
import './subscribe-button.js'

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
