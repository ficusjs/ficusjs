export function renderer (what, where) {
  // remove any existing elements
  while (where.firstChild) where.removeChild(where.firstChild)

  // create a new in-memory element
  const element = document.createElement('div')
  element.innerHTML = what

  // add the element to the DOM
  where.appendChild(element)
}
