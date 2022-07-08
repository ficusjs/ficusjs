---
layout: main.njk
title: FicusJS documentation - Components - createComponent function
---
# createComponent function

The `createComponent` function defines a new component containing [internal reactive state](/extending-components/with-local-state/) with the provided tag plus declarative object and registers it in the browser as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Internally, the `createComponent` function uses the `createCustomElement` function and extends it with the `withLocalState` function.

Component names require a dash to be used in them; they **cannot** be single words - this is mandatory according to the [custom element API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## Arguments

When using the `createComponent` function, you **must** pass two arguments:

1. tag name (for example `my-component`) - names require a dash to be used in them; they cannot be single words
2. an `object` that defines the properties of the component

The following properties are used when creating components:

| Property | Required | Type | Description |
| --- | --- | --- | --- |
| `renderer` | yes | `function` | A function that renders what is returned from the `render` function |                                                                                    |
| `render` | yes | `function` | A function that must return a response that can be passed to the `renderer` function for creating HTML |                                                                                    |
| `root` |  | `string` | Sets the root definition for the component |
| `props` |  | `object` | Describes one or more property definitions - these are attributes and instance properties that can be set when using the component |
| `computed` |  | `object` | Contains one or more getters (functions that act like properties) that are useful when rendering |
| `state` |  | `function` | Function that returns an `object` containing initial state. State is internal variables in the component |
| `*` |  | `function` | Functions that are useful in performing actions and logic |
| `created` |  | `function` | Invoked when the component is created and before it is connected to the DOM |
| `mounted` |  | `function` | Invoked when the component is first connected to the DOM. This may trigger before the components contents have been fully rendered |
| `updated` |  | `function` | Invoked when the component is moved or reconnected to the DOM. This may trigger before the components contents have been fully rendered |
| `removed` |  | `function` | Invoked each time the component is disconnected from the DOM |

## State

The `createComponent` function provides [reactive internal state using a Proxy](/extending-components/with-local-state/).

Provide the `state` property of your config object to set initial state. Every time a value of your `state` is updated, your component will re-render.

You can access state with `this.state` in your component `render` function.

```js
render () {
  return html`<div>Hello, I'm ${this.state.name}</div>`
}
```

### Initial state function

The component's `state` option **must be a function**, so that each instance can maintain an independent copy of the returned state object.
This also allows you to use prop values as initial state.

If `state` is not a function, changing state in one instance would affect the state of all other instances.

```js
{
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  state () {
    return {
      count: this.props.count
    }
  }
}
```

### Mutating state

Mutating state can be done using direct assignment or the `setState` method.

#### Direct assignment

Mutating state values can be done using direct assignment.

```js
this.state.name = 'new name value'
```

#### setState method

The `setState` method can be used to set one or more state values in a single transaction. This will only trigger a single render update. An optional callback can be provided which is invoked after rendering has occurred.

The `setState` function takes two arguments:

1. State setter function (receives the current state as an argument)
2. An optional callback which is invoked after rendering

```js
this.setState(
  (state) => {
    return {
      // return new state property values
    }
  },
  () => {
    // do something after rendering
  }
)
```

Example component using `setState` method

```js
// import the createComponent function
import { createComponent } from 'https://cdn.skypack.dev/ficusjs@5/component'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

createComponent('set-state-example', {
  renderer,
  state () {
    return {
      count: 0,
      isEven: false,
      color: 'secondary'
    }
  },
  increment () {
    this.setState(
      (state) => {
        const count = state.count + 1
        const isEven = count % 2 === 0
        return {
          count,
          isEven,
          color: isEven ? 'success' : 'info'
        }
      },
      () => console.log('Component did render!')
    )
  },
  render () {
    return html`<button type="button" @click=${this.increment} class="${this.state.color}">Count is&nbsp;<strong>${this.state.count}</strong></button>`
  }
})
```
