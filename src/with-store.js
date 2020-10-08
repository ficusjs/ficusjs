export function withStore (store, options) {
  return {
    ...options,
    created () {
      // create a subscription callback
      this.subscribeCallback = () => {
        // clear the getter cache
        this.computedCache = {}

        // Run the render processor now that there's changes
        this._processRender()
      }
      this.setStore(store)
      if (options.created) options.created.call(this)
    },
    mounted () {
      this._subscribeToStores(false)
      if (options.mounted) options.mounted.call(this)
    },
    updated () {
      this._subscribeToStores(false)
      if (options.updated) options.updated.call(this)
    },
    removed () {
      this._unsubscribeFromStores()
      if (options.removed) options.removed.call(this)
    },
    setStore (store) {
      this.store = store
      this._subscribeToStores()
    },
    _subscribeToStores (invokeSubscribeCallback = true) {
      if (this.store && this.store.subscribe && typeof this.store.subscribe === 'function' && !this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(this.subscribeCallback)
        if (invokeSubscribeCallback) this.subscribeCallback()
      } else if (this.store && typeof this.store === 'object' && !this.store.subscribe) {
        this.unsubscribe = {}
        const keys = Object.keys(this.store)
        keys.forEach(k => {
          if (this.store[k] && this.store[k].subscribe && typeof this.store[k].subscribe === 'function' && !this.unsubscribe[k]) {
            this.unsubscribe[k] = this.store[k].subscribe(this.subscribeCallback)
          }
        })
        if (invokeSubscribeCallback) this.subscribeCallback()
      }
    },
    _unsubscribeFromStores () {
      if (this.store && this.unsubscribe && typeof this.unsubscribe === 'object') {
        const keys = Object.keys(this.unsubscribe)
        keys.forEach(k => {
          this.unsubscribe[k]()
        })
        this.unsubscribe = null
      } else if (this.store && this.unsubscribe && typeof this.unsubscribe === 'function') {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }
  }
}
