import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

createComponent('display-button', {
  store,
  computed: {
    count () {
      return this.store.state.count
    },
    timesTen () {
      return this.store.getters.timesTen
    },
    timesBy () {
      return this.store.getters.timesBy(20)
    }
  },
  render () {
    return html`<div><span>You have clicked ${this.count} times!</span> <span>${this.count} * 10 = ${this.timesTen}</span>, <span>${this.count} * 20 = ${this.timesBy}</span></div>`
  }
})
