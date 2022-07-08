---
layout: main.njk
title: FicusJS documentation - Application state - Web workers
---
# Web workers

[Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be an important and useful tool in keeping your app smooth and responsive by preventing any accidentally long-running code from blocking the browser from rendering. Web Workers are a simple means for apps to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface.

A key architecture change you can make in your app is to manage application state in a worker and keep rendering updates to a minimum.

By moving your application state to a worker, you move complex business logic and data loading/processing there too.

To communicate with the user interface, data is sent between workers and the main UI thread via a system of messages — both sides send their messages using the `postMessage()` method, and respond to messages via the `onmessage` event handler.

## Creating a store

The `@ficusjs/state` package provides a script named `worker-app-state.iife.js` specifically for creating stores in a web worker.

It is available at [https://cdn.skypack.dev/@ficusjs/state@3/dist/worker-app-state.iife.js](https://cdn.skypack.dev/@ficusjs/state@3/dist/worker-app-state.iife.js)

Create a worker script `worker.js` for managing your application state.

```js
// import the app state creator function
importScripts('https://cdn.skypack.dev/@ficusjs/state@3/dist/worker-app-state.iife.js')

// create the store
const store = globalThis.ficusjs.createAppState({
  initialState: {
    count: 0
  },
  increment (payload) {
    this.setState(state => ({ count: payload }))
  }
})

// this function communicates with the UI thread using postMessage
function postState () {
  globalThis.postMessage(Object.assign({}, store.state))
}

// subscribe to store changes
store.subscribe(postState)

// listen for messages from the UI thread so actions can be triggered
globalThis.onmessage = function (e) {
  const { actionName, payload } = e.data
  store[actionName](payload)
}

// post the initial state to the UI thread
postState()
```

## Using the worker

Now that you have a `worker.js`, the next step is to attach it to components in order to read state and dispatch actions.

The `withWorkerStore` function extends a component and hooks up the worker store to your components, providing local state and a `dispatch` method for invoking actions.

Firstly, you'll need to export the worker for wiring up to components. This is important if you plan on sharing a single worker with multiple components.

**worker-store.js**

```js
export const worker = new Worker('./worker.js')
```

Next, create one or more components using the `withWorkerStore` function.

**component.js**

```js
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'
import { createCustomElement, withWorkerStore } from 'https://cdn.skypack.dev/ficusjs@5'

// import the worker
import { worker } from './worker-store.js'

createCustomElement('example-component',
  withWorkerStore(worker, {
    renderer,
    increment () {
      this.store.dispatch('increment', this.state.count + 1)
    },
    render () {
      return html`<button type="button" onclick=${this.increment}>Increment</button>`
    }
  })
)
```

## withWorkerStore function

The `withWorkerStore` function extends a component and makes working with stores in web workers easier.

The `withWorkerStore` function provides a `this.state` property within the component as well as a `this.store.dispatch()` method for invoking store actions.
It also makes the component reactive to store changes as well as handling automatic store subscriptions based on the component lifecycle hooks.
It will also refresh computed getters when store state changes.
