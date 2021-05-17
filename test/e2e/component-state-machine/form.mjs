/* global FormData */
import { createComponentWithStateMachine, html } from '../util/component.mjs'

createComponentWithStateMachine('mock-form', {
  states: {
    idle: {
      on: {
        SUBMIT: 'loading'
      }
    },
    loading: {
      on: {
        FORM_SUBMITTED: 'success',
        FORM_FAILED: 'error'
      }
    },
    success: {},
    error: {
      on: {
        SUBMIT: 'loading'
      }
    }
  },
  actions: {
    loading (data) {
      console.log(data)
      setTimeout(() => this.send('FORM_SUBMITTED'), 1000)
    }
  }
}, {
  onSubmit (e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    this.send({ type: 'SUBMIT', ...data })
  },
  render () {
    const { value } = this.state

    if (value === 'success') {
      return html`<p>Form successfully submitted!</p>`
    }

    return html`
      <form @submit="${this.onSubmit}">
        ${value === 'error' ? html`<span>Error: form error</span>` : ''}
        <label for="text1">Text</label>
        <input type="text" id="text1" name="text1">
        <button type="submit"
          ?disabled="${value === 'loading'}"
        >Submit</button>
      </form>
    `
  }
})
