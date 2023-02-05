export function createFormSubmissionStateVisualization ({ createCustomElement, html, renderer }) {
  createCustomElement('form-submission-state-visualization', {
    renderer,
    render () {
      return html`
        <container-wrapper header="FORM - STATE VISUALIZATION">
        </container-wrapper>
      `
    }
  })
}