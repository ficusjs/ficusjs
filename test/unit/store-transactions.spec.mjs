import test from 'ava'
import sinon from 'sinon'
import { createStore } from '../../src/store.mjs'

let store

test.beforeEach(t => {
  store = createStore('transactions.store', {
    initialState: {
      test: 'initial',
      test2: 'initial'
    }
  })
})

test('create a store', t => {
  t.truthy(store)
})

test('state change in a transaction', t => {
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.begin()
  store.state.test = 'test'
  store.state.test2 = 'test2'
  store.end()
  t.is(store.state.test, 'test')
  t.is(store.state.test2, 'test2')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})

test('rollback a transaction', t => {
  store.state.test = 'test'
  store.state.test2 = 'test2'
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.begin()
  store.state.test = 'test3'
  store.state.test2 = 'test4'
  store.rollback()
  t.is(store.state.test, 'test')
  t.is(store.state.test2, 'test2')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})
