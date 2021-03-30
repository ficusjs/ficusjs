import { html, createComponent, withStyles } from '../util/component.js'

createComponent(
  'single-link',
  withStyles({
    styles () {
      return 'http://localhost:8080/test/e2e/app-with-styles/css/link.css'
    },
    render () {
      return html`<div>
        <div class="message">
          <h2>This is another message</h2>
        </div>
      </div>`
    }
  })
)
