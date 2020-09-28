import { createComponent, html } from '../util/component.js'

createComponent('mock-async-render', {
  render () {
    return new Promise(resolve => {
      setTimeout(() => resolve(html`<span>Async render component</span>`), 1000)
    })
  }
})
