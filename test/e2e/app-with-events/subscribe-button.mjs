import { html, createComponent, withEventBus } from '../util/component.mjs'
import { eventBus } from './events.mjs'

createComponent('subscribe-button',
  withEventBus(eventBus, {
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
)
