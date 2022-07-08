---
layout: main.njk
title: FicusJS documentation - Extending components - withBreakpointRender function
---
# withBreakpointRender function

The `withBreakpointRender` function extends a component with conditional rendering based on viewport breakpoints.

It uses `window.matchMedia` to set a render function based on breakpoints. By testing the viewport size, it can conditionally render a specific set of HTML.

The `withBreakpointRender` function will test the viewport size and set a specific render function when the component is mounted.

Optionally, breakpoints can be reactive which means the component will re-render automatically based on viewport resizing.

```js
// import it with all other features
import { createCustomElement, withBreakpointRender } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withBreakpointRender } from 'https://cdn.skypack.dev/ficusjs@5/with-breakpoint-render'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// define a breakpoint configuration
const breakpointConfig = {
  reactive: false,
  breakpoints: {
    992: { method: 'renderTablet' },
    768: { method: 'renderMobile' },
    1200: { method: 'renderDesktop' }
  }
}

// create the component
createCustomElement(
  'breakpoint-component',
  withBreakpointRender(breakpointConfig, {
    renderer,
    renderTablet () {
      return html`<span>Breakpoint render tablet</span>`
    },
    renderMobile () {
      return html`<span>Breakpoint render mobile</span>`
    },
    renderDesktop () {
      return html`<span>Breakpoint render desktop</span>`
    }
  })
)
```

## Breakpoint config

The `withBreakpointRender` requires a breakpoint config. This sets the viewport widths along with the render functions to use for that breakpoint.

```js
const breakpointConfig = {
  reactive: false,
  breakpoints: {
    992: { method: 'renderTablet' },
    768: { method: 'renderMobile' },
    1200: { method: 'renderDesktop' }
  }
}
```

The `reactive` property will make the component automatically re-render when the viewport width changes.

Each `breakpoint` has a width key and an `object` containing a `method` to use at that viewport breakpoint.

The above config results in the following media query list.

```css
only screen and (max-width: 768px)
only screen and (min-width: 769px) and (max-width: 992px)
only screen and (min-width: 1201px)
```
