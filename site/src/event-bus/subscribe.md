---
layout: main.njk
title: FicusJS documentation - Event bus - Subscribe
---
# Subscribe

To be notified when a particular event will be published, use the `subscribe` method to register a callback function.
This method returns a function which can be invoked later for unsubscription.

```js
const unsubscribe = eventBus.subscribe('myTopic', data => {
  // handle the event with the data passed
})

// Unsubscribe later
unsubscribe()
```
