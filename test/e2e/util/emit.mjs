/* global Event */
export function emit (eventName) {
  console.log(`emitting event on document: ${eventName}`)
  const event = new Event(eventName)
  document.dispatchEvent(event)
}
