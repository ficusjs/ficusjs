import { createI18n } from '../util/component.mjs'

const i18n = createI18n()
i18n.add({
  buttons: {
    clear: 'Clear',
    increment: 'Increment'
  },
  message: [
    'You have clicked {{ count }} time!',
    'You have clicked {{ count }} times!'
  ]
})

export { i18n }
