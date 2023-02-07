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
        <div class="full-space p-4">
          <div class="full-space border-2 border-teal-500 rounded-lg">
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
