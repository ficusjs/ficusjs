import { createAppState } from '../util/component.mjs'

export const store = createAppState('basic-store', {
  initialState: {
    count: 0
  },
  increment (payload) {
    this.setState(state => ({ count: payload }))
  }
})
