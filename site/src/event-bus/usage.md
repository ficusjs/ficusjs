---
layout: main.njk
title: FicusJS documentation - Event bus - Usage in components
---
# Usage in components

Once you have created your events instance, the `withEventBus` function extends a component and makes working with an event bus easier in component methods.

Subscriptions based on lifecycle hooks will be automatically handled within the component.
You need to provide the initial topic subscription (use the `created` or `mounted` lifecycle hook) and then once established, subscriptions
will be handled automatically when the component fires the `removed` or `updated` lifecycle hook.

See [extending components](/composition) for more on the `withEventBus` function.

```js
import { createCustomElement, createEventBus, withEventBus } from 'https://cdn.skypack.dev/ficusjs@5'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

const eventBus = createEventBus()

// A new component
createCustomElement(
  'my-component',
  withEventBus(eventBus, {
    renderer,
    handleEvent (data) {
      /* handle event here */
    },
    mounted () {
      this.events.subscribe('my-event', this.handleEvent)
    },
    render () {
      /* handle render here */
    }
  })
)
```
