import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { eventBus } from './events.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'publish-button',
  ExtensionBuilder
    .newInstance()
    .withI18n(i18n)
    .withEventBus(eventBus)
    .create({
      buttonClicked () {
        this.eventBus.publish('increment', undefined)
      },
      render () {
        return html`<button type="button" @click=${this.buttonClicked}>${this.i18n.t('buttons.increment')}</button>`
      }
    })
)
