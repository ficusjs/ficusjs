export function createFormSubmissionExample ({ createCustomElement, html, renderer }) {
  createCustomElement('form-submission-example', {
    renderer,
    render () {
      return html`
        <container-wrapper header="FORM - EXAMPLE">
        </container-wrapper>
      `
    }
  })
}