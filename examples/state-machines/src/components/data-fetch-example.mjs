import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'

export function createDataFetchExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-example',
    withXStateService(dataFetchStateMachine,{
    renderer,
    async load () {
      this.fsm.send('LOAD')
      // simulating an api call
      await new Promise(resolve => setTimeout(resolve, 2000))
      const randomNumber = Math.floor(Math.random() * 100)
      const data = { name: 'FicusJS' }
      randomNumber > 50 ? this.fsm.send({ type: 'SUCCESS', data }) : this.fsm.send('ERROR')
    },
    async retry () {
      this.fsm.send('RETRY')
      await new Promise(resolve => setTimeout(resolve, 2000))
      await this.load()
    },
    getContent () {
      switch (this.fsm && this.fsm.state.value) {
        case 'idle':
          return html`<button class="container__button" onclick="${this.load}">Fetch Data</button>`
        case 'loading':
          return html`<p>Loading...</p>`
        case 'loaded':
          const { data } = this.fsm.state.context
          return html`<p>${data.name}</p>`
        case 'error':
          return html`
            <div class="center-div flex-col">
                <p>Something went wrong, want to retry?</p>
                <button class="container__button" onclick="${this.retry}">Retry</button>
            </div>
          `
      }
    },
    render () {
      return html`
        <container-wrapper header="DATA FETCH - EXAMPLE">
          ${this.getContent()}
        </container-wrapper>
      `
    }
  }))
}