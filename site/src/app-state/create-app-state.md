---
layout: main.njk
title: FicusJS documentation - Application state - createAppState function
---
# createAppState function

When using the `createAppState` function, you **must** pass two parameters:

1. store key (for example `an.example.store`) - keys must be unique and are used to retrieve stores later
2. an `object` that defines the properties of the store

The following properties are used when creating stores:

| Property | Type | Description                                                                                                                                                                              |
| --- | --- | --- |
| `initialState` | `object` | The initial state of the store |
| `persist` | `string` or `object` | If persistence is required (between reloads), provide a unique namespace string for saving the store to `window.sessionStorage` |
| `ttl` | `number` | Limit the lifetime of the data in the store by setting a time to live in milliseconds. Once the amount of milliseconds has elapsed, the store resets back to the `initialState` values |
| `*` | `function` | one or more action functions that are invoked to eventually mutate state |

```js
const store = createAppState('an.example.store', {
  initialState: {
    count: 0
  },
  persist: 'an.example.store',
  ttl: 3600000, // 1 hour
  increment (payload) {
    this.state.count = this.state.count + payload
  }
})
```
