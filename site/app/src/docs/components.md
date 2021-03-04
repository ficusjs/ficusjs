---
layout: doc.hbs
title: FicusJS documentation - Components
---
# Components

FicusJS provides a function for creating fast, lightweight web components.

Components created with FicusJS are native [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
created in a functional and declarative way.

The `createComponent` function defines a new component with the provided tag plus declarative object and registers it in the browser as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
Component names require a dash to be used in them; they **cannot** be single words - this is mandatory according to the [custom element API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

## Example

Import the `createComponent` function together with a renderer function and `html` [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) into your Javascript file:

**my-component.js**

```js
// import the createComponent function
import { createComponent } from 'https://cdn.skypack.dev/ficusjs/component'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

createComponent('my-component', {
  renderer,
  props: {
    personName: {
      type: String,
      required: true
    }
  },
  state () {
    return {
      greeting: 'Hello'
    }
  },
  render () {
    return html`
      <p>
        ${this.state.greeting}, there! My name is ${this.props.personName}
      </p>
    `
  }
})
```

> Component names require a dash to be used in them; they cannot be single words.

To use the component, place the tag name as you would with regular HTML:

**index.html**

```html
<my-component person-name="Andy"></my-component>
```

## `createComponent` function

When using the `createComponent` function, you **must** pass two parameters:

1. tag name (for example `my-component`) - names require a dash to be used in them; they cannot be single words
2. an `object` that defines the properties of the component

The following properties can be used when creating components:

| Property | Required | Type | Description                                                                                                                                                                              |
| --- | --- | --- | --- |
| `renderer` | yes | `function` | A function that renders what is returned from the `render` function |                                                                                    |
| `render` | yes | `function` | A function that must return a response that can be passed to the `renderer` function |                                                                                    |
| `root` |  | `string` | Sets the root definition for the component |
| `props` |  | `object` | Describes one or more property definitions - these are attributes and instance properties that can be set when using the component |
| `computed` |  | `object` | Contains one or more getters (functions that act like properties) that are useful when rendering |
| `state` |  | `function` | Function that returns an `object` containing initial state. State is internal variables in the component |
| `*` |  | `function` | Functions that are useful in performing actions and logic |
| `created` |  | `function` | Invoked when the component is created and before it is connected to the DOM |
| `mounted` |  | `function` | Invoked when the component is first connected to the DOM. This may trigger before the components contents have been fully rendered |
| `updated` |  | `function` | Invoked when the component is moved or reconnected to the DOM. This may trigger before the components contents have been fully rendered |
| `removed` |  | `function` | Invoked each time the component is disconnected from the DOM |

## Root definition

You can use a standard root, a closed Shadow DOM root or an open Shadow DOM root by specifying a `root` in your config object:

| Key             | Value                    |
| --------------- | ------------------------ |
| `standard`      | A normal HTML root       |
| `shadow`        | An open Shadow DOM root  |
| `shadow:closed` | A closed Shadow DOM root |

## Props

You pass props as HTML attributes on the component and then get access to them inside your component's JavaScript with `this.props`. Props must be defined using camel-case but set as kebab-case in HTML.
Props will be observed by default which means they react to changes.

```html
<example-component class-name="a-class" required="true"></example-component>
```

You'll need to define your prop types in the component definition, like so:

```js
props: {
  className: {
    type: String,
    default: 'btn',
    required: true, // is this required?
    observed: false // turn off observing changes to this prop
  },
  required: {
    type: Boolean,
    default: false
  }
}
```

The following properties can be used to define props:

| Property   | Required | Value                                                                          |
| ---------- | -------- | ------------------------------------------------------------------------------ |
| `type`     | yes      | This must be one of `String`, `Number`, `Boolean` or `Object`                  |
| `default`  |          | Set a default value if one is not set                                          |
| `required` |          | Is this prop required when the component is used? If so, set to `true`         |
| `observed` |          | Set to `false` to turn off observing changes to this prop                     |

### Instance properties

Prop values can be set on instances of components. Each prop you define for a component becomes an instance property and can be set using Javascript.

```js
const exampleComponentInstance = document.querySelector('example-component')
exampleComponentInstance.className = 'another-value'
```

## Computed getters

Computed getters are functions that are used like properties in your component. They are defined with the `computed` property.

They are memoized functions which means the result of the getter is cached for subsequent executions. This is useful when creating projections from large sets of data.

Setting local state will automatically reset the computed cache.

You can access getters with `this` in your component `render` function.

```js
computed: {
  myGetter () {
    const name = 'Andy'
    return `Hello, I'm ${name}`
  }
},
render () {
  return html`<div>${this.get.myGetter}</div>`
}
```

## State

You can have reactive internal state by using the `state` property of your config object to set initial state. Every time a value of your `state` is updated, your component will re-render.

You can access state with `this.state` in your component `render` function.

```js
render () {
  return html`<div>Hello, I'm ${this.state.name}</div>`
}
```

### Initial `state` function

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

### Updating state

Updating state can be done using assignment or the `setState` method.

#### State assignment

Updating state values can be done using direct assignment.

```js
this.state.name = 'new name value'
```

#### `setState` method

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
import { createComponent } from 'https://cdn.skypack.dev/ficusjs/component'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

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

## Methods

It is common to be able to call a method and perform an action. To achieve this, you can define methods when creating your component.
Methods are functions that can be defined anywhere in the component definition object.

```js
createComponent('example-component', {
  renderer,
  props: {
    name: {
      type: String
    },
    family: {
      type: String
    },
    title: {
      type: String
    }
  },
  formatName (name, family, title) {
    return `${title} ${name} ${family}`
  },
  render () {
    return html`
             <div>
               ${this.formatName(
                 this.props.name,
                 this.props.family,
                 this.props.title
               )}
             </div>
           `
  }
})
```

Methods are available anywhere in your component - inside getters or rendering. They are bound to the component instance.

## Lifecycle hooks

There are several lifecycle hooks that you can provide when defining a component.

The automatic handling of subscription/unsubscription happens when stores and event bus exists on a component.
This prevents events or callbacks from triggering when a component disconnects and reconnects to the DOM.

### `created` function

The `created` hook will be invoked when the component has been created and before it is connected to the DOM.

```js
{
  created () {
    // do something when the component is created!
  }
}
```

### `mounted` function

The `mounted` hook will be invoked when the component has mounted in the DOM.

This may trigger before the components contents have been fully rendered.

This is triggered by the custom element [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lifecycle callback.

```js
{
  mounted () {
    // do something when the component is mounted!
  }
}
```

### `updated` function

The `updated` hook will be invoked each time the component state changes.

It is also invoked when the component has been moved or is reconnected to the DOM.
This is triggered by the custom element [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lifecycle callback.

The component's DOM will have updated when this hook runs and may trigger before the components contents have been fully rendered.

```js
{
  updated () {
    // do something when the component is updated!
  }
}
```

### `removed` function

The `removed` hook will be invoked each time the component has been disconnected from the document's DOM.
This is triggered by the custom element [`disconnectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lifecycle callback.

