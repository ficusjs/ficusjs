import { createComponentWithStateMachine, html } from '../util/component.mjs'

createComponentWithStateMachine('mock-state-machine', {
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
}, {
  onChange () {
    this.send('TOGGLE')
  },
  render () {
    let input = html`<input type="checkbox" id="horns" name="horns" @change="${this.onChange}">`
    if (this.state.matches('active')) {
      input = html`<input type="checkbox" id="horns" name="horns" @change="${this.onChange}" checked>`
    }
    return html`
      ${input}
      <label for="horns">Horns</label>
    `
  }
})
