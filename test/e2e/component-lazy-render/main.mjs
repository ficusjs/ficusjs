import { createComponent, html, withLazyRender } from '../util/component.mjs'

createComponent(
  'mock-lazy-empty',
  withLazyRender({
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    render () {
      return this.elementVisible
        ? html`<span>Lazy rendered component with no initial content</span>`
        : ''
    }
  })
)

createComponent(
  'mock-lazy-loader',
  withLazyRender({
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    render () {
      return this.elementVisible
        ? html`<span>Lazy rendered component with placeholder</span>`
        : '<span></span>'
    }
  })
)
