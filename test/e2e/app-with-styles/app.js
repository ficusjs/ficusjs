import { html, createComponent, withStyles } from '../util/component.js'

createComponent(
  'mock-app-with-styles',
  withStyles({
    styles () {
      return `
        mock-app-with-styles .message {
          background-color: yellow;
          color: black;
          padding: 10px 15px;
        }
      `
    },
    render () {
      return html`<div>
        <div class="message">
          <h2>This is a message</h2>
        </div>
      </div>`
    }
  })
)
