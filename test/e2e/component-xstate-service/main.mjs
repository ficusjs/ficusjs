import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate'
import { createComponentWithXStateService, html } from '../util/component.mjs'

const machine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
})
const service = interpret(machine)

createComponentWithXStateService('mock-state-chart', service, {
  mounted () {
    console.log('mock-state-chart mounted!')
    console.log(this.state)
  },
  onChange () {
    this.send('TOGGLE')
  },
  render () {
    console.log('render', this.state)

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
