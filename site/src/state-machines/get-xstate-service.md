---
layout: main.njk
title: FicusJS documentation - Finite state machines and statecharts - getXStateService function
---
# getXStateService function

The `getXStateService` function is a quick way to retrieve a finite state machine or statechart service created using [`createXStateService`](/state-machines/create-xstate-service).

```js
// import the function
import { getXStateService } from 'https://cdn.skypack.dev/ficusjs@5/xstate-service'

// retrieve a store instance
const service = getXStateService('toggle.service')
```

A single service can be attached to multiple components that react to state changes.
