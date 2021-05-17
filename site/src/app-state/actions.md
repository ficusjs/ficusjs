---
layout: main.njk
title: FicusJS documentation - Application state - Actions
---
# Actions

It is common to be able to call a method and perform an action. To achieve this, you can define methods when creating your store.
Methods are functions that can be defined anywhere in the store definition object.

```js
const store = createAppState('example.store', {
  initialState: {
    someData: null
  },
  someAction () {
    // perform some action
  },
  someOtherAction () {
    // perform another action
  }
})
```

Each action is invoked in the context of the store which means `this` refers to the store instance.

```js
const store = createAppState('example.store', {
  initialState: {
    someData: null
  },
  someAction () {
    doSomeDataLoading()
      .then(data => {
        // call the setState method to mutate the state
        this.setState(state => ({ ...state, someData: data }))
      })
  }
})
```

Actions can contain async operations such as fetching data.

The end-goal of an action can either be committing one or more state changes or returning filtered state.
