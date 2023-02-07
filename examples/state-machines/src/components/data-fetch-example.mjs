import { dataFetchStateMachine } from '../fsm/data-fetch-fsm.mjs'
import { httpGet } from '../util/http.mjs'

export function createDataFetchExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('data-fetch-example',
    withXStateService(dataFetchStateMachine, {
      renderer,
      async load () {
        this.fsm.send('LOAD')
        await new Promise(resolve => setTimeout(resolve, 4000))
        const response = await httpGet('api/data-table.json')
        const randomNumber = Math.floor(Math.random() * 100)
        response && randomNumber > 50 ? this.fsm.send({ type: 'SUCCESS', data: response.data }) : this.fsm.send('ERROR')
      },
      async retry () {
        this.fsm.send('RETRY')
        await this.load()
      },
      async refresh () {
        this.fsm.send('REFRESH')
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
              <div class="flex-col-center justify-evenly h-full w-full">
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
      },
      render () {
        return html`
          <container-wrapper header="Data fetch - example">
            ${this.getContent()}
          </container-wrapper>
        `
      }
    })
  )
}
