import { html, createComponent, ExtensionBuilder } from '../util/component.mjs'
import { store } from './store.mjs'
import { i18n } from './i18n.mjs'

createComponent(
  'display-button',
  ExtensionBuilder
    .newInstance()
    .withStore(store)
    .withI18n(i18n)
    .create({
      computed: {
        count () {
          return this.store.state.count
        },
        timesTen () {
          return this.store.getters.timesTen
        },
        timesBy () {
          return this.store.getters.timesBy(20)
        }
      },
      render () {
        return html`<div><span>${this.i18n.t('message', { count: this.count })}</span> <span>${this.count} * 10 = ${this.timesTen}</span>, <span>${this.count} * 20 = ${this.timesBy}</span></div>`
      }
    })
)
