import { createRouter } from 'https://cdn.skypack.dev/@ficusjs/router'
import { store } from './store.js'

export const router = createRouter([
  { path: '', component: 'todo-body' },
  { path: '/active', component: 'todo-body' },
  { path: '/completed', component: 'todo-body' }
], '#router-outlet', {
  mode: 'hash',
  resolveRoute (context) {
    switch (context.path) {
      case '/active':
        store.commit('filter', 'active')
        break
      case '/completed':
        store.commit('filter', 'completed')
        break
      default:
        store.commit('filter', 'all')
        break
    }
  }
})
