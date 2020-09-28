import { createStore } from '../util/component.js'

const count = createStore('store-1', {
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

const blank = createStore('store-2', {
  initialState: {
    blank: 'This is a blank store'
  }
})

export const store = {
  count,
  blank
}
