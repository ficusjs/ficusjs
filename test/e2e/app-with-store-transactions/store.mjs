import { createStore } from '../util/component.mjs'

export const store = createStore('store-transactions', {
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
  getters: {
    timesTen (state) {
      return state.count * 10
    },
    timesBy (state) {
      return (amount) => state.count * amount
    }
  }
})
