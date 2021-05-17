---
layout: main.njk
title: FicusJS documentation - Application state - Clearing the store
---
# Clearing the store

To clear a store and reset back to the initial state, use the `clear()` method.

```js
// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  ...
})

// clear the store and reset back to the initial state
store.clear()

// you can also clear without notifying subscribers
store.clear(false)
```
