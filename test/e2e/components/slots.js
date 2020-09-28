import { createComponent, html } from '../util/component.js'

createComponent('mock-slots', {
  render () {
    return html`<span>Slots component with default slot of <strong>${this.slots.default}</strong></span>`
  }
})

createComponent('mock-slot-named', {
  render () {
    return html`<span>Slots component with named slots of <strong>${this.slots.first}</strong> and <strong>${this.slots.second}</strong></span>`
  }
})
