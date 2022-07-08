---
layout: main.njk
title: FicusJS documentation - Renderers - htm
---
# htm

The [htm](https://www.npmjs.com/package/htm) renderer is a JSX-like renderer (no transpiler necessary) available in the [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package.

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'

createCustomElement('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
