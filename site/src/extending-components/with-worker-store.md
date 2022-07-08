---
layout: main.njk
title: FicusJS documentation - Extending components - withWorkerStore function
---
# withWorkerStore function

The `withWorkerStore` function extends a component and makes working with stores in web workers easier.

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'
import { createCustomElement, withWorkerStore } from 'https://cdn.skypack.dev/ficusjs@5'

// import the worker
import { worker } from './worker-store.js'

createCustomElement('example-component',
  withWorkerStore(worker, {
    renderer,
    increment () {
      this.store.dispatch('increment', this.state.count + 1)
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>Increment</button>`
    }
  })
)
```

The `withWorkerStore` function provides a `this.state` property within the component as well as a `this.store.dispatch()` method for invoking store actions.
It also makes the component reactive to store changes as well as handling automatic store subscriptions based on the component lifecycle hooks.
It will also refresh computed getters when store state changes.

## dispatch method

The `dispatch` method can be called to invoke an action in the store.

```js
this.store.dispatch('increment', this.state.count + 1)
```

The `dispatch` method takes two parameters:

- `actionKey` is the string name of your action
- `payload` is the data that you want to pass along to your action
