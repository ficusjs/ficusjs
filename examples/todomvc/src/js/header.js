import { createComponent } from 'https://unpkg.com/ficusjs?module'
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'
import { store } from './store.js'
import { keyCodes } from './constants.js'

createComponent('todo-header', {
  store,
	renderer,
	add (e) {
		if (e.code === keyCodes.ENTER_KEY && e.target.value !== '') {
			this.store.dispatch('add', {
				id: Math.random().toString(36).slice(2), // a simple ID generator
				complete: false,
				status: 'active',
				text: e.target.value
			})
			e.target.value = ''
		}
	},
  render () {
    return html`<header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus @keyup=${this.add}>
   </header>`
  }
})
