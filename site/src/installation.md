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
  import { createComponent } from 'https://cdn.skypack.dev/ficusjs@3'
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
  createComponent,

  // extending components
  withStateTransactions,
  withStore,
  withEventBus,
  withStyles,
  withLazyRender,

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

  // modules
  use
} from 'https://cdn.skypack.dev/ficusjs@3'
```

### Components

```js
import { createComponent, use } from 'https://cdn.skypack.dev/ficusjs@3/component'
```

### Extending components

```js
import { withStateTransactions } from 'https://cdn.skypack.dev/ficusjs@3/with-state-transactions'
import { withEventBus } from 'https://cdn.skypack.dev/ficusjs@3/with-event-bus'
import { withStore } from 'https://cdn.skypack.dev/ficusjs@3/with-store'
import { withStyles } from 'https://cdn.skypack.dev/ficusjs@3/with-styles'
import { withLazyRender } from 'https://cdn.skypack.dev/ficusjs@3/with-lazy-render'
```

### Event bus

```js
import { createEventBus, getEventBus } from 'https://cdn.skypack.dev/ficusjs@3/event-bus'
```

### Application state

```js
import { createAppState, getAppState, createPersist } from 'https://cdn.skypack.dev/ficusjs@3/app-state'
```

### Stores - <span class="fd-deprecated" style="font-size: 1rem">DEPRECATED</span>

```js
import { createStore, getStore } from 'https://cdn.skypack.dev/ficusjs@3/store'
```
