---
layout: main.njk
title: FicusJS documentation - I18n - getI18n function
---
# getI18n function

The `getI18n` function is a quick way to retrieve the i18n instance.
If the i18n instance has not yet been created, `getI18n` will create a new instance automatically.

```js
// import the function
import { createCustomElement, getI18n, withI18n } from 'https://cdn.skypack.dev/ficusjs@5'

// use it within a component
createCustomElement(
  'my-component',
  withI18n(getI18n(), {
    /* pass component creation options here */
  })
)
```
