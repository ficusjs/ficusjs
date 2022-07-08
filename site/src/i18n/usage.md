---
layout: main.njk
title: FicusJS documentation - I18n - Usage in components
---
# Usage in components

Once you have created the i18n instance, the `withI18n` function extends a component and makes working with i18n easier in component methods.

See [extending components](/composition) for more on the `withI18n` function.

```js
import { createCustomElement, createI18n, withI18n } from 'https://cdn.skypack.dev/ficusjs@5'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// create the i18n instance
const i18n = createI18n()

// Use the i18n instance in a new component
createCustomElement(
  'my-component',
  withI18n(i18n, {
    renderer,
    render () {
      /* handle render here */
    }
  })
)
```
