/**
 * Function to find the nearest parent element
 * @param {Node} el The starting element
 * @param {Function} tester The function to execute for each element
 * @returns {Node|null} The parent element or null if not found
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node} for <code>Node</code> reference
 */
export function findParent (el, tester) {
  if (tester(el)) {
    return el
  }

  while (el.parentNode) {
    el = el.parentNode
    if (tester(el)) {
      return el
    }
  }
  return null
}
