import { isPromise } from './util/is-promise.mjs'

export function withStateTransactions (options) {
  return {
    ...options,
    created () {
      this.state = this._monitorTransactionState(this._state)
      this.setState = (stateFn, callback) => {
        const setter = data => {
          if (!data || typeof data !== 'object') return
          const isExistingTransaction = this.transaction
          const existingUpdated = this.updated
          if (callback) {
            this.updated = () => {
              setTimeout(callback)
              this.updated = existingUpdated || undefined
            }
          }
          if (!isExistingTransaction) {
            this.beginTransaction()
          }
          for (const key in data) {
            if (!this.state[key] || (this.state[key] !== data[key])) this.state[key] = data[key]
          }
          if (!isExistingTransaction) {
            this.endTransaction()
          }
        }
        const res = stateFn(this.state)
        isPromise(res) ? res.then(setter) : setter(res)
      }
      if (options.created) options.created.call(this)
    },
    beginTransaction () {
      this.transactionCache = {}
      this.transaction = true
      this.status = 'transaction'
    },
    endTransaction () {
      this.transaction = false
      this.status = 'render'
      this._processRender()
    },
    rollbackTransaction () {
      Object.keys(this.transactionCache).forEach(k => (this.state[k] = this.transactionCache[k]))
      this.endTransaction()
    },
    _monitorTransactionState (objectInstance) {
      const self = this
      return new Proxy(objectInstance, {
        set (state, key, value) {
          // We don't want to do anything if there's no actual changes to make
          if (state[key] === value) return true

          // cache first value changed if we're in transaction mode
          if (self.transaction && !self.transactionCache[key]) {
            self.transactionCache[key] = self._copyValue(state[key])
          }

          // Allow the value to be set with no dramas
          state[key] = value

          // clear the computed cache
          self.computedCache = {}

          // Run the render processor now that there's changes
          if (self.status === 'render') self._processRender()

          return true
        },
        get (state, key) {
          return state[key]
        }
      })
    },
    _copyValue (value) {
      return JSON.parse(JSON.stringify(value))
    }
  }
}
