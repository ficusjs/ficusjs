---
layout: main.njk
title: FicusJS documentation - I18n - Example
---
# Example

Import the `createI18n` function into your Javascript main file:

```js
import { createI18n } from 'https://cdn.skypack.dev/ficusjs@5'
```

Create a new `I18n` instance:

**main.js**

```js
const i18n = createI18n()

i18n.add({ greeting: 'Hello FicusJS' }, 'en')

const value = i18n.t('greeting')

// value is 'Hello FicusJS'
```
