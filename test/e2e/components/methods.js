import { createComponent, html } from '../util/component.js'
import { emit } from '../util/emit.js'

createComponent('mock-methods', {
  formatName (name, family, title) {
    return `${title} ${name} ${family}`
  },
  render () {
    return html`<span>Methods component that formats the name <strong>${this.formatName('Indiana', 'Jones', 'Dr')}</strong></span>`
  }
})

createComponent('mock-method-event', {
  buttonClick (e) {
    emit('clicked')
    this.emit('has-clicked')
  },
  render () {
    return html`<button type="button" @click=${this.buttonClick}>Methods component that listens for a click and emits &nbsp;<code>has-clicked</code>&nbsp; event</button>`
  }
})
