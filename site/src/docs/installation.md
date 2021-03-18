---
layout: doc.hbs
title: FicusJS documentation - Installation
---
# Installation

FicusJS can be installed in a number of ways.

## CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createComponent } from 'https://cdn.skypack.dev/ficusjs'
</script>
```

FicusJS is available on [Skypack](https://www.skypack.dev/view/ficusjs).

## NPM

FicusJS works nicely with build tools such as Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```sh
npm install ficusjs
```

## Available builds

FicusJS only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

The following builds are available.

### All features ([component](docs/components), [event bus](docs/event-bus), [store](docs/stores) and [component composition functions](docs/composition))

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
} from 'https://cdn.skypack.dev/ficusjs'
```

### [Components](docs/components)

```js
import { createComponent, use } from 'https://cdn.skypack.dev/ficusjs/component'
```

### [Event bus](docs/event-bus)

```js
import { createEventBus, getEventBus } from 'https://cdn.skypack.dev/ficusjs/event'
```

### [Stores](docs/stores)

```js
import { createPersist, createStore, getStore } from 'https://cdn.skypack.dev/ficusjs/store'
```
