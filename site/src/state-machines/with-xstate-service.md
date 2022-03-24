---
layout: main.njk
title: FicusJS documentation - State machines - withXStateService function
---
# withXStateService function

The `withXStateService` function extends a component to integrate an [XState](https://xstate.js.org/docs/) state machine or statechart for modelling application or component state.

An interpreter is responsible for interpreting the state machine/statechart, parsing and executing it in a runtime environment. An interpreted, running instance of a statechart is called a service.

The service is provided to the `withXStateService` function to automatically subscribe to state changes and trigger component updates.

```js
// import XState functions
import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate'

// import the html tagged template literal and renderer from htm
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@4/htm'

// import the custom element creator function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'

// import the withXStateService function
import { withXStateService } from 'https://cdn.skypack.dev/ficusjs@3/with-xstate-service'

// create a state machine
const machine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
})

// interpret the state machine to create a service
const service = interpret(machine)

createCustomElement(
  'toggle-xstate-machine',
  withXStateService(service, {
    renderer,
    onChange () {
      this.send('TOGGLE')
    },
    render () {
      let input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}">`
      if (this.state.matches('active')) {
        input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}" checked>`
      }
      return html`
        ${input}
        <label for="horns">Horns</label>
      `
    }
  })
)
```

## XState

XState is a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.

To find out more visit [https://xstate.js.org/docs/](https://xstate.js.org/docs/)
