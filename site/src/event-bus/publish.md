---
layout: main.njk
title: FicusJS documentation - Event bus - Publish
---
# Publish

When you want to notify subscribers, you need to `publish` an event:

```js
eventBus.publish('myTopic', data)
```
