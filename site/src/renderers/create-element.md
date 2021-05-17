---
layout: main.njk
title: FicusJS documentation - Renderers - document.createElement
---
# document.createElement

The `document.createElement` renderer is available in the [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package.
In your component, return a template literal string containing HTML.

This is only the renderer function and does not use a tagged template literal for rendering.

```js
import { renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/create-element'

createCustomElement('test-comp', {
  renderer,
  render () {
    return `
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
