---
layout: main.njk
title: FicusJS documentation - Components - Methods
---
# Methods

It is common to be able to call a method and perform an action. To achieve this, you can define methods when creating your component.
Methods are functions that can be defined anywhere in the component definition object.

```js
createCustomElement('example-component', {
  renderer,
  props: {
    name: {
      type: String
    },
    family: {
      type: String
    },
    title: {
      type: String
    }
  },
  formatName (name, family, title) {
    return `${title} ${name} ${family}`
  },
  render () {
    return html`
             <div>
               ${this.formatName(
                 this.props.name,
                 this.props.family,
                 this.props.title
               )}
             </div>
           `
  }
})
```

Methods are available anywhere in your component - inside getters or rendering. They are bound to the component instance.
