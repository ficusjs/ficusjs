---
layout: main.njk
title: FicusJS documentation - Application state - Multiple stores
---
# Multiple stores

You can create as many stores as you want to separate your application state.

## Manage multiple store instances with an object

Simply create a Javascript `Object` containing multiple store instances and then pass specific instances to your components.

You can also pass this object to a component and have it reacting to all store instances.

```js
// Create a number of stores
const allStores = {
  food: createAppState('my.food.store', { ... }),
  drinks: createAppState('my.drinks.store', { ... }),
  snacks: createAppState('my.snacks.store', { ... })
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

## Clearing multiple stores

You can clear multiple stores using custom methods.

```js
// A helper function for testing a store instance
function isStore (store) {
  return store.subscribe && typeof store.subscribe === 'function'
}

// Create a number of stores
const allStores = {
  food: createAppState('my.food.store', { ... }),
  drinks: createAppState('my.drinks.store', { ... }),
  snacks: createAppState('my.snacks.store', { ... }),
  clear (notifySubscribers = true) {
    Object.values(this).forEach(v => isStore(v) && v.clear(notifySubscribers))
  }
}
```
