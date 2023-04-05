import { formSubmissionStateMachine } from '../fsm/form-submission-fsm.mjs'
import { COLOR_FORM_LABELS } from '../util/constants.mjs'

export function createFormSubmissionStateVisualization ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('form-submission-state-visualization',
    withXStateService(formSubmissionStateMachine, {
      renderer,
      getLabelClass (label) {
        const fsmState = this.fsm.state.value
        return fsmState === label ? `${COLOR_FORM_LABELS[label]} container__label--active` : 'container__label--inactive'
      },
      render () {
        return html`
          <div class="flex-row-evenly w-full">
            <div class="flex-col-center h-full">
              <div class="${this.getLabelClass('idle')}">IDLE</div>
              <div class="${this.getLabelClass('submitting')}">SUBMITTING</div>
              <div class="${this.getLabelClass('success')}">SUCCESS</div>
              <div class="${this.getLabelClass('error')}">ERROR</div>
            </div>
            <img class="dashed-borders" src="assets/images/form-submitting-x-state-chart.png" style="height: 30vh">
          </div>
        `
      }
    })
  )
}
