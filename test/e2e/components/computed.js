import { createComponent, html } from '../util/component.js'

createComponent('mock-computed', {
  computed: {
    greeting () {
      const name = 'Computed'
      return `${name} component`
    }
  },
  render () {
    return html`<span>${this.greeting}</span>`
  }
})

createComponent('mock-cached-computed', {
  computed: {
    greeting () {
      const name = 'Cached computed'
      return `${name} component`
    }
  },
  render () {
    return html`<p>
<span>${this.greeting}</span>
<span>${this.greeting}</span>
</p>`
  }
})
