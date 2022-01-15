import test from 'ava'
import { ExtensionBuilder } from '../../src/extension-builder.mjs'

test('builds', t => {
  const options = ExtensionBuilder.newInstance()
    .withLocalState()
    .withEventBus({ eventBus: true })
    .withI18n({ i18n: true })
    .withBreakpointRender({ breakpointConfig: true })
    .create({
      state () {
        return {
          view: '/'
        }
      },
      render () {
        return 'test'
      }
    })
  t.is(typeof options.setEventBus, 'function')
  t.is(typeof options.setI18n, 'function')
  t.is(typeof options.setBreakpointConfig, 'function')
})
