import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'
import { httpGet } from '../util/http.mjs'

export function createDataFetchExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-example',
    withXStateService(dataFetchStateMachine, {
      renderer,
      async getData (url) {
        try {
          // using setTimeout to simulate a slow api call
          await new Promise(resolve => setTimeout(resolve, 4000))
          const response = await httpGet(url)
          this.fsm.send({ type: 'SUCCESS', data: response.data })
        } catch (error) {
          this.fsm.send({ type: 'ERROR', error })
        }
      },
      fetch (type) {
        type === 'RETRY' || type === 'REFRESH' ? this.fsm.send(type) : this.fsm.send('LOAD')
        this.getData(type === 'ERROR' ? 'api/wrong-url.json' : 'api/data-table.json')
      },
      render () {
        switch (this.fsm && this.fsm.state.value) {
          case 'idle':
            return html`
              <section class="flex-col-center">
                <button class="container__button" onclick="${() => this.fetch('SUCCESS')}">Fetch Data - Success</button>
                <button class="container__button" onclick="${() => this.fetch('ERROR')}">Fetch Data - Error</button>
              </section>
            `
          case 'loading':
            return html`<img src="assets/gifs/loading.gif" style="width: 15vh">`
          case 'loaded':
            return html`
              <div class="flex-col-center justify-evenly full-space">
                <data-table .data="${this.fsm.getters.data}" class="w-1/2 h-1/2"></data-table>
                <button class="container__button" onclick="${() => this.fetch('REFRESH')}">Refresh</button>
              </div>
            `
          case 'error':
            return html`
              <div class="flex-row-evenly w-full">
                <img class="rounded-lg" src="assets/gifs/monkey.gif" style="height: 30vh">
                <div class="flex-col-center">
                  <p>Something went wrong,<br> want to retry?</p>
                  <button class="container__button" onclick="${() => this.fetch('RETRY')}">Retry</button>
                </div>
              </div>
          `
        }
      }
    })
  )
}
