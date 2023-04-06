import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'
import { COLOR_FETCH_LABELS } from '../util/constants.mjs'

export function createDataFetchStateVisualization ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-state-visualization',
    withXStateService(dataFetchStateMachine, {
      renderer,
      getLabelClass (label) {
        const fsmState = this.fsm.state.value
        return fsmState === label ? `${COLOR_FETCH_LABELS[label]} container__label--active` : 'container__label--inactive'
      },
      render () {
        return html`
          <div class="flex-row-evenly w-full">
            <div class="flex-col-center h-full">
              <div class="${this.getLabelClass('idle')}">IDLE</div>
              <div class="${this.getLabelClass('loading')}">LOADING</div>
              <div class="${this.getLabelClass('loaded')}">LOADED</div>
              <div class="${this.getLabelClass('error')}">ERROR</div>
            </div>
            <img class="dashed-borders" src="assets/images/data-fetch-x-state-chart.png" style="height: 30vh">
          </div>
        `
      }
    })
  )
}
