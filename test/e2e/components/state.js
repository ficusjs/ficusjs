import { createComponent, html } from '../util/component.js'

createComponent('mock-state', {
  state () {
    return { count: 0 }
  },
  increment () {
    this.state.count = this.state.count + 1
  },
  render () {
    return html`<button type="button" @click=${this.increment}>State component with count of&nbsp;<strong>${this.state.count}</strong></button>`
  }
})

createComponent('mock-string-state', {
  state () {
    return {
      dummy: 'Initial Value'
    }
  },
  clickedHandler () {
    this.state.dummy = 'Button Clicked'
  },
  mounted () {
    this.state.dummy = 'Ready'
  },
  render () {
    return html`<button type="button" color="primary" @click=${this.clickedHandler}><span>${this.state.dummy}</span></button>`
  }
})

createComponent('mock-object-state', {
  state () {
    return {
      user: {
        userId: 0,
        username: '',
        name: '',
        emailAddress: '',
        active: true
      }
    }
  },
  handleSubmit (e) {
    e.preventDefault()
    console.log('Form submitted!')
  },
  render () {
    return html`<form method="post" @submit=${this.handleSubmit}><input
                    type="text"
                    name="username"
                    required
                    value=${this.state.user.username}>
                  </form>`
  }
})

createComponent('mock-prop-state', {
  state () {
    return {
      dummy: this.props.dummy
    }
  },
  props: {
    dummy: {
      type: String,
      default: 'Default dummy'
    }
  },
  render () {
    return html`<span>${this.state.dummy}</span>`
  }
})
