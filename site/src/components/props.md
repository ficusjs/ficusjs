---
layout: main.njk
title: FicusJS documentation - Components - Props
---
# Props

You pass props as HTML attributes on the component and then get access to them inside your component's JavaScript with `this.props`. Props must be defined using camel-case but set as kebab-case in HTML.
Props will be observed by default which means they react to changes.

```html
<example-component class-name="a-class" required="true"></example-component>
```

You'll need to define your prop types in the component definition, like so:

```js
props: {
  className: {
    type: String,
    default: 'btn',
    required: true, // is this required?
    observed: false // turn off observing changes to this prop
  },
  required: {
    type: Boolean,
    default: false
  }
}
```

The following properties can be used to define props:

| Property   | Required | Value                                                                          |
| ---------- | -------- | ------------------------------------------------------------------------------ |
| `type`     | yes      | This must be one of `String`, `Number`, `Boolean` or `Object`                  |
| `default`  |          | Set a default value if one is not set                                          |
| `required` |          | Is this prop required when the component is used? If so, set to `true`         |
| `observed` |          | Set to `false` to turn off observing changes to this prop                     |

## Instance properties

Prop values can be set on instances of components. Each prop you define for a component becomes an instance property and can be set using Javascript.

```js
const exampleComponentInstance = document.querySelector('example-component')
exampleComponentInstance.className = 'another-value'
```
