---
layout: main.njk
title: FicusJS documentation - State machines - withStateMachine function
---
# withStateMachine function

The `withStateMachine` function extends a component to provide a lightweight state machine run-time for component state.

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/htm'
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'
import { withStateMachine } from 'https://cdn.skypack.dev/ficusjs@3/with-state-machine'

// create a state machine
const machine = {
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  },
  actions: {
    active (data) {
      if (data.someArg) {
        // 'this' is the context of the custom element
        this.invokeCustomElementMethod(data)
      }
    }
  }
}

createCustomElement(
  'toggle-state-machine',
  withStateMachine(machine, {
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

## States

A state is an abstract representation of a system (such as an application or component) at a specific point in time.
As an application is interacted with, events cause it to change state.

A finite state machine can be in only one of a finite number of states at any given time.

You define states in the machine definition. Each state is an `object` containing the `on` property that defines one or more events that specify the next state as a `string`.

```js
withStateMachine({
  initial: 'inactive', // optional - first state is used if omitted
  states: {
    inactive: {
      on: {
        TOGGLE: 'active'
      }
    },
    active: {
      on: {
        TOGGLE: 'inactive'
      }
    }
  }
}, {
  /* component options */
})
```

Given the current state of `inactive` and the event `TOGGLE`, the next state value is `active`.

### Next state values as objects

Next state values can also be set as objects containing a `target` (the next state) and an optional `action` to invoke actions with a specific name.

```js
withStateMachine({
  initial: 'inactive', // optional - first state is used if omitted
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
          action: 'whenSetToActiveAction'
        }
      }
    },
    active: {
      on: {
        TOGGLE: {
          target: 'inactive',
          action: 'whenSetToInactiveAction'
        }
      }
    }
  },
  actions: {
    whenSetToActiveAction () {
      // do stuff
    },
    whenSetToInactiveAction () {
      // do stuff
    }
  }
}, {
  /* component options */
})
```

## Events

An event is what causes a state machine to transition from its current state to its next state.
All state transitions in a state machine are due to these events; state cannot change unless an event causes it to change.

### send method

The `send` method can be invoked to send an event to the state machine.

```js
{
  someMethod () {
    this.send('TOGGLE')
  }
}
```

There are two ways events can be sent to the state machine.

#### As a string

The string represents the event type.

```js
this.send('TOGGLE')
```

#### As an event object

The event object must have a `type` property but can also pass arguments.

```js
this.send({ type: 'TOGGLE', arg1: 'test', arg2: 'test' })
```

## Actions

For a machine to be useful in an application, side effects need to occur to make things happen, such as loading data from an API.

Actions are executed upon entering the state.

You define actions in the machine definition.

```js
withStateMachine({
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  },
  actions: {
    active (data) {
      if (data.someArg) {
        // 'this' is the context of the custom element
        this.invokeCustomElementMethod(data)
      }
    }
  }
}, {
  /* component options */
})
```

### Targetting actions with specific names

You can also target specific actions by name when defining states.

```js
withStateMachine({
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
          action: 'checkActionOnServer'
        }
      }
    },
    active: {
      on: {
        TOGGLE: 'inactive'
      }
    }
  },
  actions: {
    checkActionOnServer (data) {
      if (data.someArg) {
        // 'this' is the context of the custom element
        this.invokeCustomElementMethod(data)
      }
    }
  }
}, {
  /* component options */
})
```
