import { html, createComponent } from '../util/component.js'
import { store } from './store.js'

createComponent('rollback-button', {
  store,
  increment (store, count) {
    store.dispatch('increment', count)
    this.runCount = this.runCount + 1
    if (store.state.count >= 10) {
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
    return html`<div>
<button type="button" id="btn-1" @click=${() => this.increment(this.store.count, this.store.count.state.count + 1)}>1. Increment rollback when &gt;= 10</button>
<button type="button" id="btn-2" @click=${() => this.increment(this.store.count2, this.store.count2.state.count + 1)}>2. Increment rollback when &gt;= 10</button>
<button type="button" id="btn-3" @click=${() => this.increment(this.store.count3, this.store.count3.state.count + 1)}>3. Increment rollback when &gt;= 10</button>
</div>`
  }
})
