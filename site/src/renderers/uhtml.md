---
layout: main.njk
title: FicusJS documentation - Renderers - uhtml
---
# uhtml

The [uhtml](https://www.npmjs.com/package/uhtml) renderer is available in the [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package and is the default renderer.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

createCustomElement('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
