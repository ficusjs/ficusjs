import { formSubmissionStateMachine } from '../fsm/form-submission-fsm.mjs'

export function createFormSubmissionStateVisualization ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('form-submission-state-visualization',
    withXStateService(formSubmissionStateMachine, {
      renderer,
      getLabelClass (state) {
        const currentState = this.fsm.state.value
        if (currentState !== state) {
          return 'container__label--inactive'
        } else {
          switch (state) {
            case 'idle':
              return 'text-blue-400 container__label--active'
            case 'submitting':
              return 'text-amber-400 container__label--active'
            case 'success':
              return 'text-green-400 container__label--active'
            case 'error':
              return 'text-red-400 container__label--active'
          }
        }
      },
      render () {
        return html`
          <container-wrapper header="Form - state visualization">
            <div class="flex flex-row justify-evenly w-full">
              <div class="flex-col-center h-full self-center">
                <div class="${this.getLabelClass('idle')}">IDLE</div>
                <div class="${this.getLabelClass('submitting')}">SUBMITTING</div>
                <div class="${this.getLabelClass('success')}">SUCCESS</div>
                <div class="${this.getLabelClass('error')}">ERROR</div>
              </div>
              <img class="rounded-lg border-2 border-dashed border-teal-500" src="assets/images/form-submitting-x-state-chart.png" style="height: 30vh">
            </div>
          </container-wrapper>
        `
      }
    })
  )
}
