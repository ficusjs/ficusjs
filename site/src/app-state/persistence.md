---
layout: main.njk
title: FicusJS documentation - Application state - Persistence
---
# Persistence

To survive hard refreshes from the user, your state can be persisted to `sessionStorage` automatically.
This will re-hydrate your store on initialisation.

```js
// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  persist: 'food' // this must be a unique namespace for the store
})
```

## createPersist function

You can optionally save state to `window.localStorage` (for persistence across browser sessions) using the `createPersist` function:

```js
import { createAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@3'

// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  persist: createPersist('food', 'local')
})
```

When using the `createPersist` function, the following arguments must be supplied:

| Argument | Type | Description                                                                                                                                                                              |
| --- | --- | --- |
| `namespace` | `string` | The unique namespace for the store |
| `storage` | `string` | The storage mechanism to use - either `local` for `window.localStorage` or `session` for `window.sessionStorage` (default) |

## Custom persistence

You can provide a custom class and persist your application state in whichever way you choose.

Four methods must be implemented:

| Method | Description                                                                                                                                                                              |
| --- | --- |
| `setState(state)` | Save the state in the persistence store |
| `getState()` | Retrieve the state from the persistence store |
| `lastUpdated()` | Retrieve the last updated time of the state in milliseconds since the Unix Epoch |
| `removeState()` | Remove the state from the persistence store |

```js
import { createAppState } from 'https://cdn.skypack.dev/ficusjs@3'

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

// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  persist: new MyCustomPersist()
})
```
