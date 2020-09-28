import { html, createComponent } from '../util/component.js'
import { eventBus } from './events.js'

createComponent('publish-button', {
  eventBus,
  buttonClicked () {
    this.eventBus.publish('increment', undefined)
  },
  render () {
    return html`<button type="button" @click=${this.buttonClicked}>Increment</button>`
  }
})
