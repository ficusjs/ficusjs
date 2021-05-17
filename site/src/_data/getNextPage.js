const nav = require('./nav')

module.exports = function () {
  return function (page) {
    let nextPage = null
    for (const navKey in nav) {
      const items = nav[navKey]
      const navItemIndex = items.findIndex(x => x.url === page.url)
      if (navItemIndex > -1) {
        const nextIndex = navItemIndex + 1
        if (nextIndex === items.length) {
          const navKeys = Object.keys(nav)
          const navKeyIndex = navKeys.findIndex(x => x === navKey)
          if (navKeyIndex > -1) {
            const nextNavKeyIndex = navKeyIndex + 1
            if (nextNavKeyIndex < navKeys.length) {
              const nextItem = nav[navKeys[nextNavKeyIndex]][0]
              nextPage = {
                title: nextItem.title,
                url: nextItem.url
              }
            }
          }
        } else if (nextIndex < items.length) {
          const nextItem = items[nextIndex]
          nextPage = {
            title: nextItem.title,
            url: nextItem.url
          }
        }
      }
    }
    if (!nextPage) {
      const navKeys = Object.keys(nav)
      const nextItem = nav[navKeys[0]][0]
      nextPage = {
        title: nextItem.title,
        url: nextItem.url
      }
    }
    return nextPage
  }
}
