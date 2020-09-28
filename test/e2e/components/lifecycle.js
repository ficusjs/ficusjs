import { createComponent, html } from '../util/component.js'
import { emit } from '../util/emit.js'

createComponent('mock-lifecycle', {
  mounted () {
    emit('mounted')
  },
  removed () {
    emit('removed')
  },
  render () {
    return html`<span>Lifecycle component</span>`
  }
})
