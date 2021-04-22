import { html, createComponent, withEventBus } from '../util/component.mjs'
import { eventBus } from './events.mjs'

createComponent(
  'publish-button',
  withEventBus(eventBus, {
    buttonClicked () {
      this.eventBus.publish('increment', undefined)
    },
    render () {
      return html`<button type="button" @click=${this.buttonClicked}>Increment</button>`
    }
  })
)
