---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - createMachine function
---
# createMachine function

The `createMachine` function is used to define a state machine.

```js
import { createMachine } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

const machine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
})
```

## Options

Actions and guards can be implemented within an options object passed as the second argument to `createMachine`.

`actions` - the mapping of action names to their implementation
`guards` - the mapping of transition guard (`cond`) names to their implementation

```js
const definition = {
  context: { amount: 0 },
  id: 'glass',
  initial: 'empty',
  states: {
    empty: {
      on: {
        FILL: {
          actions: 'addWater',
          target: 'filling'
        }
      }
    },
    filling: {
      always: {
        cond: 'glassIsFull',
        target: 'full'
      },
      on: {
        FILL: {
          actions: 'addWater',
          target: 'filling',
          internal: false
        }
      }
    },
    full: {}
  }
}

const options = {
  actions: {
    addWater: assign({
      amount: (context, event) => context.amount + 1
    })
  },
  guards: {
    glassIsFull (context, event) {
      return context.amount >= 10
    }
  }
}

// create the state machine
const machine = createMachine(definition, options)
```
