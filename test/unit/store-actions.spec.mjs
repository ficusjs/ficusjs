import test from 'ava'
import { createStore } from '../../src/store.mjs'

let store

test.beforeEach(t => {
  store = createStore('actions.store', {
    initialState: {
      test: null,
      test2: null
    },
    actions: {
      setTest (context, payload) {
        context.setState((state) => ({ ...state, test: payload }))
      }
    }
  })
})

test('create a store', t => {
  t.truthy(store)
})

test('dispatch action to set state', t => {
  store.dispatch('setTest', 'test')
  t.is(store.state.test, 'test')
})

test('dispatch an invalid action', t => {
  const error = t.throws(() => {
    store.dispatch('setFake', 'test')
  })
  t.is(error.message, 'Dude, the store action "setFake" doesn\'t exist.')
})
