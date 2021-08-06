---
layout: main.njk
title: FicusJS documentation - Event bus - Subscribe
---
# Subscribe

To be notified when a particular topic is published, use the `subscribe` method to register a callback function.
This method returns a function which can be invoked later for unsubscription.

```js
const unsubscribe = eventBus.subscribe('myTopic', data => {
  // handle the event with the data passed
})

// Unsubscribe later
unsubscribe()
```

## Options

Options can be passed to the `subscribe` function to customise the behaviour of the subscriber.

```js
const options = {
  fireOnce: true
}

const unsubscribe = eventBus.subscribe('myTopic', data => {
  // handle the event with the data passed
}, options)
```

The supported options are:

| Property | Type | Default | Description                                                                          |
| --- | --- | --- | --- |
| `fireOnce` | `boolean` | `false` | Set to `true` for the subscriber to be notified just once |
