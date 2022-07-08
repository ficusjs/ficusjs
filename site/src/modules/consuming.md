---
layout: main.njk
title: FicusJS documentation - Modules - Consuming a module
---
# Consuming a module

The following example shows how to consume a module from a shared library.

```js
// import the required FicusJS functions
import { createCustomElement, use } from 'https://cdn.skypack.dev/ficusjs@5'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import component library from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application
use(module, { renderer, html })

// in your template, use the component
createCustomElement('my-component', {
  renderer,
  render () {
    return html`<div>
      <shared-component></shared-component>
    </div>`
  }
})
```

### use function

The `use` function will import a module of components into your application ready to use.

```js
// import the use function
import { use } from 'https://cdn.skypack.dev/ficusjs@5'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import component module from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application
use(module, { renderer, html })
```

The following arguments **must** be provided to the `use` function:

| Property | Type | Description |
| --- | --- | --- |
| `module` | `object` | The imported `module` |
| `helpers` | `object` | A helpers object for passing to components. This **must** contain the `renderer` function as a named property |

The `helpers` object **must** contain the `renderer` function as named property. Additional helpers can be provided in the `helpers` object and will be passed to the module. For example; the `html` tagged template literal can be passed for module components to return HTML content.

```js
// pass the renderer and the html tagged template literal to the module for rendering
use(module, { renderer, html })
```
