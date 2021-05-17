---
layout: main.njk
title: FicusJS documentation - Extending components
---
# Extending components

FicusJS provides a set of functions for extending components.

You can also write your own functions.

```js
export function withMyExtension (options) {
  return {
    ...options,

    // use lifecycle hooks to initialse variables and helpers
    created () {
      /*
      Perform any logic here
       */

      // it's important to call any other `created` methods defined in components or extended functions
      if (options.created) options.created.call(this)
    },
    mounted () {},
    updated () {},
    removed () {},

    // provide internal or public methods
    _internalMethod () {},
    publicMethod () {},
  }
}
```