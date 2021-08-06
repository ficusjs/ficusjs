---
layout: main.njk
title: FicusJS documentation - Event bus - createEventBus function
---
# createEventBus function

Once you have created your events instance using `createEventBus`, simply pass it to each component:

```js
import { createComponent, createEventBus, withEventBus } from 'https://cdn.skypack.dev/ficusjs@3'

// create the event bus
const eventBus = createEventBus()

// create a new component
createComponent(
  'my-component',
  withEventBus(eventBus, {
    /* pass component creation options here */
  })
)
```
