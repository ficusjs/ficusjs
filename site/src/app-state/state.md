---
layout: main.njk
title: FicusJS documentation - Application state - State
---
# State

The state tree is a single object that can contain whatever data you want. It's guarded by a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
which keeps an eye on things for you and tells the store if something has been modified.

## Reading state

Retrieving state is done using the `getState` method or by reading the property directly.

The `getState` method is [memoized](https://en.wikipedia.org/wiki/Memoization).

```js
// by getState method
const value = store.getState('some.nested.prop')

// or read the property directly
const value = store.state.some.nested.prop
```

## Mutating state

Mutating state is done using the `setState` method or by direct assignment (similar to component local state).

Please note, using direct assignment will notify subscribers for each value change. Mutating multiple values using direct assignment will trigger notifications for each value being set.

Using `setState` will ensure only a single notification is triggered for multiple value changes. This is important in components as it's paramount to keep re-renders to a minimum.

```js
// by setState method
this.setState(state => ({ ...state, someData: data }))

// or by direct assignment
this.state.someData = data
```
