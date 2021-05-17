---
layout: main.njk
title: FicusJS documentation - Application state - Singleton store
---
# Singleton store

If you want a single instance of a store without having to pass variables around, you can use the singleton pattern to create an instance that can be imported into individual files.
Simply export a `const` and it will be treated as a singleton.

```js
// create a single singleton store
export const store = createAppState('an.example.store', { ... })

// create multiple stores in a singleton
export const allStores = {
  food: createAppState('my.food.store', { ... }),
  drinks: createAppState('my.drinks.store', { ... }),
  snacks: createAppState('my.snacks.store', { ... })
}
```
