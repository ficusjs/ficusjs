---
layout: main.njk
title: FicusJS documentation - I18n - createI18n function
---
# createI18n function

Creating a new i18n instance using `createI18n` will create an instance of the `I18n` class.
This class provides methods for working with multiple languages and localisations.

**The i18n instance will be created as a singleton - this ensures only one instance exists.**

```js
import { createI18n } from 'https://cdn.skypack.dev/ficusjs@5'

// create the i18n instance and add the messages
const i18n = createI18n()
```

The current locale is set according to the following rules:

1. `lang` query string parameter `?lang=es`
2. HTML `lang` attribute `<html lang="es">`
3. `navigator.language` property

## Methods

The following methods are available on the i18n instance.

### add(items, locale, prefix)

```js
i18n.add({ greeting: 'Hello FicusJS' }, 'en')
```

The `add()` method adds messages to the i18n instance.

Message interpolation uses double handlebars <code>{\{ value }}</code>.

The following arguments can be passed to the `add()` method.

| Argument | Type | Required | Description                                                                                                                                                                              |
| --- | --- | --- | --- |
| `items` | `object` | Yes | The object containing messages |
| `locale` | `string` | | An optional locale for the messages. For example `es`. The default is `en` |
| `prefix` | `string` | | An optional prefix for the messages |

### t(key, templateData, options)

The `t()` method retrieves the translation message for the current locale.

Translation messages are stored under the specified key according to the current locale.
If `templateData` is present, messages are interpolated with `templateData`.

A specific locale translation can be specified via `options.locale`.

Pluralization is done in reference to `count` template data value when an array is passed to the `t()` function (override with `options.pluralizeTo`).

The following arguments can be passed to the `t()` method.

| Argument | Type | Required | Description                                                                                                                                                                              |
| --- | --- | --- | --- |
| `key` | `string` | Yes | The key for the specific message. This can be a nested key like `navbar.buttons.home` |
| `templateData` | `object` | | The optional data for message interpolation. The keys must match the message value. For example; the message <code>Greeting {\{ name }}</code> requires a `templateData` object containing `{ name: 'FicusJS' }` |
| `options` | `object` | | An optional set of options for the message translation |

```js
i18n.add({
  navbar: {
    buttons: {
      home: "Home"
    }
  }
})

const value = i18n.t('navbar.buttons.home')

// value is 'Home'
```

### setLocale(locale)

The `setLocale()` method sets the current locale of the i18n instance.

The following arguments can be passed to the `setLocale()` method.

| Argument | Type | Required | Description                                                                                                                                                                              |
| --- | --- | --- | --- |
| `locale` | `string` | Yes | The locale string. The default is `en` |

```js
i18n.setLocale('es')
```

### getLocale()

The `getLocale()` method gets the current locale of the i18n instance.

```js
const locale = i18n.getLocale()

// locale is 'es'
```

### interpolateWith(userRE)

The `interpolateWith()` method sets the regular expression for template strings interpolation.
By default, string interpolation uses double handlebars <code>{\{ value }}</code>.

This can be overridden using the `interpolateWith()` with the following arguments.

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `userRE` | `RegExp` | Yes | The regex for template string interpolation |

```js
i18n.add({ welcomeMessage: 'Hello $userName' })

i18n.interpolateWith(/\$(\w+)/g)

const value = i18n.t('welcomeMessage', { userName: 'George' })

// value is 'Hello George'
```

### setPluralizationRule(locale, rule, options)

The `setPluralizationRule()` method sets a locale-specific pluralization rule function to determine plural form variation index.

```js
i18n.setPluralizationRule('en', function (count) {
    return (1 === count) ? 0 : 1
}, { pluralizeTo: 'count' })
```

### whenUndefined(key, locale)

The `whenUndefined()` method defines a custom handler for when the requested item is not available.

```js
i18n.whenUndefined = function (key, locale) {
    return `${key}:undefined:${locale}`
}

const value = i18n.t('errors.dateInput')

// value is 'errors.dateInput:undefined:es'
```

### clear()

The `clear()` method empties the instance of messages.

```js
i18n.clear()
```
