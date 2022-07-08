---
layout: main.njk
title: FicusJS documentation - Application state - Usage in components
---
# Usage in components

Once you have created your store instance, the `withStore` function extends a component and makes working with stores easier in component rendering, computed getters and methods.
Subscription to store changes will be handled automatically within the component.

See [extending components](/composition) for more on the `withStore` function.

```js
import { createCustomElement, withStore } from 'https://cdn.skypack.dev/ficusjs@5'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// An initialised store. Params omitted for brevity
const store = createAppState('an.example.store', {
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
