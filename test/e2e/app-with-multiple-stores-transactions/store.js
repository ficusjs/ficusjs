import { createStore } from '../util/component.js'

function createStoreInstance (key) {
  return createStore(key, {
    initialState: {
      count: 0
    },
    actions: {
      increment (context, payload) {
        context.commit('increment', payload)
      }
    },
    mutations: {
      increment (state, payload) {
        state.count = payload
        return state
      }
    }
  })
}

function isStore (store) {
  return store.subscribe && typeof store.subscribe === 'function'
}

export const store = {
  count: createStoreInstance('count-1'),
  count2: createStoreInstance('count-2'),
  count3: createStoreInstance('count-3'),
  begin () {
    Object.values(this).forEach(v => isStore(v) && v.begin())
  },
  end () {
    Object.values(this).forEach(v => isStore(v) && v.end())
  },
  rollback () {
    Object.values(this).forEach(v => isStore(v) && v.rollback())
  }
}
