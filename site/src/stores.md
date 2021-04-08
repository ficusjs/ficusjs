---
layout: main.njk
title: FicusJS documentation - Stores
---
# Stores

FicusJS provides a function for creating fast, lightweight stores for application state.

To store application state outside of your components and have them react to changes, you can create a store which is shared across multiple components.

## Example

Import the `createStore` function into your Javascript main file:

**main.js**

```js
import { createStore } from 'https://cdn.skypack.dev/ficusjs@3'
```

Create a new store instance with `initialState` and `actions`:

**main.js**

```js
const store = createStore('an.example.store', {
  initialState: {
    count: 0
  },
  increment (payload) {
    this.state.count = this.state.count + payload
  }
})
```

## createStore function

When using the `createStore` function, you **must** pass two parameters:

1. store key (for example `an.example.store`) - keys must be unique and are used to retrieve stores later
2. an `object` that defines the properties of the store

The following properties can be used when creating stores:

| Property | Type | Description                                                                                                                                                                              |
| --- | --- | --- |
| `initialState` | `object` | The initial state of the store |
| `persist` | `string` or `object` | If persistence is required (between reloads), provide a unique namespace string for saving the store to `window.sessionStorage` |
| `ttl` | `number` | Limit the lifetime of the data in the store by setting a time to live in seconds. Once the amount of seconds has elapsed, the store resets back to the `initialState` values |
| `*` | `function` | one or more action functions that are invoked to eventually mutate state |

## getStore function

The `getStore` function is a quick way to retrieve a store.

```js
// import the function
import { getStore } from 'https://cdn.skypack.dev/ficusjs@3'

// retrieve a store instance
const storeInstance = getStore('my.another.store')
```

## State

The state tree is a single object that can contain whatever data you want. It's guarded by a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
which keeps an eye on things for you and tells the store if something has been modified.

### Reading state

Retrieving state is done using the `getState` method or by reading the property directly.

The `getState` method is [memoized](https://en.wikipedia.org/wiki/Memoization).

```js
// by getState method
const value = store.getState('some.nested.prop')

// or read the property directly
const value = store.state.some.nested.prop
```

### Mutating state

Mutating state is done using the `setState` method or by direct assignment (similar to component local state).

Please note, using direct assignment will notify subscribers for each value change. Mutating multiple values using direct assignment will trigger notifications for each value being set.

Using `setState` will ensure only a single notification is triggered for multiple value changes. This is important in components as it's paramount to keep re-renders to a minimum.

```js
// by setState method
this.setState(state => ({ ...state, someData: data }))

// or by direct assignment
this.state.someData = data
```

## Actions

It is common to be able to call a method and perform an action. To achieve this, you can define methods when creating your store.
Methods are functions that can be defined anywhere in the store definition object.

```js
const store = createStore('example.store', {
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
const store = createStore('example.store', {
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

## Subscribing to store changes

If you want to be notified whenever the store state changes, you can use the `subscribe` method to register a callback function.
This method returns a function which can be invoked later for unsubscription.

```js
// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
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

## Clearing the store

To clear a store and reset back to the initial state, use the `clear()` method.

```js
// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  ...
})

// clear the store and reset back to the initial state
store.clear()

// you can also clear without notifying subscribers
store.clear(false)
```

## Multiple stores

You can create as many stores as you want to separate your application state.

### Manage multiple store instances with an object

Simply create a Javascript `Object` containing multiple store instances and then pass specific instances to your components.

You can also pass this object to a component and have it reacting to all store instances.

```js
// Create a number of stores
const allStores = {
  food: createStore('my.food.store', { ... }),
  drinks: createStore('my.drinks.store', { ... }),
  snacks: createStore('my.snacks.store', { ... })
}

// Pass a relevant store to a component
createComponent(
  'my-component',
  withStore(allStores.drinks, {
    ...
  })
)

// Or pass all the stores to a component
createComponent(
  'my-component',
  withStore(allStores, {
    ...
  })
)

// Or just pass the required stores to a component
createComponent(
  'my-component',
  withStore({
    food: allStores.food,
    snacks: allStores.snacks
  }, {
    ...
  })
)
```

### Clearing multiple stores

You can clear multiple stores using custom methods.

```js
// A helper function for testing a store instance
function isStore (store) {
  return store.subscribe && typeof store.subscribe === 'function'
}

// Create a number of stores
const allStores = {
  food: createStore('my.food.store', { ... }),
  drinks: createStore('my.drinks.store', { ... }),
  snacks: createStore('my.snacks.store', { ... }),
  clear (notifySubscribers = true) {
    Object.values(this).forEach(v => isStore(v) && v.clear(notifySubscribers))
  }
}
```

## Singleton store

If you want a single instance of a store without having to pass variables around, you can use the singleton pattern to create an instance that can be imported into individual files.
Simply export a `const` and it will be treated as a singleton.

```js
// create a single singleton store
export const store = createStore('an.example.store', { ... })

// create multiple stores in a singleton
export const allStores = {
  food: createStore('my.food.store', { ... }),
  drinks: createStore('my.drinks.store', { ... }),
  snacks: createStore('my.snacks.store', { ... })
}
```

## Persistence

To survive hard refreshes from the user, your state can be persisted to `sessionStorage` automatically.
This will re-hydrate your store on initialisation.

```js
// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  persist: 'food' // this must be a unique namespace for the store
})
```

### createPersist function

You can optionally save state to `window.localStorage` (for persistence across browser sessions) using the `createPersist` function:

```js
import { createStore, createPersist } from 'https://cdn.skypack.dev/ficusjs@3'

// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  persist: createPersist('food', 'local')
})
```

When using the `createPersist` function, the following arguments must be supplied:

| Argument | Type | Description                                                                                                                                                                              |
| --- | --- | --- |
| `namespace` | `string` | The unique namespace for the store |
| `storage` | `string` | The storage mechanism to use - either `local` for `window.localStorage` or `session` for `window.sessionStorage` (default) |

### Custom persistence

You can provide a custom class and persist your application state in whichever way you choose.

Four methods must be implemented:

| Method | Description                                                                                                                                                                              |
| --- | --- |
| `setState(state)` | Save the state in the persistence store |
| `getState()` | Retrieve the state from the persistence store |
| `lastUpdated()` | Retrieve the last updated time of the state in milliseconds since the Unix Epoch |
| `removeState()` | Remove the state from the persistence store |

```js
import { createStore } from 'https://cdn.skypack.dev/ficusjs@3'

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
const store = createStore('an.example.store', {
  persist: new MyCustomPersist()
})
```

## Usage in components

Once you have created your store instance, the `withStore` function extends a component and makes working with stores easier in component rendering, computed getters and methods.
Subscription to store changes will be handled automatically within the component.

See [extending components](/composition) for more on the `withStore` function.

```js
import { createComponent, withStore } from 'https://cdn.skypack.dev/ficusjs@3'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'

// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  ...
})

// A new component
createComponent(
  'my-component',
  withStore(store, {
    ...
  })
)
```
