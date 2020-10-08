import { createComponent, html, withStateTransactions } from '../util/component.js'

createComponent('mock-state-transactions',
  withStateTransactions({
    state () {
      return { count: 0 }
    },
    computed: {
      count () {
        return this.state.count
      },
      timesTen () {
        return this.state.count * 10
      }
    },
    timesBy (amount) {
      return this.state.count * amount
    },
    increment () {
      this.state.count = this.state.count + 1
      this.runCount = this.runCount + 1
      if (this.state.count >= 10) {
        this.rollbackTransaction()
        this.runCount = 0
        this.beginTransaction()
      }
      if (this.runCount === 5) {
        this.endTransaction()
        this.runCount = 0
        this.beginTransaction()
      }
    },
    mounted () {
      this.runCount = 0
      this.beginTransaction()
    },
    render () {
      return html`<div>
  <div class="rollback-button">
    <button type="button" @click=${this.increment}>Increment rollback when &gt;= 10</button>
  </div>
  <div class="display-button"><span>You have clicked ${this.count} times!</span> <span>${this.count} * 10 = ${this.timesTen}</span>, <span>${this.count} * 20 = ${this.timesBy(20)}</span></div>
      </div>`
    }
  })
)
