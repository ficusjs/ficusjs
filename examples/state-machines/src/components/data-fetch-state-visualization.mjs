import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'

export function createDataFetchStateVisualization ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-state-visualization',
    withXStateService(dataFetchStateMachine,{
    renderer,
    render () {
      return html`
        <container-wrapper header="DATA FETCH - STATE VISUALIZATION">
          <p>${this.fsm.state.value}</p>
        </container-wrapper>
      `
    }
  }))
}