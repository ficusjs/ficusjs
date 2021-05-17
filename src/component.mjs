import { createCustomElement } from './custom-element.mjs'
import { withLocalState } from './with-local-state.mjs'

/**
 * Function to create a component
 * @param {string} tagName
 * @param {object} options
 */
function createComponent (tagName, options) {
  createCustomElement(tagName, withLocalState(options))
}

/**
 * Function to use a FicusJS module of components
 * @param {object} module
 * @param {function} renderer
 * @param {*} args
 * @returns {*}
 */
function use (module, { renderer, ...args }) {
  if (module.create && typeof module.create === 'function') {
    return module.create({
      createComponent,
      renderer,
      ...args,
      use
    })
  }
}

export { createComponent, use }
