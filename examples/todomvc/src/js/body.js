import { createComponent, withStore } from 'https://unpkg.com/ficusjs?module'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'
import { store } from './store.js'

import './list.js'

createComponent(
  'todo-body',
  withStore(store, {
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
)
