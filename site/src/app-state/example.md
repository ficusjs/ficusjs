---
layout: main.njk
title: FicusJS documentation - Application state - Example
---
# Example

Import the `createAppState` function into your Javascript main file:

**main.js**

```js
import { createAppState } from 'https://cdn.skypack.dev/ficusjs@5'
```

Create a new store instance with `initialState` and `action` functions:

**main.js**

```js
const store = createAppState('an.example.store', {
  initialState: {
    count: 0
  },
  increment (payload) {
    this.state.count = this.state.count + payload
  }
})
```
