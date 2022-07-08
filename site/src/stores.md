---
layout: main.njk
title: FicusJS documentation - Stores
---
# Stores <span class="fd-deprecated" style="font-size: 1rem">Deprecated</span>

Stores have been replaced with [application state](/app-state/) which is a simpler, less convoluted way of working with stores.

---

FicusJS provides a function for creating fast, lightweight stores for application state.

To store application state outside of components and have them react to change, you can create a store which is shared across multiple components.

## Example

Import the `createStore` function into your Javascript main file:

**main.js**

```js
import { createStore } from 'https://cdn.skypack.dev/ficusjs@5'
```

Create a new store instance with `actions`, `mutations` and `initialState`:

**main.js**

```js
const store = createStore('an.example.store', {
  ttl: 5,
  initialState: {
    count: 0
  },
  actions: {
    increment (context, payload) {
      context.commit('increment', payload)
    }
  },
  mutations: {
    increment (state, payload) {
      state.count = payload
      return state
    }
  },
  getters: {
    max (state) {
      return Math.max(state.count) * 1000
    }
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
| `actions` | `object` | Contains one or more action functions that are dispatched to eventually mutate state |
| `mutations` | `object` | Contains one or more mutation functions that set values and return new state |
| `getters` | `object` | Contains one or more getter functions that return state projections |
| `router` | `object` | A router instance for use in actions where changing URL is required |
| `persist` | `string` or `object` | If persistence is required (between reloads), provide a unique namespace string for saving the store to `window.sessionStorage` |
| `ttl` | `number` | Limit the lifetime of the data in the store by setting a time to live in seconds. Once the amount of seconds has elapsed, the store resets back to the `initialState` values |

## getStore function

The `getStore` function is a quick way to retrieve a store.

```js
// import the function
import { getStore } from 'https://cdn.skypack.dev/ficusjs@5'

// retrieve a store instance
const storeInstance = getStore('my.another.store')
```

## State

The state tree is a single object that can contain whatever data you want. It's guarded by a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
which keeps an eye on things for you and tells the store if something has been modified.

### Reading state

You can read a value from state once the instance has been created:

```js
// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  ...
})

// Log the title of the above state example
console.log(store.state.title)
```

## Actions

To modify state, you need to dispatch an `action`.

Actions are quite similar to mutations, but they can contain async operations such as fetching data. The end-goal of an action is to commit one or more `mutations`.

```js
// Create a store with actions
const store = createStore('an.example.store', {
  actions: {
    updateTitle (context, payload) {
      context.commit('setTitle', payload.text)
    }
  }
})
```

### Dispatch

The `dispatch` method is part of the store object and runs actions for you. You can dispatch wherever there's a reference to your store:

```js
// Dispatch the `updateTitle` action to update the title
store.dispatch('updateTitle', { text: 'The new text for the title' })
```

The `dispatch` method takes two parameters:

- `actionKey` is the string name of your action
- `payload` is the data that you want to pass along to your action

## Mutations

To actually modify the state, a `mutation` will take over.

Mutations provide a synchronous method of mutating state. They have one job and one job only: mutate the state and return it.

```js
// Create a store with actions
const store = createStore('an.example.store', {
  mutations: {
    setTitle (state, payload) {
      state.title = payload
      return state
    }
  }
})
```

The `setTitle` method has two parameters:

- `state` is the current version of your store's state before this mutation
- `payload` is the data that was passed in by your action

Mutations like this should be as simple as possible and only mutate the state. Anything more complex should be done at an action level.

### Commit

The `commit` method is part of the store object and runs mutations for you.

```js
// Run the `setTitle` mutation to set the state
context.commit('setTitle', payload)
```

The `commit` method takes two parameters:

- `mutationKey` is the string name of your mutation
- `payload` is the data that you want to pass along to your mutation

## Getters

Getters are useful if you want to return a projection of the state. A projection is a shape derived from the state.

They are memoized functions which means the result of the getter is cached for subsequent executions. This is useful when creating projections from large sets of data.
Setting state will automatically reset the getter cache.

For example, given an array of objects, a getter can return a filtered set of objects:

```js
// Create a store with actions
const store = createStore('an.example.store', {
  initialState: {
    people: [
      { name: 'Bill', status: 'Active' },
      { name: 'Ted', status: 'Active' },
      { name: 'Grim Reaper', status: 'Disabled' }
    ]
  },
  getters: {
    activePeople (state) {
      return state.people.filter(p => p.state === 'Active')
    }
  }
})

const activeOnes = store.getters.activePeople
// [{ name: 'Bill', status: 'Active' }, { name: 'Ted', status: 'Active' }]
```

### Passing arguments to getters

If you want to pass arguments to getters for specific filtering, you can return a function as a getter:

```js
{
  getters: {
    timesBy (state) {
      return (amount) => state.count * amount
    }
  }
}

const total = store.getters.timesBy(20)
// given a state.count value of 2, total will be 40
```

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

## Transactions

A transaction is a sequence of operations performed (using one or more actions/mutations) on a store as a single logical unit of work.
The transaction can be either all committed (applied to the store) or all rolled back (undone from the store).

```js
// Begin a transaction
store.begin()

try {
  // Dispatch the `updateTitle` action to update the title
  store.dispatch('updateTitle', { text: 'The new text for the title' })

  // Commit a text change
  store.commit('setText', 'example')

  // Apply the transaction to the store and notify subscribers to re-render
  store.end()
} catch (e) {
  // Rollback the transaction changes
  store.rollback()
}
```

### begin method

The `begin` method starts a transaction.

### end method

The `end` method ends the transaction and notifies subscribers that the store state has changed.

### rollback method

The `rollback` method rolls back the store state changes carried out within the transaction.
This is used if an error occurs, and the state needs to be reset.

## Multiple stores

You can create as many stores as you want to separate your application state.

### Manage multiple store instances with an `Object`

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
createCustomElement(
  'my-component',
  withStore(allStores.drinks, {
    ...
  })
)

// Or pass all the stores to a component
createCustomElement(
  'my-component',
  withStore(allStores, {
    ...
  })
)

// Or just pass the required stores to a component
createCustomElement(
  'my-component',
  withStore({
    food: allStores.food,
    snacks: allStores.snacks
  }, {
    ...
  })
)
```

### Transactions using an object of stores

To perform transactions across a set of stores, create methods to co-ordinate the transaction methods.

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
  begin () {
    Object.values(this).forEach(v => isStore(v) && v.begin())
  },
  end () {
    Object.values(this).forEach(v => isStore(v) && v.end())
  },
  rollback () {
    Object.values(this).forEach(v => isStore(v) && v.rollback())
  }
}
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
import { createStore, createPersist } from 'https://cdn.skypack.dev/ficusjs'

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
import { createStore } from 'https://cdn.skypack.dev/ficusjs'

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

See [extending components](/docs/composition) for more on the `withStore` function.

```js
import { createCustomElement, withStore } from 'https://cdn.skypack.dev/ficusjs@5'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/lit-html'

// An initialised store. Params omitted for brevity
const store = createStore('an.example.store', {
  ...
})

// A new component
createCustomElement(
  'my-component',
  withStore(store, {
    ...
  })
)
```
