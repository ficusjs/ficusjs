---
layout: main.njk
title: FicusJS documentation - Renderers - css
---
# css

The `css` tagged template literal is available in the [`@ficusjs/renderers`](https://www.npmjs.com/package/@ficusjs/renderers) package and is intended for rendering CSS styles within a component.

This renderer is used in conjunction with the [`withStyles`](/extending-components/with-styles/) component extension.

```js
// import the css tagged template literal
import { css } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/css'

createCustomElement(
  'test-comp',
  withStyles({
    renderer,
    styles () {
      return css`
        test-comp div {
          background-color: purple;
          color: pink
        }
      `
    },
    render () {
      return html`
        <div>Some HTML content with ${someVariable}</div>
      `
    }
  })
)
```
