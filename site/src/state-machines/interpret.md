---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - interpret function
---
# interpret function

The `interpret` function creates an [XState](https://xstate.js.org) service (a running instance of a state machine) that can be used within components.

A service is created using the `createMachine` first followed by the `interpret` function. It is an instance created using the [`@xstate/fsm`](https://xstate.js.org/docs/packages/xstate-fsm/) package.

```js
import { createMachine, interpret } from 'https://cdn.skypack.dev/@ficusjs/state@3/xstate-service'

const definition = {
  /* define the machine definition */
}

const options = {
  /* define options like actions, guards etc */
}

// create the state machine
const machine = createMachine(definition, options)

// interpret the state machine to create a service
const service = interpret(machine)
```

A created service can then be passed to as many components as required using the [`withXStateService`](/state-machines/with-xstate-service) function.

## Getters

Getters are useful if you want to return a projection of the extended state (the state machine `context` is the extended state). A projection is a shape derived from the state.

Getters are memoized functions which means the result of the getter is cached for subsequent executions. This is useful when creating projections from large sets of data. State changes will automatically reset the getter cache.

To provide getters for creating projections, create an object containing functions and pass it to the `createXStateService` function when creating the service.

```js
const getters = {
  isGlassFull (context) {
    return context.amount >= 10
  },
  remaining (context) {
    return 10 - context.amount
  }
}

// interpret the state machine to create a service
const service = interpret(machine, getters)
```
