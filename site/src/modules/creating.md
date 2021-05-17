---
layout: main.njk
title: FicusJS documentation - Modules - Creating a module
---
# Creating a module

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

### Async create method

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
