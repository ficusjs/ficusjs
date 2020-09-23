# Event bus

FicusJS provides a function for creating a fast, lightweight publish/subscribe event bus.

For communication between components without triggering a re-render, the event bus object provides a topic-based publish/subscribe API.

**The event bus will be created as a singleton - this ensures only one instance exists.**

## Example

Import the `createEventBus` function into your Javascript main file:

**main.js**

```js
import { createEventBus } from 'https://unpkg.com/ficusjs?module'
```

Create a new event bus instance:

**main.js**

```js
const eventBus = createEventBus()
```

## `createEventBus` function

Once you have created your events instance using `createEventBus`, simply pass it to each component:

```js
// A new component
createComponent('my-component', {
  eventBus,
  ...
})
```

## `getEventBus` function

The `getEventBus` function is a quick way to retrieve the events instance.
If the event bus has not yet been created, `getEventBus` will create a new instance automatically.

```js
// import the function
import { getEventBus } from 'https://unpkg.com/ficusjs?module'

// use it within a component
createComponent('my-component', {
  eventBus: getEventBus(),
  ...
})
```

## Subscribe

To be notified when a particular event will be published, use the `subscribe` method to register a callback function.
This method returns a function which can be invoked later for unsubscription.

```js
const unsubscribe = eventBus.subscribe('myTopic', data => {
  // handle the event with the data passed
})

// Unsubscribe later
unsubscribe()
```

## Publish

When you want to notify subscribers, you need to `publish` an event:

```js
eventBus.publish('myTopic', data)
```

## Creating components with events

Once you have created your events instance, simply pass it to each component.

Subscriptions based on lifecycle hooks will be automatically handled within the component.
You need to provide the initial topic subscription and then once established, subscriptions
will be handled automatically when the component fires the removed or updated lifecycle hook.

```js
const eventBus = createEventBus()

// A new component
createComponent('my-component', {
  renderer,
  eventBus,
  handleEvent (data) {
    /* handle event here */
  },
  mounted () {
    this.events.subscribe('my-event', this.handleEvent)
  },
  render () {
    /* handle render here */
  }
})
```
