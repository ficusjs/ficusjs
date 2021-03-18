---
layout: doc.hbs
title: FicusJS documentation - Extending components
---
# Extending components

FicusJS provides a set of functions for extending components.

You can also write your own functions.

## `withStore` function

The `withStore` function extends a component and makes working with stores easier in component rendering, computed getters and methods.

```js
// import it with all other features
import { createComponent, withStore } from 'https://cdn.skypack.dev/ficusjs'

// alternatively, import the function directly
// import { withStore } from 'https://cdn.skypack.dev/ficusjs/with-store'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

// import a single store or object of stores from a local file
import { store } from './store.js'

createComponent(
  'my-component',
  withStore(store, {
    renderer,
    props: {
      personName: {
        type: String,
        required: true
      }
    },
    render () {
      return html`
        <p>
          ${this.store.state.greeting}, there! My name is ${this.props.personName}
        </p>
      `
    }
  })
)
```

The `withStore` function provides a `this.store` property within the component.
It also makes the component reactive to store changes as well as handling automatic store subscriptions based on the component lifecycle hooks.
It will also refresh computed getters when store state changes.

### `setStore` method

The `setStore` method can be called when a store instance needs to be set after the component has initialised.
The method accepts a `store` argument which can be a single store instance or object of store instances.

```js
{
  someMethod () {
    const store = getStoreSomehow()
    this.setStore(store)
  }
}
```

## `withEventBus` function

The `withEventBus` function extends a component and makes working with an event bus easier in component methods.

```js
// import it with all other features
import { createComponent, withEventBus } from 'https://cdn.skypack.dev/ficusjs'

// alternatively, import the function directly
// import { withEventBus } from 'https://cdn.skypack.dev/ficusjs/with-event-bus'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

// import an event bus from a local file
import { eventBus } from './event-bus.js'

createComponent(
  'my-component',
  withEventBus(eventBus, {
    renderer,
    buttonClicked () {
      this.eventBus.publish('increment', undefined)
    },
    render () {
      return html`<button type="button" @click=${this.buttonClicked}>Increment</button>`
    }
  })
)
```

The `withEventBus` function provides a `this.eventBus` property within the component.
It handles automatic event bus subscription based on the component lifecycle hooks.

### `setEventBus` method

The `setEventBus` method can be called when an instance needs to be set after the component has initialised.
The method accepts an `eventBus` argument which is a single event instance.

```js
{
  someMethod () {
    const eventBus = getEventBus()
    this.setEventBus(eventBus)
  }
}
```

## `withStateTransactions` function

The `withStateTransactions` function extends a component with transactions so multiple state changes can occur without triggering a re-render.

```js
// import it with all other features
import { createComponent, withStateTransactions } from 'https://cdn.skypack.dev/ficusjs'

// alternatively, import the function directly
// import { withStateTransactions } from 'https://cdn.skypack.dev/ficusjs/with-state-transactions'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

createComponent(
  'my-like-component',
  withStateTransactions({
    renderer,
    state () {
      return { count: 0, message: null, status: 'unliked' }
    },
    like () {
      // start a transaction
      this.beginTransaction()

      // change some state
      this.state.count = this.state.count + 1
      this.state.message = 'Thanks for liking this!'

      // save the like to the server
      window.fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: this.state.count, updatedBy: 'Jane Doe' })
      })
      .then(res => res.json())
      .then(data => {
        this.state.status = 'liked'
        this.endTransaction()
      })
      .catch(err => {
        this.rollbackTransaction()
        this.state.status = 'error'
      })
    },
    render () {
      if (this.state.status === 'liked') {
         return html`<p>${this.state.message}</p>`
      }
      return html`<button type="button" @click=${this.like}>Like</button>`
    }
  })
)
```

A transaction is a sequence of operations performed on state as a single logical unit of work.
The transaction can be either all committed (applied to state) or all rolled back (undone from state).

### `beginTransaction` method

The `beginTransaction` method starts a transaction.

### `endTransaction` method

The `endTransaction` method ends the transaction and triggers a component render.

### `rollbackTransaction` method

The `rollbackTransaction` method rolls back the state changes carried out within the transaction.
This is used if an error occurs, and the state needs to be reset.

## `withStyles` function

The `withStyles` function extends a component and makes working with component styles more efficient
by providing a `styles` function which is invoked injecting CSS into the `<head>` once for all component instances.

```js
// import it with all other features
import { createComponent, withStyles } from 'https://cdn.skypack.dev/ficusjs'

// alternatively, import the function directly
// import { withStyles } from 'https://cdn.skypack.dev/ficusjs/with-styles'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'

createComponent(
  'my-component',
  withStyles({
    renderer,
    styles () {
      return `
        my-component button {
          background-color: yellow;
          color: black;
        }
      `
    },
    render () {
      return html`<button type="button">A styled button</button>`
    }
  })
)
```

The `withStyles` function automatically handles loading styles based on the component lifecycle hooks.

### `styles` function

The `styles` function must be provided when using the `withStyles` function. This function is invoked and injects CSS into the `<head>`
once for all component instances.

The `styles` function can return a `String` or Array of strings containing either styles or URL to an external stylesheet.

#### String styles

Return a string containing styles.

```js
{
  styles () {
    return `
      my-component button {
        background-color: yellow;
        color: black;
      }
    `
  }
}
```

#### External stylesheet

Return a URL to a stylesheet - must be a fully qualified URL, not a relative path.

```js
{
  styles () {
    return 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
  }
}
```

#### Mixed

Return an Array containing both URL and string styles.

```js
{
  styles () {
    return [
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
      `
        my-component button {
          background-color: yellow;
          color: black;
        }
      `
    ]
  }
}
```
