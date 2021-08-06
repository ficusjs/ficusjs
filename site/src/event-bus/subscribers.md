---
layout: main.njk
title: FicusJS documentation - Event bus - Subscribers
---
# Subscribers

To retrieve the subscribers for a topic, use the `getSubscribers` method.
This method returns a `Map` of subscribers for a topic or `object` of all subscribers for all topics.

```js
const subscribers = eventBus.getSubscribers('myTopic')
```

The `Map` contains the callback and an `object` with the subscriber options.

The subscriber options contain the `callCount` of how many times the subscriber has been notified.

```js
subscribers.forEach((callback, options) => {
  // how many times this subscriber has been called
  console.log(options.callCount)
})
```
