import { html, createComponent, withStyles } from '../util/component.js'

createComponent(
  'mock-app-with-styles',
  withStyles({
    styles () {
      return [
        'http://localhost:8080/test/e2e/app-with-styles/css/all.min.css',
        `
        mock-app-with-styles .message {
          background-color: yellow;
          color: black;
          padding: 10px 15px;
        }
        `
      ]
    },
    render () {
      return html`<div>
        <div class="message">
          <h2><i class="fas fa-user"></i> This is a message</h2>
        </div>
      </div>`
    }
  })
)
