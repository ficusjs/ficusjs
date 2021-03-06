import { createStore } from '../util/component.mjs'

export const store = createStore('persist-ttl', {
  ttl: 5,
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
  },
  persist: 'count-ttl' // this must be a unique value for this store or an instance of the Persist class
})
