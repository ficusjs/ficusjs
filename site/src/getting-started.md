---
layout: main.njk
title: FicusJS documentation - Getting started
---
# Getting started

The easiest way to try out FicusJS is using a hello world example.

Create an `index.html` file and copy the following between the `<body>` tags.

```html
<hello-world></hello-world>

<script type="module">
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { createComponent } from 'https://cdn.skypack.dev/ficusjs@3/component'

createComponent('hello-world', {
  renderer,
  handleClick (e) {
    window.alert('Hello to you!')
  },
  render () {
    return html`<div>
<p>Test component</p>
<button type="button" @click="${this.handleClick}">Click me!</button>
</div>`
  }
})
</script>
```

Alternatively, fork this Codepen to see it in action - [https://codepen.io/ducksoupdev/pen/GRZPqJO](https://codepen.io/ducksoupdev/pen/GRZPqJO)

The hello world example creates a new [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
using the `createComponent` function and registers it to the `hello-world` tag. It uses the [uhtml](https://www.npmjs.com/package/uhtml) renderer ([other renderers are available](/renderers/)) for creating HTML from [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Once registered, the tag can be used multiple times in HTML and instances can be programmatically obtained using [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
or [`element.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
