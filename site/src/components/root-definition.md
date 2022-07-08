---
layout: main.njk
title: FicusJS documentation - Components - Root definition
---
# Root definition

You can use a standard root, a closed Shadow DOM root or an open Shadow DOM root by specifying a `root` in your config object:

| Key             | Value                    |
| --------------- | ------------------------ |
| `standard`      | A normal HTML root       |
| `shadow`        | An open Shadow DOM root  |
| `shadow:closed` | A closed Shadow DOM root |

```js
// import the createCustomElement function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the renderer and html tagged template literal from the htm renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'

createCustomElement('my-component', {
  renderer,
  root: 'shadow',
  props: {
    personName: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log(this.shadowRoot.querySelector('p').textContent)
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
