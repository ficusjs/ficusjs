---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - withXStateService function
---
# withXStateService function

The `withXStateService` function extends a component to integrate an [XState](https://xstate.js.org/docs/) service (created with either [`createXStateService`](/state-machines/create-xstate-service) or [`interpret`](/state-machines/interpret) functions) for managing application or component state.

The service is an interpreter responsible for interpreting the state machine/statechart, parsing and executing it in a runtime environment.

The service is provided to the `withXStateService` function to automatically subscribe to state changes and trigger component updates.

```js
// import XState functions
import { createMachine, createXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

// import the html tagged template literal and renderer from htm
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import the custom element creator function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the withXStateService function
import { withXStateService } from 'https://cdn.skypack.dev/ficusjs@5/with-xstate-service'

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
const service = createXStateService('toggle.service', machine)

createCustomElement(
  'toggle-xstate-machine',
  withXStateService(service, {
    renderer,
    onChange () {
      this.fsm.send('TOGGLE')
    },
    render () {
      let input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}">`
      if (this.fsm.state.matches('active')) {
        input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}" checked>`
      }
      return html`
        ${input}
        <label for="horns">Horns</label>
      `
    }
  })
)

createCustomElement(
  'toggle-xstate-machine-view',
  withXStateService(service, {
    renderer,
    render () {
      return html`
        <p>Current state: ${this.fsm.state.value}</p>
      `
    }
  })
)
```

## XState

XState is a library for creating, interpreting, and executing finite state machines and statecharts, as well as managing invocations of those machines as actors.

To find out more visit [https://xstate.js.org/docs/](https://xstate.js.org/docs/)

The `withXStateService` works with the full XState library when creating state machine services.

```js
// import XState lib
import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate'

// import the html tagged template literal and renderer from htm
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import the custom element creator function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the withXStateService function
import { withXStateService } from 'https://cdn.skypack.dev/ficusjs@5/with-xstate-service'

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
      this.fsm.send('TOGGLE')
    },
    render () {
      let input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}">`
      if (this.fsm.state.matches('active')) {
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
