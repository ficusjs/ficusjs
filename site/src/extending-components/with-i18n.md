---
layout: main.njk
title: FicusJS documentation - Extending components - withI18n function
---
# withI18n function

The `withI18n` function extends a component and makes working with [internationalization (i18n)](/i18n/) easier in components.

```js
// import it with all other features
import { createCustomElement, withI18n } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withI18n } from 'https://cdn.skypack.dev/ficusjs@5/with-i18n'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import an I18n instance from a local file
import { i18n } from './i18n.js'

createCustomElement(
  'my-component',
  withI18n(i18n, {
    renderer,
    buttonClicked () {
      // handle event
    },
    render () {
      return html`<button type="button" onclick=${this.buttonClicked}>${this.i18n.t('buttons.increment')}</button>`
    }
  })
)
```

The `withI18n` function provides a `this.i18n` property within the component.
The following methods are available within the component on `this..i18n`.

### t(key, templateData, options)

The `t()` method retrieves the translation message for the current locale.
The following arguments can be passed to the `t()` method.

| Argument | Type | Required | Description                                                                                                                                                                              |
| --- | --- | --- | --- |
| `key` | `string` | Yes | The key for the specific message. This can be a nested key like `buttons.increment` |
| `templateData` | `object` | | The optional data for message interpolation. The keys must match the message value. For example; the message `Greeting {{ name }}` requires a `templateData` object containing `{ name: 'FicuJS' }` |
| `options` | `object` | | An optional set of options for the message translation |

### getLocale()

The `getLocale()` method gets the current locale of the i18n instance.

## setI18n method

The `setI18n()` method can be called when an instance needs to be set after the component has initialised.
The method accepts an `i18n` argument which is a single `I18n` instance.

```js
{
  someMethod () {
    const i18n = getI18n()
    this.setI18n(i18n)
  }
}
```
