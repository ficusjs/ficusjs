---
layout: main.njk
title: FicusJS documentation - Extending components - withStyles function
---
# withStyles function

The `withStyles` function extends a component and makes working with component styles more efficient
by providing a `styles` function which is invoked injecting CSS into the `<head>` once for all component instances.

```js
// import it with all other features
import { createComponent, withStyles } from 'https://cdn.skypack.dev/ficusjs@3'

// alternatively, import the function directly
// import { withStyles } from 'https://cdn.skypack.dev/ficusjs@3/with-styles'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'

createComponent(
  'my-component',
  withStyles({
    renderer,
    styles () {
      return `
        my-component button {
          background-color: yellow;
          color: black;
        }
      `
    },
    render () {
      return html`<button type="button">A styled button</button>`
    }
  })
)
```

The `withStyles` function automatically handles loading styles based on the component lifecycle hooks.

## styles function

The `styles` function must be provided when using the `withStyles` function. This function is invoked and injects CSS into the `<head>`
once for all component instances.

The `styles` function can return a `String` or Array of strings containing either styles or URL to an external stylesheet.

### String styles

Return a string containing styles.

```js
{
  styles () {
    return `
      my-component button {
        background-color: yellow;
        color: black;
      }
    `
  }
}
```

### External stylesheet

Return a URL to a stylesheet - must be a fully qualified URL, not a relative path.

```js
{
  styles () {
    return 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
  }
}
```

### Mixed

Return a mixed array containing both URL and string styles.

```js
{
  styles () {
    return [
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
      `
        my-component button {
          background-color: yellow;
          color: black;
        }
      `
    ]
  }
}
```
