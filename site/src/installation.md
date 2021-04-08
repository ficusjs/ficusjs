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
  withStateTransactions,
  withStore,
  withEventBus,
  withStyles,

  // event bus
  createEventBus,
  getEventBus,

  // stores
  createPersist,
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

### Event bus

```js
import { createEventBus, getEventBus } from 'https://cdn.skypack.dev/ficusjs@3/event'
```

### Stores

```js
import { createPersist, createStore, getStore } from 'https://cdn.skypack.dev/ficusjs@3/store'
```
