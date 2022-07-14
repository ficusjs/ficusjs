---
layout: main.njk
title: FicusJS documentation - Components - Lifecycle hooks
---
# Lifecycle hooks

There are several lifecycle hooks that you can provide when defining a component.

The automatic handling of subscription/unsubscription happens when stores and event bus exists on a component. This prevents events or callbacks from triggering when a component disconnects and reconnects to the DOM.

### created function

The `created` hook will be invoked when the component has been created and before it is connected to the DOM.

```js
{
  created () {
    // do something when the component is created!
  }
}
```

### mounted function

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

### updated function

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

### removed function

The `removed` hook will be invoked each time the component has been disconnected from the document's DOM.
This is triggered by the custom element [`disconnectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lifecycle callback.

```js
{
  removed () {
    // do something when the component is removed!
  }
}
```

### propsDidUpdate function

The `propsDidUpdate` hook will be invoked each time the component props are updated.
This is triggered by the custom element [`attributeChangedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lifecycle callback.

```js
{
  propsDidUpdate () {
    // do something when the component props are updated!
  }
}
```
