---
layout: main.njk
title: FicusJS documentation - Installation
---
# Installation

FicusJS can be installed in a number of ways.

## CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'
</script>
```

FicusJS is available on [Skypack](https://www.skypack.dev/view/ficusjs).

## NPM

FicusJS works nicely with build tools such as Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install ficusjs
```

## Available builds

FicusJS only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

The following builds are available.

### All features

```js
import {
  // components
  createCustomElement,
  createComponent,

  // extending components
  ExtensionBuilder,
  withLocalState,
  withStyles,
  withLazyRender,
  withBreakpointRender,
  withStateMachine,
  withXStateService,
  withStore,
  withWorkerStore,
  withEventBus,
  withI18n,

  // extending components - DEPRECATED
  withStateTransactions,

  // event bus
  createEventBus,
  getEventBus,

  // app state
  createAppState,
  getAppState,
  createPersist,

  // stores - DEPRECATED
  createStore,
  getStore,

  // i18n
  createI18n,
  getI18n,

  // modules
  use
} from 'https://cdn.skypack.dev/ficusjs@3'
```

### Custom elements

```js
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@3/custom-element'
```

### Components

```js
import { createComponent } from 'https://cdn.skypack.dev/ficusjs@3/component'
```

### Extending components

```js
import { ExtensionBuilder } from 'https://cdn.skypack.dev/ficusjs@3/extension-builder'
import { withLocalState } from 'https://cdn.skypack.dev/ficusjs@3/with-local-state'
import { withStyles } from 'https://cdn.skypack.dev/ficusjs@3/with-styles'
import { withLazyRender } from 'https://cdn.skypack.dev/ficusjs@3/with-lazy-render'
import { withBreakpointRender } from 'https://cdn.skypack.dev/ficusjs@3/with-breakpoint-render'
import { withStateMachine } from 'https://cdn.skypack.dev/ficusjs@3/with-state-machine'
import { withXStateService } from 'https://cdn.skypack.dev/ficusjs@3/with-xstate-service'
import { withStore } from 'https://cdn.skypack.dev/ficusjs@3/with-store'
import { withWorkerStore } from 'https://cdn.skypack.dev/ficusjs@3/with-worker-store'
import { withEventBus } from 'https://cdn.skypack.dev/ficusjs@3/with-event-bus'
import { withI18n } from 'https://cdn.skypack.dev/ficusjs@3/with-i18n'
```

### Extending components <span class="fd-deprecated" style="font-size: 1rem">DEPRECATED</span>

```js
import { withStateTransactions } from 'https://cdn.skypack.dev/ficusjs@3/with-state-transactions'
```

### Event bus

```js
import { createEventBus, getEventBus } from 'https://cdn.skypack.dev/ficusjs@3/event-bus'
```

### Application state

```js
import { createAppState, getAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@3/app-state'
```

### Stores <span class="fd-deprecated" style="font-size: 1rem">DEPRECATED</span>

```js
import { createStore, getStore } from 'https://cdn.skypack.dev/ficusjs@3/store'
```

### Internationalization (i18n)

```js
import { createI18n, getI18n } from 'https://cdn.skypack.dev/ficusjs@3/i18n'
```
