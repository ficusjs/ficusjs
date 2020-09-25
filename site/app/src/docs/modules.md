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
import { createComponent, use } from 'https://unpkg.com/ficusjs?module'

// import component library from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application
use(module)

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
import { use } from 'https://unpkg.com/ficusjs?module'

// import component module from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application
use(module)
```

## Creating a module

A module is a set of functions for creating components, stores and/or events.
This ensures just the definitions will be shared without the overhead of bundling the FicusJS runtime.

Modules can be minified to optimise load.

A single Javascript file exports a named object `module` exposing a `create` method.
The shared module `create` method will be invoked by the `use` function in the context of the running application and is passed a single `object` argument.

It is the responsibility of the `create` method to use the `object` argument to create components, stores or events (anything required by the module).

### When using the all features build

When using the all features build `dist/index.js`, the `object` argument will contain the following properties.

| Property | Type | Description |
| --- | --- | --- |
| `createComponent` | `function` | The `createComponent` function |
| `createEventBus` | `function` | The `createEventBus` function |
| `createPersist` | `function` | The `createPersist` function |
| `createStore` | `function` | The `createStore` function |
| `getEventBus` | `function` | The `getEventBus` function |
| `getStore` | `function` | The `getStore` function |
| `use` | `function` | The `use` for loading modules internally |

The module will be created using the provided `object` argument.

```js
// Export a module object that is invoked by the `use` function
export const module = {
  create ({ createComponent, createEventBus, createPersist, createStore, getEventBus, getStore, use }) {
    // create components, stores or events here
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
    use(anotherModule)
  }
}
```

### When using the component build only

When using the component only `dist/component.js` without stores and events, the `object` argument will contain the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `createComponent` | `function` | The `createComponent` function |
| `use` | `function` | The `use` function for loading modules internally |

The module object will be created using the provided arguments.

```js
// Export a module object that is invoked by the `use` function
export const module = {
  create ({ createComponent, use }) {
    // create components here
  }
}
```
