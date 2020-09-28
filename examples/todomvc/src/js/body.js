import { createComponent } from 'https://unpkg.com/ficusjs?module'
import { render as renderer, html } from 'https://unpkg.com/lit-html?module'
import { store } from './store.js'

import './list.js'

createComponent('todo-body', {
  store,
	renderer,
	toggleAll (e) {
		this.store.dispatch('markAllComplete', e.target.checked)
	},
  render () {
    if (!this.store.state.todos || this.store.state.todos.length === 0) {
      return ''
    }
    return html`<section class="main">
 <input id="toggle-all" class="toggle-all" type="checkbox" @change=${this.toggleAll}>
 <label for="toggle-all">Mark all as complete</label>
 <todo-list></todo-list>
</section>`
  }
})
