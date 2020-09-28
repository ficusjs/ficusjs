import { createStore, createPersist } from 'https://unpkg.com/ficusjs?module'

export const store = createStore('todomvc', {
  initialState: {
    filter: 'all',
    todos: null
  },
  actions: {
    add (context, payload) {
      const todos = context.state.todos ? [...context.state.todos, payload] : [payload]
      context.commit('todos', todos)
    },
    markAllComplete (context, complete) {
      const todos = context.state.todos.map(t => {
        t.status = complete ? 'completed' : 'active'
        t.complete = complete
        return t
      })
      context.commit('todos', todos)
    },
    markSingleComplete (context, id) {
      const todos = context.state.todos.map(t => {
        if (t.id === id) {
          t.status = 'completed'
          t.complete = true
        }
        return t
      })
      context.commit('todos', todos)
    },
    clearCompleted (context) {
      const todos = context.state.todos.filter(t => t.status !== 'completed')
      context.commit('todos', todos)
    },
    updateStatus (context, { id, status }) {
      const todos = context.state.todos.map(t => {
        if (t.id === id) {
          t.status = status
        }
        return t
      })
      context.commit('todos', todos)
    },
    update (context, { id, value }) {
      const todos = context.state.todos.map(t => {
        if (t.id === id) {
          t.text = value
          t.status = t.complete ? 'completed' : 'active'
        }
        return t
      })
      context.commit('todos', todos)
    },
    remove (context, id) {
      const todos = context.state.todos.filter(t => t.id !== id)
      context.commit('todos', todos)
    }
  },
  mutations: {
    todos (state, payload) {
      state.todos = payload
      return state
    },
    filter (state, payload) {
      state.filter = payload
      return state
    }
  },
  getters: {
    todos (state) {
      switch (state.filter) {
        case 'active':
          return state.todos ? state.todos.filter(t => t.status === 'active' && !t.complete) : null
        case 'completed':
          return state.todos ? state.todos.filter(t => t.complete) : null
        default:
          return state.todos
      }
    },
    completedCount (state) {
      return state.todos ? state.todos.filter(t => t.complete).length : 0
    },
    itemsLeft (state) {
      return state.todos ? state.todos.filter(t => t.status === 'active' && !t.complete).length : 0
    }
  },
  persist: createPersist('todomvc', 'local')
})
