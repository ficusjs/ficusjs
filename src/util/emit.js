export function emit (elem, name, opts = {}) {
  const defs = {
    bubbles: true,
    cancelable: true,
    composed: false
  }
  const eventOptions = Object.assign({}, defs, opts)
  let e
  if ('composed' in CustomEvent.prototype) {
    e = new CustomEvent(name, eventOptions)
  } else {
    e = document.createEvent('CustomEvent')
    e.initCustomEvent(
      name,
      eventOptions.bubbles,
      eventOptions.cancelable,
      eventOptions.detail
    )
    Object.defineProperty(e, 'composed', { value: eventOptions.composed })
  }
  return elem.dispatchEvent(e)
}
