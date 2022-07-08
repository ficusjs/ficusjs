---
layout: main.njk
title: FicusJS documentation - Extending components - withEventBus function
---
# withEventBus function

The `withEventBus` function extends a component and makes working with an event bus easier in component methods.

```js
// import it with all other features
import { createCustomElement, withEventBus } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withEventBus } from 'https://cdn.skypack.dev/ficusjs@5/with-event-bus'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import an event bus from a local file
import { eventBus } from './event-bus.js'

createCustomElement(
  'my-component',
  withEventBus(eventBus, {
    renderer,
    buttonClicked () {
      this.eventBus.publish('increment', undefined)
    },
    render () {
      return html`<button type="button" onclick=${this.buttonClicked}>Increment</button>`
    }
  })
)
```

The `withEventBus` function provides a `this.eventBus` property within the component.
It handles automatic event bus subscription based on the component lifecycle hooks.

## setEventBus method

The `setEventBus` method can be called when an instance needs to be set after the component has initialised.
The method accepts an `eventBus` argument which is a single event instance.

```js
{
  someMethod () {
    const eventBus = getEventBus()
    this.setEventBus(eventBus)
  }
}
```
