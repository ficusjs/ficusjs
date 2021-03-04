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

- All (component, event bus and store) `dist/index.js`
- [Components](docs/components) `dist/component.js`
  - [With store](docs/composition) `dist/with-store.js`
  - [With event bus](docs/composition) `dist/with-event-bus.js`
  - [With state transactions](docs/composition) `dist/with-state-transactions.js`
  - [With styles](docs/composition) `dist/with-styles.js`
- [Event bus](docs/event-bus) `dist/event.js`
- [Stores](docs/stores) `dist/store.js`