```js
{
  removed () {
    // do something when the component is removed!
  }
}
```

## Rendering

A `renderer` function **must** be provided when creating a new component. This allows any renderer to be plugged into a component.

There are a number of renderers available and can be added to suit your needs. The following renderers have been tested with FicusJS:

- [lit-html](https://www.npmjs.com/package/lit-html)
- [uhtml](https://www.npmjs.com/package/uhtml)
- [htm and Preact](https://www.npmjs.com/package/htm)
- `document.createElement`

When the `render` function has been called, the result will be passed to the `renderer` function for updating the DOM.
This is handled within the component lifecycle.

### Renderer function

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
createComponent('test-comp', {
  renderer (what, where) {
    // the uhtml renderer requires a different argument order
    renderer(where, what)
  }
}
```

### Minified ES module renderers

The [`ficusjs-renderers`](https://www.npmjs.com/package/ficusjs-renderers) package provides a tested set of renderers as ES modules to make working with them much easier.

These renderers are available as minified ES module bundles:

- [lit-html](https://www.npmjs.com/package/lit-html)
- [uhtml](https://www.npmjs.com/package/uhtml)
- [htm and Preact](https://www.npmjs.com/package/htm)
- `document.createElement`

For more details, visit [https://github.com/ficusjs/ficusjs-renderers](https://github.com/ficusjs/ficusjs-renderers)

### Rendering props

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

### Rendering local state

If you have defined local state use `this.state`:

```js
render () {
  return html`<p>${this.state.greeting}, there! My name is ${this.props.personName}</p>`
}
```

### Async rendering

Your `render` function is synchronous by default, but you can also defer rendering until some condition has been met by returning a `Promise`:

```js
render () {
  return new Promise(resolve => {
    // check something here
    resolve(html`<span>My component with some content</span>`)
  })
}
```

### Emitting events

To emit an event on the component, you can call the `emit` method anywhere in your component:

```js
// a component that emits an event (other properties omitted for brevity)
{
  emitChangeEvent () {
    this.emit('change', { some: 'data' })
  }
}

// a component that listens for an event
{
  handleEvent (e) {
   console.log(e.detail) // prints { some: 'data' }
  },
  render () {
    return html`<example-component onchange=${this.methods.handleEvent}></example-component>`
  }
}
```

The following arguments can be used to emit an event:

| Property | Required | Description                                                                          |
| --- | --- | --- |
| `eventName` | yes | This must be a string with the name of the event |
| `data` | | Optional data to pass along with the event. Any data passed is available on the `Event.detail` property of the event |

### Slots

A slot is a placeholder inside your component for child elements.
Slots will be created automatically depending on whether child elements exist. Child elements that do not specify a named slot are available using the default slot `${this.slots.default}`.

Let's say you have a `<my-page-header>` component:

```js
html`
<div class="page-header__content">
  <div class="page-header__left">
    <span class="${this.props.icon}"></span>
    <h1 class="page-header__title">${this.props.title}</h1>
  </div>
  <div class="page-header__right">${this.slots.default}</div>
</div>
`
```

Buttons can be passed as child elements:

```html
<my-page-header title="Expenses" icon="budget">
  <button type="button" name="add">Add</button>
  <button type="button" name="save">Save</button>
</my-page-header>
```

This renders the buttons in the element `<div class="page-header__right">` inside the page header component.

#### Named slots

Named slots can also be created in your HTML templates. Let's modify the `<my-page-header>` component:

```js
html`
<div class="page-header__content">
  <div class="page-header__left">${this.slots.left}</div>
  <div class="page-header__right">${this.slots.right}</div>
</div>
`
```

```html
<my-page-header>
  <div slot="left">
    <span class="budget"></span>
    <h1>Expenses</h1>
  </div>
  <div slot="right">
    <button type="button" name="add">Add</button>
    <button type="button" name="save">Save</button>
  </div>
</my-page-header>
```

This renders the elements `<div slot="left">` and `<div slot="right">` into the elements `<div class="page-header__left">` and `<div class="page-header__right">` inside the page header component.
