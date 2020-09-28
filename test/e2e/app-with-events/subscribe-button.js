import { html, createComponent } from '../util/component.js'
import { eventBus } from './events.js'

createComponent('subscribe-button', {
  eventBus,
  state () {
    return { count: 0 }
  },
  mounted () {
    this.eventBus.subscribe('increment', () => {
      this.state.count = this.state.count + 1
    })
  },
  render () {
    return html`<div>You have clicked ${this.state.count} times!</div>`
  }
})
