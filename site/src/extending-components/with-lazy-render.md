---
layout: main.njk
title: FicusJS documentation - Extending components - withLazyRender function
---
# withLazyRender function

The `withLazyRender` function extends a component with conditional/lazy rendering.

It creates an `IntersectionObserver` instance internally to track when the component is visible. By knowing when the component is visible, it can conditionally/lazily render the component for optimum performance.

The `withLazyRender` function provides an `elementVisible` property for checking the visibility of the component.

When the component becomes visible, it triggers a render which then calls the component lifecycle methods.

```js
// import it with all other features
import { createCustomElement, withLazyRender } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withLazyRender } from 'https://cdn.skypack.dev/ficusjs@5/with-lazy-render'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// as there is no initial content rendered, the `mounted` method
// is triggered when the component is visible
createCustomElement(
  'lazy-component',
  withLazyRender({
    renderer,
    render () {
      return this.elementVisible
        ? html`<button type="button">A styled button</button>`
        : ''
    },
    mounted () {
      // when elementVisible changes this will be called so we can load extra stuff we need
    }
  })
)

// as there is initial rendered content, the `updated` method
// is triggered when the component is visible
createCustomElement(
  'lazy-component-with-placeholder',
  withLazyRender({
    renderer,
    render () {
      return this.elementVisible
        ? html`<button type="button">A styled button</button>`
        : '<span class="placeholder"></span>'
    },
    updated () {
      // when elementVisible changes this will be called so we can load extra stuff we need
    }
  })
)
```
