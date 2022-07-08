---
layout: main.njk
title: FicusJS documentation - Event bus - getEventBus function
---
# getEventBus function

The `getEventBus` function is a quick way to retrieve the events instance.
If the event bus has not yet been created, `getEventBus` will create a new instance automatically.

```js
// import the function
import { createCustomElement, getEventBus, withEventBus } from 'https://cdn.skypack.dev/ficusjs@5'

// use it within a component
createCustomElement(
  'my-component',
  withEventBus(getEventBus(), {
    /* pass component creation options here */
  })
)
```
