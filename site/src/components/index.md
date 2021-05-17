---
layout: main.njk
title: FicusJS documentation - Components
---
# Components

FicusJS provides functions for creating fast, lightweight web components.

Components created with FicusJS are native [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
created in a functional and declarative way.

## createCustomElement function

The `createCustomElement` function creates a lightweight custom element. The following features are provided:

- [Root definition](/components/root-definition/)
- [Props](/components/props/)
- [Computed getters](/components/computed-getters/)
- [Methods](/components/methods/)
- [Lifecycle hooks](/components/lifecycle-hooks/)
- [Rendering](/components/rendering/)
- [Emitting events](/components/emitting-events/)
- [Slots](/components/slots)

## createComponent function

The `createComponent` function creates a lightweight web component using the `createCustomElement` function and extending it with the `withLocalState` function to provide local state.
