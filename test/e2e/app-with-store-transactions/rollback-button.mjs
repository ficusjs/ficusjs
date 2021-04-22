import { html, createComponent, withStore } from '../util/component.mjs'
import { store } from './store.mjs'

createComponent('rollback-button',
  withStore(store, {
    increment (count) {
      this.store.dispatch('increment', this.store.state.count + 1)
      this.runCount = this.runCount + 1
      if (this.store.state.count >= 10) {
        this.store.rollback()
        this.runCount = 0
        this.store.begin()
      }
      if (this.runCount === 5) {
        this.store.end()
        this.runCount = 0
        this.store.begin()
      }
    },
    mounted () {
      this.runCount = 0
      this.store.begin()
    },
    render () {
      return html`<button type="button" @click=${this.increment}>Increment rollback when &gt;= 10</button>`
    }
  })
)
