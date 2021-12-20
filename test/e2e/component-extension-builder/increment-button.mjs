import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { store } from './store.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'increment-button',
  ExtensionBuilder
    .newInstance()
    .withStore(store)
    .withI18n(i18n)
    .create({
      increment () {
        this.store.dispatch('increment', this.store.state.count + 1)
      },
      render () {
        return html`<button type="button" @click=${this.increment}>${this.i18n.t('buttons.increment')}</button>`
      }
    })
)
