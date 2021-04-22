import { html, createComponent, withEventBus, withStore } from '../util/component.mjs'
import { eventBus } from './events.mjs'
import { store } from './store.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'
import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

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
