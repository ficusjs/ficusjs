import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'

export function createDataFetchStateVisualization ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-state-visualization',
    withXStateService(dataFetchStateMachine,{
    renderer,
    getLabelClass(state) {
      const currentState = this.fsm.state.value
      if (currentState !== state) {
        return 'container__label--inactive'
      } else {
        switch (state) {
          case 'idle':
            return 'text-blue-400 container__label--active'
          case 'loading':
            return 'text-amber-400 container__label--active'
          case 'loaded':
            return 'text-green-400 container__label--active'
          case 'error':
            return 'text-red-400 container__label--active'
        }
      }
    },
    render () {
      return html`
        <container-wrapper header="Data fetch - state visualization">
          <div class="flex-col-center">
            <div class="${this.getLabelClass('idle')}">IDLE</div>
            <div class="${this.getLabelClass('loading')}">LOADING</div>
            <div class="${this.getLabelClass('loaded')}">LOADED</div>
            <div class="${this.getLabelClass('error')}">ERROR</div>
          </div>
        </container-wrapper>
      `
    }
  }))
}