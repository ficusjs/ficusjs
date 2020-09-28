import { createComponent, html } from '../util/component.js'

createComponent('mock-basic', {
  mounted () {
    console.log('mounted!')
  },
  render () {
    return html`<span>Basic component</span>`
  }
})
