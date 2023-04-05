export function createFsmExamplesPage ({ createCustomElement, html, renderer }) {
  createCustomElement('fsm-examples-page', {
    renderer,
    render () {
      return html`
        <div class="flex-col-center justify-around w-screen h-screen p-2">
          <section class="flex-row-around w-full h-1/2">
            <container-wrapper header="Data fetch - example" class="full-space">
              <data-fetch-example class="full-space center-div"></data-fetch-example>
            </container-wrapper>
            <container-wrapper header="Data fetch - state visualization" class="full-space">
              <data-fetch-state-visualization class="full-space center-div"></data-fetch-state-visualization>
            </container-wrapper>
          </section>
          <section class="flex-row-around w-full h-1/2">
            <container-wrapper header="Form - example" class="full-space">
              <form-submission-example class="full-space center-div"></form-submission-example>
            </container-wrapper>
            <container-wrapper header="Form - state visualization" class="full-space">
              <form-submission-state-visualization class="full-space center-div"></form-submission-state-visualization>
            </container-wrapper>
          </section>
        </div>
      `
    }
  })
}
