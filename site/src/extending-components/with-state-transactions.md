---
layout: main.njk
title: FicusJS documentation - Extending components - withStateTransactions function
---
# withStateTransactions function <span class="fd-deprecated" style="font-size: 1rem">Deprecated</span>

The `withStateTransactions` is deprecated. Please use the component `setState` method for mutating state within a transaction.

---

The `withStateTransactions` function extends a component with transactions so multiple state changes can occur without triggering a re-render.

```js
// import it with all other features
import { createComponent, withStateTransactions } from 'https://cdn.skypack.dev/ficusjs@5'

// alternatively, import the function directly
// import { withStateTransactions } from 'https://cdn.skypack.dev/ficusjs@5/with-state-transactions'

// import the renderer and html tagged template literal from the lit-html library
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/lit-html'

createComponent(
  'my-like-component',
  withStateTransactions({
    renderer,
    state () {
      return { count: 0, message: null, status: 'unliked' }
    },
    like () {
      // start a transaction
      this.beginTransaction()

      // change some state
      this.state.count = this.state.count + 1
      this.state.message = 'Thanks for liking this!'

      // save the like to the server
      window.fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: this.state.count, updatedBy: 'Jane Doe' })
      })
      .then(res => res.json())
      .then(data => {
        this.state.status = 'liked'
        this.endTransaction()
      })
      .catch(err => {
        this.rollbackTransaction()
        this.state.status = 'error'
      })
    },
    render () {
      if (this.state.status === 'liked') {
         return html`<p>${this.state.message}</p>`
      }
      return html`<button type="button" @click=${this.like}>Like</button>`
    }
  })
)
```

A transaction is a sequence of operations performed on state as a single logical unit of work.
The transaction can be either all committed (applied to state) or all rolled back (undone from state).

### beginTransaction method <span class="fd-deprecated" style="font-size: 1rem">Deprecated</span>

The `beginTransaction` method starts a transaction.

### endTransaction method <span class="fd-deprecated" style="font-size: 1rem">Deprecated</span>

The `endTransaction` method ends the transaction and triggers a component render.

### rollbackTransaction method <span class="fd-deprecated" style="font-size: 1rem">Deprecated</span>

The `rollbackTransaction` method rolls back the state changes carried out within the transaction.
This is used if an error occurs, and the state needs to be reset.
