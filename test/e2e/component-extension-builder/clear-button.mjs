import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { store } from './store.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'clear-button',
  ExtensionBuilder
    .newInstance()
    .withLocalState()
    .withStore(store)
    .withI18n(i18n)
    .create({
      state () {
        return {
          button: 'test'
        }
      },
      clear () {
        this.store.clear()
      },
      render () {
        return html`<button type="button" @click=${this.clear}>${this.i18n.t('buttons.clear')}</button>`
      }
    })
)
