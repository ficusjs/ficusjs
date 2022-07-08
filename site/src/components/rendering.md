---
layout: main.njk
title: FicusJS documentation - Components - Rendering
---
# Rendering

By default your `render` function must return a DOM element or HTML string for rendering. A built-in `renderer` function will convert strings to DOM elements automatically or render a given DOM element.

**Example using an HTML string**

```js
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

createCustomElement('test-comp', {
  props: {
    personName: {
      type: String
    }
  },
  render () {
    return `<p>Hello ${this.props.personName}!</p>`
  }
})
```

**Example using a DOM element**

```js
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

createCustomElement('test-comp', {
  props: {
    personName: {
      type: String
    }
  },
  render () {
    const element = document.createElement('p')
    element.textContent = `Hello ${this.props.personName}!`
    return element
  }
})
```

## Custom renderer

A custom `renderer` function can be provided when creating a new component and is recommended. This allows any [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) renderer to be plugged into a component.

There are a [number of renderers available](/renderers/) and can be added to suit your needs.

When the `render` function is called, the result is passed to the `renderer` function for updating the DOM. This is handled within the component lifecycle.

## Renderer function

The `renderer` function can be any function that creates HTML from the result of the `render` function.

The renderer function will be invoked with the following arguments in order:

| Argument | Description |
| --- | --- |
| `what` | The result returned from the `render` function |
| `where` | The DOM node to render into |

```js
renderer (what, where)
```

If your `renderer` function accepts a different argument order, simply pass a wrapper function to the component:

```js
createCustomElement('test-comp', {
  renderer (what, where) {
    // the uhtml renderer requires a different argument order
    renderer(where, what)
  }
})
```

## Rendering props

Props can be rendered in the template.

```js
{
  props: {
    personName: {
      type: String
    }
  },
  render () {
    return html`<p>Hello ${this.props.personName}!</p>`
  }
}
```

## Rendering local state

If you have defined local state use `this.state`:

```js
render () {
  return html`<p>${this.state.greeting}, there! My name is ${this.props.personName}</p>`
}
```

## Async rendering

Your `render` function is synchronous by default, but you can also defer rendering until some condition has been met by returning a `Promise`:

```js
render () {
  return new Promise(resolve => {
    // check something here
    resolve(html`<span>My component with some content</span>`)
  })
}
```
