import { html, createComponent } from '../util/component.mjs'

import './publish-button.mjs'
import './subscribe-button.mjs'
import './increment-button.mjs'
import './clear-button.mjs'
import './display-button.mjs'

createComponent(
  'mock-app-with-extension-builder',
  {
    render () {
      return html`
          <div>
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
  }
)
