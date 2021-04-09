import test from 'ava'
import sinon from 'sinon'
import { createAppState, getAppState } from '../../src/app-state.mjs'

let store

test.beforeEach(t => {
  store = createAppState('test.store', {
    initialState: {
      test: null,
      nested: {
        prop1: null,
        prop2: null
      },
      test2: null
    }
  })
})

test('create a store', t => {
  t.truthy(store)
})

test('state change using direct assignment', t => {
  store.state.test = 'test'
  t.is(store.state.test, 'test')
})

test('state change nested object using direct assignment', t => {
  const newNested = { prop1: 'test', prop2: 'test2' }
  store.state.nested = newNested
  t.deepEqual(store.state.nested, newNested)
})

test('setState change', t => {
  store.setState(() => ({ test: 'test2' }))
  t.is(store.state.test, 'test2')
})

test('setState change nested object', t => {
  const expected = { prop1: null, prop2: 'test2' }
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
})

test('getState property', t => {
  store.setState(() => ({ nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.is(store.getState('nested.prop2'), 'test2')
})

test('subscribe to a store change', t => {
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.state.test = 'test'
  t.is(store.state.test, 'test')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})

test('subscribe to a store change without function', t => {
  const error = t.throws(() => {
    store.subscribe('subscribe')
  })
  t.is(error.message, 'Dude, you can only subscribe to store changes with a valid function')
})

test('store change using direct assignment', t => {
  const expected = { prop1: null, prop2: 'test2' }
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.state.test = 'test2'
  store.state.nested = { prop1: null, prop2: 'test2' }
  store.state.test2 = 'test3'
  t.deepEqual(store.state.test, 'test2')
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
  t.truthy(callback.called)
  t.is(callback.callCount, 3)
  unsub()
})

test('store change using setState', t => {
  const expected = { prop1: null, prop2: 'test2' }
  const callback = sinon.spy()
  const unsub = store.subscribe(callback)
  store.setState(() => ({ test: 'test2', nested: { prop1: null, prop2: 'test2' }, test2: 'test3' }))
  t.deepEqual(store.state.test, 'test2')
  t.deepEqual(store.state.nested, expected)
  t.deepEqual(store.state.test2, 'test3')
  t.truthy(callback.called)
  t.is(callback.callCount, 1)
  unsub()
})

test('get a store', t => {
  const thisStore = getAppState('test.store')
  t.is(thisStore, store)
})
