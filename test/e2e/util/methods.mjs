export function navigateTo (e, router) {
  let target = e.target
  const path = target.dataset.href
  router.push(path)

  const currentPath = router.location.pathname + router.location.search

  const navItems = [...document.querySelectorAll('nav button')]
  navItems.forEach(b => {
    b.classList.remove('active')
    if (currentPath === b.dataset.href) b.classList.add('active')
  })
}
