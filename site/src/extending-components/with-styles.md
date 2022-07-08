---
layout: main.njk
title: FicusJS documentation - Extending components - withStyles function
---
# withStyles function

The `withStyles` function extends a component and makes working with component styles more efficient
by providing a `styles` function which is invoked injecting CSS into the `<head>` once for all component instances.

```js
// import it with all other features
import { createCustomElement, withStyles } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withStyles } from 'https://cdn.skypack.dev/ficusjs@5/with-styles'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import the css tagged template literal
import { css } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/css'

createCustomElement(
  'my-component',
  withStyles({
    renderer,
    styles () {
      return css`
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

The `styles` function can return:

- a CSS `String`
- URL to an external stylesheet
- a `css` tagged template literal
- `style` element
- Array containing any combination of the above!

### CSS string styles

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

External stylesheets are injected into the `head` as `link[rel=stylesheet]` tags.

```js
{
  styles () {
    return 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
  }
}
```

### css tagged template literal

Return a [`css`](/renderers/css/) tagged template literal.

```js
{
  styles () {
    return css`
      my-component button {
        background-color: yellow;
        color: black;
      }
    `
  }
}
```

### style element

Return a style element.

```js
{
  styles () {
    const cssText = `
      my-component button {
        background-color: yellow;
        color: black;
      }
    `
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(cssText))
    return style
  }
}
```

### Mixed

Return a mixed array containing multiple combinations of styles.

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
      `,
      css`
        my-other-component button {
          background-color: yellow;
          color: black;
        }
      `
    ]
  }
}
```
