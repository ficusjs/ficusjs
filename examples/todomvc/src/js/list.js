import { createComponent, withStore } from 'https://unpkg.com/ficusjs?module'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/lit-html'
import { store } from './store.js'
import { keyCodes } from './constants.js'

createComponent(
  'todo-list',
  withStore(store, {
    renderer,
    markComplete (id) {
      this.store.dispatch('markSingleComplete', id)
    },
    remove (id) {
      this.store.dispatch('remove', id)
    },
    edit (id) {
      this.store.dispatch('updateStatus', { id, status: 'editing' })
    },
    update (e, id) {
      if (e.code === keyCodes.ENTER_KEY) {
        this.store.dispatch('update', { id, value: e.target.value })
      } else if (e.code === keyCodes.ESCAPE_KEY) {
        this.store.dispatch('updateStatus', { id, status: 'active' })
      }
    },
    render () {
      return html`<ul class="todo-list">
  ${this.store.getters.todos.map(t => html`<li class="${t.status}">
<div class="view">
  <input class="toggle" type="checkbox" @change=${() => this.markComplete(t.id)} .checked=${t.status === 'completed'}>
  <label @dblclick=${() => this.edit(t.id)}>${t.text}</label>
  <button class="destroy" @click=${() => this.remove(t.id)}></button>
</div>
<input class="edit" value="${t.text}" @keyup=${(e) => this.update(e, t.id)}>
</li>`)}
 </ul>`
    }
  })
)
