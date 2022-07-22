---
layout: main.njk
title: FicusJS documentation - Extending components - Extension builder
---
# Extension builder

Working with multiple component extensions can be made easier by using the `ExtensionBuilder` class.

```js
// import it with all other features
import { createCustomElement, ExtensionBuilder } from 'https://cdn.skypack.dev/ficusjs@5'

// Alternatively, import the ExtensionBuilder function
// import { ExtensionBuilder } from 'https://cdn.skypack.dev/ficusjs@5/extension-builder'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

import { store } from './store.mjs'
import { i18n } from './i18n.mjs'

createCustomElement(
  'example-button',
  ExtensionBuilder
    .newInstance()
    .withStore(store)
    .withI18n(i18n)
    .create({
      clear () {
        this.store.clear()
      },
      render () {
        return html`<button type="button" onclick=${this.clear}>${this.i18n.t('buttons.clear')}</button>`
      }
    })
)
```

The `ExtensionBuilder` class uses the builder pattern to make it easier to use more than one component extension.

## Methods

The methods of the `ExtensionBuilder` can be chained.

### newInstance()

Create a new instance of the `ExtensionBuilder` class.

```js
const builder = ExtensionBuilder.newInstance()
```

### withBreakpointRender(breakpointConfig)

Use the [`withBreakpointRender`](/extending-components/with-breakpoint-render/) extension function.

```js
const breakpointConfig = {
  reactive: false,
  breakpoints: {
    992: { method: 'renderTablet' },
    768: { method: 'renderMobile' },
    1200: { method: 'renderDesktop' }
  }
}

const builder = ExtensionBuilder
  .newInstance()
  .withBreakpointRender(breakpointConfig)
```

### withEventBus(eventBus)

Use the [`withEventBus`](/extending-components/with-event-bus/) extension function.

```js
import { eventBus } from './event-bus.mjs'

const builder = ExtensionBuilder
  .newInstance()
  .withEventBus(eventBus)
```

### withI18n(i18n)

Use the [`withI18n`](/extending-components/with-i18n/) extension function.

```js
import { i18n } from './i18n.mjs'

const builder = ExtensionBuilder
  .newInstance()
  .withI18n(i18n)
```

### withLazyRender()

Use the [`withLazyRender`](/extending-components/with-lazy-render/) extension function.

```js
const builder = ExtensionBuilder
  .newInstance()
  .withLazyRender()
```

### withStyles()

Use the [`withStyles`](/extending-components/with-styles/) extension function.

```js
const builder = ExtensionBuilder
  .newInstance()
  .withStyles()
```

### withLocalState()

Use the [`withLocalState`](/extending-components/with-local-state/) extension function.

```js
const builder = ExtensionBuilder
  .newInstance()
  .withLocalState()
```

### withStore(store)

Use the [`withStore`](/extending-components/with-store/) extension function.

```js
import { store } from './store.mjs'

const builder = ExtensionBuilder
  .newInstance()
  .withStore(store)
```

### withWorkerStore(worker)

Use the [`withWorkerStore`](/extending-components/with-worker-store/) extension function.

```js
import { worker } from './worker-store.mjs'

const builder = ExtensionBuilder
  .newInstance()
  .withWorkerStore(worker)
```

### withXStateService(service)

Use the [`withXStateService`](/state-machines/with-xstate-service/) extension function.

```js
import { getXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

const service = getXStateService('toggle.service')

const builder = ExtensionBuilder
  .newInstance()
  .withXStateService(service)
```

### create(options)

Create component options with added extensions. This method wraps all extensions with supplied component options.

```js
createCustomElement(
  'example-button',
  ExtensionBuilder
    .newInstance()
    .withStore(store)
    .withI18n(i18n)
    .create({
      clear () {
        this.store.clear()
      },
      render () {
        return html`<button type="button" onclick=${this.clear}>${this.i18n.t('buttons.clear')}</button>`
      }
    })
)
```
