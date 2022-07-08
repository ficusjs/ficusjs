---
layout: main.njk
title: FicusJS documentation - Extending components - withStore function
---
# withStore function

The `withStore` function extends a component and makes working with stores easier in component rendering, computed getters and methods.

```js
// import it with all other features
import { createCustomElement, withStore } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withStore } from 'https://cdn.skypack.dev/ficusjs@5/with-store'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import a single store or object of stores from a local file
import { store } from './store.js'

createCustomElement(
  'my-component',
  withStore(store, {
    renderer,
    props: {
      personName: {
        type: String,
        required: true
      }
    },
    render () {
      return html`
        <p>
          ${this.store.state.greeting}, there! My name is ${this.props.personName}
        </p>
      `
    }
  })
)
```

The `withStore` function provides a `this.store` property within the component.
It also makes the component reactive to store changes as well as handling automatic store subscriptions based on the component lifecycle hooks.
It will also refresh computed getters when store state changes.

## setStore method

The `setStore` method can be called when a store instance needs to be set after the component has initialised.
The method accepts a `store` argument which can be a single store instance or object of store instances.

```js
{
  someMethod () {
    const store = getStoreSomehow()
    this.setStore(store)
  }
}
```
