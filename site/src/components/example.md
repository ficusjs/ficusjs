---
layout: main.njk
title: FicusJS documentation - Components - Example
---
# Example

Import the `createCustomElement` function together with a renderer function and `html` [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) into your Javascript file:

**my-component.mjs**

```js
// import the createCustomElement function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the withLocalState function for internal reactive state
import { withLocalState } from 'https://cdn.skypack.dev/ficusjs@5/with-local-state'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

createCustomElement(
  'my-component',
  withLocalState({
    renderer,
    props: {
      personName: {
        type: String,
        required: true
      }
    },
    state () {
      return {
        greeting: 'Hello'
      }
    },
    render () {
      return html`
        <p>
          ${this.state.greeting}, there! My name is ${this.props.personName}
        </p>
      `
    }
  })
)
```

> Component names require a dash to be used in them; they cannot be single words.

To use the component, place the tag name as you would with regular HTML:

**index.html**

```html
<my-component person-name="Andy"></my-component>
```
