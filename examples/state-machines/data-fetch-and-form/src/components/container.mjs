export function createContainerWrapper ({ createCustomElement, html, renderer }) {
  createCustomElement('container-wrapper', {
    renderer,
    props: {
      header: {
        type: String
      }
    },
    render () {
      return html`
        <div class="full-space p-2">
          <div class="full-space teal-borders">
            <h2 class="container__header">${this.props.header}</h2>
            <div class="container__content">
                ${this.slots.default}
            </div>
          </div>
        </div>
      `
    }
  })
}
