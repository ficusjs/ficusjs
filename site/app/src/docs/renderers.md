---
layout: doc.hbs
title: FicusJS documentation - Renderers
---
# FicusJS renderers

Minified ES module renderers for [FicusJS components](/docs/components/).

The [FicusJS renderers](https://github.com/ficusjs/ficusjs-renderers) package provides a tested set of renderers as ES modules to make working with them much easier.

## Summary

A `renderer` function must be provided when creating a new [FicusJS component](/docs/components/).
This allows any tagged template literal renderer to be plugged into a component.

The following renderers are available as minified bundles.

- [uhtml](https://www.npmjs.com/package/uhtml) (default)
- [lit-html](https://www.npmjs.com/package/lit-html)
- [htm and Preact](https://www.npmjs.com/package/htm)
- `document.createElement`

## `uhtml`

The [uhtml](https://www.npmjs.com/package/uhtml) renderer is available in this package and is the default renderer.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/uhtml'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## `lit-html`

The [lit-html](https://www.npmjs.com/package/lit-html) renderer is available in this package.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## `htm` and `Preact`

The [htm and Preact](https://www.npmjs.com/package/htm) renderer is available in this package.

```js
// import the renderer function and the html tagged template literal
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/htm'

createComponent('test-comp', {
  renderer,
  render () {
    return html`
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```

## `document.createElement`

The [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) renderer is available in this package.
In your component, return a template literal string containing HTML.

This is only the `renderer` function and **does not use** a tagged template literal for rendering.

```js
import { renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/create-element'

createComponent('test-comp', {
  renderer,
  render () {
    return `
      <div>Some HTML content with ${someVariable}</div>
    `
  }
})
```
