import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { eventBus } from './events.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'subscribe-button',
  ExtensionBuilder
    .newInstance()
    .withI18n(i18n)
    .withEventBus(eventBus)
    .create({
      state () {
        return { count: 0 }
      },
      mounted () {
        this.eventBus.subscribe('increment', () => {
          this.state.count = this.state.count + 1
        })
      },
      render () {
        return html`<div>${this.i18n.t('message', { count: this.state.count })}</div>`
      }
    })
)
