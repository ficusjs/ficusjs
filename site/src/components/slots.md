---
layout: main.njk
title: FicusJS documentation - Components - Slots
---
# Slots

A slot is a placeholder inside your component for child elements.
Slots will be created automatically depending on whether child elements exist. Child elements that do not specify a named slot are available using the default slot `${this.slots.default}`.

Let's say you have a `<my-page-header>` component:

```js
html`
<div class="page-header__content">
  <div class="page-header__left">
    <span class="${this.props.icon}"></span>
    <h1 class="page-header__title">${this.props.title}</h1>
  </div>
  <div class="page-header__right">${this.slots.default}</div>
</div>
`
```

Buttons can be passed as child elements:

```html
<my-page-header title="Expenses" icon="budget">
  <button type="button" name="add">Add</button>
  <button type="button" name="save">Save</button>
</my-page-header>
```

This renders the buttons in the element `<div class="page-header__right">` inside the page header component.

## Named slots

Named slots can also be created in your HTML templates. Let's modify the `<my-page-header>` component:

```js
html`
<div class="page-header__content">
  <div class="page-header__left">${this.slots.left}</div>
  <div class="page-header__right">${this.slots.right}</div>
</div>
`
```

```html
<my-page-header>
  <div slot="left">
    <span class="budget"></span>
    <h1>Expenses</h1>
  </div>
  <div slot="right">
    <button type="button" name="add">Add</button>
    <button type="button" name="save">Save</button>
  </div>
</my-page-header>
```

This renders the elements `<div slot="left">` and `<div slot="right">` into the elements `<div class="page-header__left">` and `<div class="page-header__right">` inside the page header component.
