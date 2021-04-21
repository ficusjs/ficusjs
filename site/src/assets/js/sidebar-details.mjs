const details = document.querySelector('details[id="sidebar-nav"]')
if (details) {
  const forceOpen = window.getComputedStyle(details).getPropertyValue('--details-force-closed')

  function forceState (isOpen) {
    if (isOpen) {
      details.setAttribute('open', 'open')
    } else {
      details.removeAttribute('open')
    }
  }

  if (forceOpen && 'matchMedia' in window) {
    const mm1 = window.matchMedia(forceOpen)
    forceState(!mm1.matches)
    mm1.addListener(function (e) {
      forceState(!e.matches)
    })
  }
}
