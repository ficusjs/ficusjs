import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { store } from './store.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'clear-button',
  ExtensionBuilder
    .newInstance()
    .withStore(store)
    .withI18n(i18n)
    .create({
      clear () {
        this.store.clear()
      },
      render () {
        return html`<button type="button" @click=${this.clear}>${this.i18n.t('buttons.clear')}</button>`
      }
    })
)
