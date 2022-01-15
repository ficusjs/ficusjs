import test from 'ava'
import { withEventBus } from '../../src/with-event-bus.mjs'
import { withI18n } from '../../src/with-i18n.mjs'
import { withBreakpointRender } from '../../src/with-breakpoint-render.mjs'

class ExtensionBuilder {
  constructor () {
    this.extensions = {}
  }

  with (extension, ...args) {
    this.extensions[extension] = { extension, args }
    return this
  }

  create (options) {
    return Object.keys(this.extensions)
      .reduce((prev, current) => {
        const ext = this.extensions[current]
        return ext.extension.apply(null, [...ext.args, prev])
      }, options)
  }
}

test('builds any extension', t => {
  const options = new ExtensionBuilder()
    .with(withEventBus, { eventBus: true })
    .with(withI18n, { i18n: true })
    .with(withBreakpointRender, { breakpointConfig: true })
    .create({
      render () {
        return 'test'
      }
    })
  t.is(typeof options.setEventBus, 'function')
  t.is(typeof options.setI18n, 'function')
  t.is(typeof options.setBreakpointConfig, 'function')
})
