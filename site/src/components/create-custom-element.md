---
layout: main.njk
title: FicusJS documentation - Components - createCustomElement function
---
# createCustomElement function

The `createCustomElement` function defines a new component with the provided tag plus declarative object and registers it in the browser as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Component names require a dash to be used in them; they **cannot** be single words - this is mandatory according to the [custom element API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## Arguments

When using the `createCustomElement` function, you **must** pass two arguments:

1. tag name (for example `my-component`) - names require a dash to be used in them; they cannot be single words
2. an `object` that defines the properties of the component

The following properties are used when creating components:

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `renderer` | yes | `function` | A function that renders what is returned from the `render` function |                                                                                    |
| `render` | yes | `function` | A function that must return a response that can be passed to the `renderer` function for creating HTML |                                                                                    |
| `root` |  | `string` | Sets the root definition for the component |
| `props` |  | `object` | Describes one or more property definitions - these are attributes and instance properties that can be set when using the component |
| `computed` |  | `object` | Contains one or more getters (functions that act like properties) that are useful when rendering |
| `*` |  | `function` | Functions that are useful in performing actions and logic |
| `created` |  | `function` | Invoked when the component is created and before it is connected to the DOM |
| `mounted` |  | `function` | Invoked when the component is first connected to the DOM. This may trigger before the components contents have been fully rendered |
| `updated` |  | `function` | Invoked when the component is moved or reconnected to the DOM. This may trigger before the components contents have been fully rendered |
| `removed` |  | `function` | Invoked each time the component is disconnected from the DOM |

```js
// import the createCustomElement function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the renderer and html tagged template literal from the htm renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'

createCustomElement('my-component', {
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
        Hi, there! My name is ${this.props.personName}
      </p>
    `
  }
})
```
