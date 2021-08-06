---
layout: main.njk
title: FicusJS documentation - Event bus - Publish
---
# Publish

When you want to notify subscribers, you need to `publish` to a topic:

```js
eventBus.publish('myTopic', data)
```

The following arguments are passed when publishing to a topic:

| Property | Required | Description                                                                          |
| --- | --- | --- |
| `topic` | yes | The name of the topic |
| `data` | | Optional data to pass along to subscribers |

## Subscribers

When publishing to a topic, the return value is a `Map` of subscribers notified with the message.

The `Map` contains the callback and an `object` with the subscriber options.

The subscriber options contain the `callCount` of how many times the subscriber has been notified.

```js
const notified = eventBus.publish('myTopic', data)

notified.forEach((callback, options) => {
  // how many times this subscriber has been called
  console.log(options.callCount)
})
```
