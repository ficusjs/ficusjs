---
layout: doc.hbs
title: FicusJS documentation - Modules
---
# Modules

Components by nature should be re-used.
This is easy when the component will only be used within a single application.
How can you write a component once and use it in multiple applications?

A set of components can be shared as a module using a package manager or publishing it to a URL.

By packaging your components into a module, it can be imported into other applications and re-used multiple times.

## Consuming a module

The following example shows how to consume a module from a shared library.

```js
// import the required FicusJS functions
import { createComponent, use } from 'https://cdn.skypack.dev/ficusjs'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

// import component library from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application
use(module, { renderer, html })

// in your template, use the component
createComponent('my-component', {
  renderer,
  render () {
    return html`<div>
      <shared-component></shared-component>
    </div>`
  }
})
```

### `use` function

The `use` function will import a module of components into your application ready to use.

```js
// import the use function
import { use } from 'https://cdn.skypack.dev/ficusjs'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

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

## Creating a module

A module is a set of functions for creating components, stores and/or events.
This ensures just the definitions will be shared without the overhead of bundling the FicusJS runtime.

> Modules should be minified to optimise load.

A single Javascript file exports a named object `module` exposing a `create` method.
The shared module `create` method will be invoked by the `use` function in the context of the running application and is passed a single `object` argument.

It is the responsibility of the `create` method to use the `object` argument to create components, stores or events (anything required by the module).

```js
// Export a module object that is invoked by the `use` function
export const module = {
  create (helpers) {
    // create stuff here
  }
}
```

### Async `create` method

You can return a `Promise` from the `create` method that contains async operations.

```js
// use async/await
export const module = {
  async create (helpers) {
    await asyncFunction()
  }
}

// return a Promise
export const module = {
  create (helpers) {
    return asyncFunction()
  }
}
```

If returning a `Promise`, the calling module must handle the response before continuing execution.

### When using the all features build

When using the all features build `dist/index.mjs`, the helpers `object` will contain the following properties.

| Property | Type | Description |
| --- | --- | --- |
| `createComponent` | `function` | The `createComponent` function |
| `renderer` | `function` | The `renderer` function for component rendering |
| `createEventBus` | `function` | The `createEventBus` function |
| `createPersist` | `function` | The `createPersist` function |
| `createStore` | `function` | The `createStore` function |
| `getEventBus` | `function` | The `getEventBus` function |
| `getStore` | `function` | The `getStore` function |
| `use` | `function` | The `use` for loading modules internally |

Additional arguments provided in the `helpers` object will be passed to the module. For example; the `html` tagged template literal can be passed for module components to return HTML content.

```js
// Export a module object that is invoked by the `use` function
export const module = {
  create (helpers) {
    // create stuff here
  }
}
```

The following example creates a component, a store and imports another module for use internally.

```js
import { module as anotherModule } from './path/to/another-module.esm.js'

function createSharedComponent (renderer, html, getStore) {
  return {
    renderer,
    store: getStore('test.store'),
    render () {
      if (this.store.state.hideComponent) {
        return ''
      }
      return html`<span>Shared component</span>`
    }
  }
}

// Export a module object that is invoked by the `use` function
export const module = {
  create ({ createComponent, renderer, html, createStore, getStore, use }) {
    // create stores
    createStore('test.store', { /* store options */ })

    // create components
    createComponent('shared-component', createSharedComponent(renderer, html, getStore))

    // import and use another module
    use(anotherModule, { renderer, html })
  }
}
```

### When using the component build only

When using the component only `dist/component.mjs` without stores and events, the helpers `object` argument will contain the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `createComponent` | `function` | The `createComponent` function |
| `renderer` | `function` | The `renderer` function for component rendering |
| `use` | `function` | The `use` function for loading modules internally |

Additional arguments provided in the `helpers` object will be passed to the module. For example; the `html` tagged template literal can be passed for module components to return HTML content.

```js
// Export a module object that is invoked by the `use` function
export const module = {
  create (helpers) {
    // create components here
  }
}
```
