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
  import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'
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
  withBreakpointRender,
  withEventBus,
  withI18n,
  withLazyRender,
  withLocalState,
  withStateMachine,
  withStore,
  withStyles,
  withWorkerStore,
  withXStateService,

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

  // finite state machines and statecharts
  assign,
  createMachine,
  createXStateService,
  getXStateService,
  interpret,

  // modules
  use
} from 'https://cdn.skypack.dev/ficusjs@5'
```

### Custom elements

```js
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'
```

### Components

```js
import { createComponent } from 'https://cdn.skypack.dev/ficusjs@5/component'
```

### Extending components

```js
import { ExtensionBuilder } from 'https://cdn.skypack.dev/ficusjs@5/extension-builder'
import { withBreakpointRender } from 'https://cdn.skypack.dev/ficusjs@5/with-breakpoint-render'
import { withEventBus } from 'https://cdn.skypack.dev/ficusjs@5/with-event-bus'
import { withI18n } from 'https://cdn.skypack.dev/ficusjs@5/with-i18n'
import { withLazyRender } from 'https://cdn.skypack.dev/ficusjs@5/with-lazy-render'
import { withLocalState } from 'https://cdn.skypack.dev/ficusjs@5/with-local-state'
import { withStateMachine } from 'https://cdn.skypack.dev/ficusjs@5/with-state-machine'
import { withStore } from 'https://cdn.skypack.dev/ficusjs@5/with-store'
import { withStyles } from 'https://cdn.skypack.dev/ficusjs@5/with-styles'
import { withWorkerStore } from 'https://cdn.skypack.dev/ficusjs@5/with-worker-store'
import { withXStateService } from 'https://cdn.skypack.dev/ficusjs@5/with-xstate-service'
```

### Extending components <span class="fd-deprecated" style="font-size: 1rem">DEPRECATED</span>

```js
import { withStateTransactions } from 'https://cdn.skypack.dev/ficusjs@5/with-state-transactions'
```

### Event bus

```js
import { createEventBus, getEventBus } from 'https://cdn.skypack.dev/ficusjs@5/event-bus'
```

### Application state

```js
import { createAppState, getAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@5/app-state'
```

### Stores <span class="fd-deprecated" style="font-size: 1rem">DEPRECATED</span>

```js
import { createStore, getStore } from 'https://cdn.skypack.dev/ficusjs@5/store'
```

### Internationalization (i18n)

```js
import { createI18n, getI18n } from 'https://cdn.skypack.dev/ficusjs@5/i18n'
```

### Finite state machines and statecharts

```js
import { assign, createMachine, createXStateService, getXStateService, interpret, wrapXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'
```
