---
layout: main.njk
title: FicusJS documentation - Application state - Subscribing to store changes
---
# Subscribing to store changes

If you want to be notified whenever the store state changes, you can use the `subscribe` method to register a callback function.
This method returns a function which can be invoked later for unsubscription.

```js
// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
  ...
})

// Subscribe to changes in the store
const unsubscribe = store.subscribe(() => {
  // this callback is invoked whenever the store changes
  console.log('Store has changed!')
})

// Unsubscribe later
unsubscribe()
```
