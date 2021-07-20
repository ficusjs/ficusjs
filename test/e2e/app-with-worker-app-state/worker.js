/* global importScripts */
importScripts('https://unpkg.com/@ficusjs/state@1.2.0/dist/worker-app-state.iife.js')

const store = globalThis.ficusjs.createAppState({
  initialState: {
    count: 0
  },
  increment (payload) {
    this.setState(state => ({ count: payload }))
  }
})

function postState () {
  globalThis.postMessage(Object.assign({}, store.state))
}

store.subscribe(postState)

globalThis.onmessage = function (e) {
  const { actionName, payload } = e.data

  if (actionName === 'start') {
    postState()
  } else if (store[actionName]) {
    store[actionName](payload)
  }
}
