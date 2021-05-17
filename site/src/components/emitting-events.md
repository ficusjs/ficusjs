---
layout: main.njk
title: FicusJS documentation - Components - Emitting events
---
# Emitting events

To emit an event on the component, you can call the `emit` method anywhere in your component:

```js
// a component that emits an event (other properties omitted for brevity)
{
  emitChangeEvent () {
    this.emit('change', { some: 'data' })
  }
}

// a component that listens for an event
{
  handleEvent (e) {
   console.log(e.detail) // prints { some: 'data' }
  },
  render () {
    return html`<example-component onchange=${this.methods.handleEvent}></example-component>`
  }
}
```

The following arguments can be used to emit an event:

| Property | Required | Description                                                                          |
| --- | --- | --- |
| `eventName` | yes | This must be a string with the name of the event |
| `data` | | Optional data to pass along with the event. Any data passed is available on the `Event.detail` property of the event |
