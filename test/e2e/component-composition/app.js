import { html, createComponent, withEventBus, withStore } from '../util/component.js'
import { eventBus } from './events.js'
import { store } from './store.js'

import './publish-button.js'
import './subscribe-button.js'
import './increment-button.js'
import './clear-button.js'
import './display-button.js'

createComponent(
  'mock-app-with-composition',
  withStore(
    store,
    withEventBus(eventBus, {
      render () {
        return html`<div>
        <div>
          <publish-button></publish-button>
          <subscribe-button></subscribe-button>
        </div>
        <div>
          <increment-button></increment-button>
          <clear-button></clear-button>
          <display-button></display-button>
        </div>
      </div>`
      }
    })
  )
)
