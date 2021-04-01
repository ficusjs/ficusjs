import test from 'ava'
import sessionStorage from 'node-sessionstorage'
import { createStore, createPersist } from '../../src/store.mjs'

let store
let store2

test.before(t => {
  globalThis.sessionStorage = sessionStorage
  globalThis.localStorage = sessionStorage
})

test.beforeEach(t => {
  store = createStore('persist.store', {
    persist: 'persist.store',
    initialState: {
      test: null
    }
  })
  store2 = createStore('persist.store2', {
    persist: createPersist('persist.store2', 'local'),
    initialState: {
      test: null
    }
  })
})

test('create the stores', t => {
  t.truthy(store)
  t.truthy(store2)
})

test('sessionStorage: state change using direct assignment', t => {
  store.state.test = 'test'
  t.is(store.state.test, 'test')
  t.is(globalThis.sessionStorage.getItem('persist.store:state'), JSON.stringify(store.state))
})

test('sessionStorage: has initial state', t => {
  t.is(store.state.test, 'test')
  t.is(globalThis.sessionStorage.getItem('persist.store:state'), JSON.stringify(store.state))
})

test('sessionStorage: clear state', t => {
  store.clear()
  t.is(store.state.test, null)
  t.is(globalThis.sessionStorage.getItem('persist.store:state'), undefined)
})

test('localStorage: state change using direct assignment', t => {
  store2.state.test = 'test'
  t.is(store2.state.test, 'test')
  t.is(globalThis.localStorage.getItem('persist.store2:state'), JSON.stringify(store2.state))
})

test('localStorage: has initial state', t => {
  t.is(store2.state.test, 'test')
  t.is(globalThis.localStorage.getItem('persist.store2:state'), JSON.stringify(store2.state))
})

test('localStorage: clear state', t => {
  store2.clear()
  t.is(store2.state.test, null)
  t.is(globalThis.localStorage.getItem('persist.store2:state'), undefined)
})
