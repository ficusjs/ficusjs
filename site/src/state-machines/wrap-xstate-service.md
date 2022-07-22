---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - wrapXStateService function
---
# wrapXStateService function

The `wrapXStateService` function wraps an [XState](https://xstate.js.org) service (a running instance of a state machine) that can be used within components.
It is ideal for use in conjunction with the full [XState](https://xstate.js.org) library which supports complex state machines and statecharts.

The `wrapXStateService` function takes three arguments:

1. the service created with the `interpret` function (required)
2. an object of getter functions (optional)
3. a persistence string, object or custom class (optional)

```js
// import full XState library
import { createMachine, interpret } from 'https://cdn.skypack.dev/xstate'

// import the required function
import { wrapXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

const definition = {
  /* define the machine definition */
}

const options = {
  /* define options like actions, guards etc */
}

// create the state machine
const machine = createMachine(definition, options)

// interpret the state machine to create a service
const serviceInstance = interpret(machine)

// add the service
wrapXStateService(service)
```

The wrapped service can then be passed to as many components as required using the [`withXStateService`](/state-machines/with-xstate-service) function.

## Getters

Getters are useful if you want to return a projection of the extended state (the state machine `context` is the extended state). A projection is a shape derived from the state.

Getters are memoized functions which means the result of the getter is cached for subsequent executions. This is useful when creating projections from large sets of data. State changes will automatically reset the getter cache.

To provide getters for creating projections, create an object containing functions and pass it to the `wrapXStateService` function as the second argument.

```js
const getters = {
  isGlassFull (context) {
    return context.amount >= 10
  },
  remaining (context) {
    return 10 - context.amount
  }
}

// wrap the XState service instance and extend it with getters
const service = wrapXStateService(serviceInstance, getters)
```

## Persistence

To survive hard refreshes from the user, your state can be persisted to `sessionStorage` automatically.
This will re-hydrate your state machine on initialisation.

Passing a string as the persistence argument provides a namespace for persisting the state.

```js
const service = wrapXStateService(serviceInstance, getters, 'food')
```

### createPersist function

You can optionally save state to `window.localStorage` (for persistence across browser sessions) using the `createPersist` function:

```js
import { createPersist } from 'https://cdn.skypack.dev/ficusjs@5'

const service = wrapXStateService(serviceInstance, getters, createPersist('food', 'local'))
```

When using the `createPersist` function, the following arguments must be supplied:

| Argument    | Type     | Required | Description                                                                                                                |
|-------------|----------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `namespace` | `string` | true     | The unique namespace for the store                                                                                         |
| `storage`   | `string` | true     | The storage mechanism to use - either `local` for `window.localStorage` or `session` for `window.sessionStorage` (default) |
| `options`   | `object` |          | Persistence options. See [options](#options) below.                                                                        |

#### Options

Options can be provided when creating persistence.

```js
import { createPersist } from 'https://cdn.skypack.dev/ficusjs@5'

const service = wrapXStateService(serviceInstance, getters, createPersist('food', 'local', {
  clearOnReload: true,
  saveState (state) {
    return {
      // only save the state value
      value: state.value
    }
  }
}))
```

##### options.clearOnReload

Setting `options.clearOnReload` to `true` will detect the browser reload state using
the [`window.performance`](https://developer.mozilla.org/en-US/docs/Web/API/Performance) API and clear the persistence
if a [`reload`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type) type is detected.

```js
createPersist('food', 'local', {
  clearOnReload: true
})
```

##### options.saveState

Setting `options.saveState` provides a way to persist specific data different to that of the store state.
This is useful when the store state contains functions or other data that cannot be serialised into a string when saved
to `window.sessionStorage` or `window.localStorage`.

```js
createPersist('food', 'local', {
  saveState (state) {
    return {
      // return properties of state to persist
    }
  }
})
```

The `saveState` function is passed the current `state` and must return an `object` of data to be serialised into a string.

### Custom persistence

You can provide a custom class and persist your application state in whichever way you choose.

Four methods must be implemented:

| Method            | Description                                                                      |
|-------------------|----------------------------------------------------------------------------------|
| `setState(state)` | Save the state in the persistence store                                          |
| `getState()`      | Retrieve the state from the persistence store                                    |
| `lastUpdated()`   | Retrieve the last updated time of the state in milliseconds since the Unix Epoch |
| `removeState()`   | Remove the state from the persistence store                                      |

```js
class MyCustomPersist {
  setState (state) {
    // set the state
  }

  getState () {
    // get the state
  }

  lastUpdated () {
    // get the last updated time in milliseconds since the Unix Epoch
  }

  removeState () {
    // remove the state - this is called by default when setState is null
  }
}

const service = wrapXStateService(serviceInstance, getters, new MyCustomPersist())
```
