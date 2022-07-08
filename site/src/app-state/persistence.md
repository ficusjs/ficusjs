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
import { createAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@5'

// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  persist: createPersist('food', 'local')
})
```

When using the `createPersist` function, the following arguments must be supplied:

| Argument    | Type     | Required | Description                                                                                                                |
|-------------|----------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `namespace` | `string` | true     | The unique namespace for the store                                                                                         |
| `storage`   | `string` | true     | The storage mechanism to use - either `local` for `window.localStorage` or `session` for `window.sessionStorage` (default) |
| `options`   | `object` |          | Persistence options. See [options](#options) below.                                                                        |

### Options

Options can be provided when creating persistence.

```js
import { createAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@5'

// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  initialState: {
    count: 0,
    currentRun: 0
  },
  persist: createPersist('food', 'local', {
    clearOnReload: true,
    saveState (state) {
      return {
        count: state.count
      }
    }
  })
})
```

#### options.clearOnReload

Setting `options.clearOnReload` to `true` will detect the browser reload state using
the [`window.performance`](https://developer.mozilla.org/en-US/docs/Web/API/Performance) API and clear the persistence
if a [`reload`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type) type is detected.

```js
createPersist('food', 'local', {
  clearOnReload: true
})
```

#### options.saveState

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

## Custom persistence

You can provide a custom class and persist your application state in whichever way you choose.

Four methods must be implemented:

| Method            | Description                                                                      |
|-------------------|----------------------------------------------------------------------------------|
| `setState(state)` | Save the state in the persistence store                                          |
| `getState()`      | Retrieve the state from the persistence store                                    |
| `lastUpdated()`   | Retrieve the last updated time of the state in milliseconds since the Unix Epoch |
| `removeState()`   | Remove the state from the persistence store                                      |

```js
import { createAppState } from 'https://cdn.skypack.dev/ficusjs@5'

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
