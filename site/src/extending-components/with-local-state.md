---
layout: main.njk
title: FicusJS documentation - Extending components - withLocalState function
---
# withLocalState function

The `withLocalState` function extends a component and makes working with local state easier.

When using the `withLocalState` function, the `state` property of your config object must set initial state.
This makes the component reactive to state changes. Every time a value of your `state` is updated, your component will re-render.

```js
// import the createCustomElement function
import { createCustomElement } from 'https://cdn.skypack.dev/ficusjs@5/custom-element'

// import the withLocalState function
import { withLocalState } from 'https://cdn.skypack.dev/ficusjs@5/with-local-state'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

createCustomElement(
  'with-state-example',
  withLocalState({
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
      return html`<button type="button" onclick=${this.increment} class="${this.state.color}">Count is&nbsp;<strong>${this.state.count}</strong></button>`
    }
  })
)
```

You can access state with `this.state` in your component `render` function.

```js
render () {
  return html`<div>Hello, I'm ${this.state.name}</div>`
}
```

## Initial state function

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

## Mutating state

Mutating state can be done using direct assignment or the `setState` method.

### Direct assignment

Mutating state values can be done using direct assignment.

```js
this.state.name = 'new name value'
```

### setState method

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
