---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - addXStateService function
---
# addXStateService function

The `addXStateService` function adds an [XState](https://xstate.js.org) service (a running instance of a state machine) that can be used within components.
It is ideal for use in conjunction with the full [XState](https://xstate.js.org) library which supports complex state machines and statecharts.

When using the `addXStateService` function, you **must** pass two parameters:

1. service key (for example `an.example.service`) - keys must be unique and are used to retrieve services later
2. the service created with the `interpret` function

```js
// import full XState library
import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate'

// import the required function
import { addXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

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

// add the service
addXStateService('toggle.service', service)
```

A service can then be passed to as many components as required using the [`withXStateService`](/state-machines/with-xstate-service) function.
