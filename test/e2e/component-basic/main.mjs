import { createComponent, html } from '../util/component.mjs'

createComponent('mock-basic', {
  mounted () {
    console.log('mounted!')
  },
  render () {
    return html`<span>Basic component</span>`
  }
})
