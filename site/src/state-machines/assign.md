---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - assign function
---
# assign function

The `assign` function is used to update data within a state machine.

State machines can hold data known as extended state using a `context` object. This makes the state machine useful in applications where storage of data is required in addition to the finite states.

```js
import { assign, createMachine } from 'https://cdn.skypack.dev/@ficusjs/state@3/xstate-service'

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
