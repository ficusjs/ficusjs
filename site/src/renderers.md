---
layout: main.njk
title: FicusJS documentation - Renderers
---
# FicusJS renderers

Minified ES module renderers for [FicusJS components](/components/).

The [FicusJS renderers](https://www.npmjs.com/package/@ficusjs/renderers) package provides a tested set of renderers as ES modules to make working with them much easier.

A `renderer` function **must** be provided when creating a new [FicusJS component](/components/).
This allows any tagged template literal renderer to be plugged into a component.

The following renderers are available as minified bundles.

- [uhtml](https://www.npmjs.com/package/uhtml) (default) - 3.02 KB gzipped
- [lit-html](https://www.npmjs.com/package/lit-html) - 3.61 KB gzipped
- [htm](https://www.npmjs.com/package/htm) (JSX-like syntax - no transpiler necessary) - 923 B gzipped
- [htm](https://www.npmjs.com/package/htm) with [Preact](https://www.npmjs.com/package/preact) (JSX-like syntax - no transpiler necessary) - 4.3 KB gzipped
- `document.createElement` - 141 B gzipped

## uhtml

The [uhtml](https://www.npmjs.com/package/uhtml) renderer is available in this package and is the default renderer.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## lit-html

The [lit-html](https://www.npmjs.com/package/lit-html) renderer is available in this package.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/lit-html'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```


## htm

The [htm](https://www.npmjs.com/package/htm) renderer is a JSX-like renderer (no transpiler necessary) available in this package.

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/htm'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## htm with Preact

The [htm](https://www.npmjs.com/package/htm) with [Preact](https://www.npmjs.com/package/preact) renderer is available in this package.

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/htm-preact'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## document.createElement

The [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) renderer is available in this package.
In your component, return a template literal string containing HTML.

This is only the `renderer` function and **does not use** a tagged template literal for rendering.

```js
import { renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/create-element'

createComponent('test-comp', {
  renderer,
  render () {
    return `
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
