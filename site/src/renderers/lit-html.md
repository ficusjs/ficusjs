---
layout: main.njk
title: FicusJS documentation - Renderers - lit-html
---
# lit-html

The [lit-html](https://www.npmjs.com/package/lit-html) renderer is available in the [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/lit-html'

createCustomElement('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
