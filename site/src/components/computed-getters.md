---
layout: main.njk
title: FicusJS documentation - Components - Computed getters
---
# Computed getters

Computed getters are functions that are used like properties in your component. They are defined with the `computed` property.

They are memoized functions which means the result of the getter is cached for subsequent executions. This is useful when creating projections from large sets of data.

Setting local state will automatically reset the computed cache.

You can access getters with `this` in your component `render` function.

```js
computed: {
  myGetter () {
    const name = 'Andy'
    return `Hello, I'm ${name}`
  }
},
render () {
  return html`<div>${this.get.myGetter}</div>`
}
```
