import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'

export function createDataFetchExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-example',
    withXStateService(dataFetchStateMachine,{
    renderer,
    async load () {
      this.fsm.send('LOAD')
      await new Promise(resolve => setTimeout(resolve, 2000))
      const randomNumber = Math.floor(Math.random() * 100)
      const data = { totalCategories: 5 }
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
          return html`<img src="assets/gifs/loading.gif" style="width: 10vh">`
        case 'loaded':
          return html`
            <div class="flex-col-center justify-evenly h-full">
              <p class="text-semibold">Number of categories: ${this.fsm.state.context.data?.totalCategories}</p>
              <img class="rounded-lg" src="assets/images/data-fetch-response.png" style="height: 25vh">
            </div>
          `
        case 'error':
          return html`
            <div class="flex-row-evenly w-full">
              <img class="rounded-lg" src="assets/gifs/monkey.gif" style="height: 30vh">
              <div class="flex-col-center">
                <p>Something went wrong,<br> want to retry?</p>
                <button class="container__button" onclick="${this.retry}">Retry</button>
              </div>
            </div>
          `
      }
    },
    render () {
      return html`
        <container-wrapper header="Data fetch - example">
          ${this.getContent()}
        </container-wrapper>
      `
    }
  }))
}