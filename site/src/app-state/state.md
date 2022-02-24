---
layout: main.njk
title: FicusJS documentation - Application state - State
---
# State

The state tree is a single object that can contain whatever data you want. It's guarded by a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
which keeps an eye on things for you and tells the store if something has been modified.

## Reading state

Retrieving state is done by reading the property directly or by using the `getState` method.

```js
// read the property directly
const value = store.state.some.nested.prop
```

### getState method

The `getState` method accepts either a string or function to retrieve state.

The `getState` method is [memoized](https://en.wikipedia.org/wiki/Memoization) so return values are cached between state changes.
If the state changes, the value is cleared and re-calculated on the next call.

When passing a string to the `getState` method, this is the property of the state to return. This can be a nested property.

```js
// use a string to retrieve a nested state value
const value = store.getState('some.nested.prop')
```

When passing a function to the `getState` method, the function can return a projection of the state.
The function is passed the current state so that it can return the required value.

```js
// use a function to retrieve state
const value = store.getState(state => {
  return {
    some: state.some.nested.prop,
    other: 'prop'
  }
})
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
