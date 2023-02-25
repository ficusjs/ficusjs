import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'
import { httpGet } from '../util/http.mjs'

export function createDataFetchExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-example',
    withXStateService(dataFetchStateMachine, {
      renderer,
      fetchSuccess () {
        this.fsm.send('LOAD')
        this.fetchData('api/data-table.json')
      },
      fetchError () {
        this.fsm.send('LOAD')
        this.fetchData('api/wrong-url.json')
      },
      async fetchData (url) {
        try {
          // using setTimeout to simulate a slow api call
          await new Promise(resolve => setTimeout(resolve, 4000))
          const response = await httpGet(url)
          this.fsm.send({ type: 'SUCCESS', data: response.data })
        } catch (error) {
          this.fsm.send({ type: 'ERROR', error })
        }
      },
      async retry () {
        this.fsm.send('RETRY')
        this.fetchData('api/data-table.json')
      },
      async refresh () {
        this.fsm.send('REFRESH')
        this.fetchData('api/data-table.json')
      },
      render () {
        switch (this.fsm && this.fsm.state.value) {
          case 'idle':
            return html`
              <section class="flex-col-center">
                <button class="container__button" onclick="${this.fetchSuccess}">Fetch Data - Success</button>
                <button class="container__button" onclick="${this.fetchError}">Fetch Data - Error</button>
              </section>
            `
          case 'loading':
            return html`<img src="assets/gifs/loading.gif" style="width: 15vh">`
          case 'loaded':
            return html`
              <div class="flex-col-center justify-evenly full-space">
                <table class="white-borders w-1/2 h-1/2">
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Country</th>
                  </tr>
                  ${this.fsm.getters.data.map(contact => html`
                    <tr>
                      <td>${contact.name}</td>
                      <td>${contact.company}</td>
                      <td>${contact.country}</td>
                    </tr>
                      `)}
                </table>
                <button class="container__button" onclick="${this.refresh}">Refresh</button>
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
      }
    })
  )
}
