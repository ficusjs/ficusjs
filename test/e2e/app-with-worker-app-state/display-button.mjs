import { html, renderer, customElementCreator, withWorkerStore } from '../util/component.mjs'
import { worker } from './worker-store.mjs'

customElementCreator('display-button',
  withWorkerStore(worker, {
    renderer,
    computed: {
      count () {
        return this.state ? this.state.count : 0
      },
      timesTen () {
        return this.state ? this.state.count * 10 : 0
      },
      timesBy () {
        return this.state ? this.state.count * 20 : 0
      }
    },
    render () {
      return html`<div><span>You have clicked ${this.count} times!</span> <span>${this.count} * 10 = ${this.timesTen}</span>, <span>${this.count} * 20 = ${this.timesBy}</span></div>`
    }
  })
)
