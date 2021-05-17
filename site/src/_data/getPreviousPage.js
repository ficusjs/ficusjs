const nav = require('./nav')

module.exports = function () {
  return function (page) {
    let prevPage = null
    for (const navKey in nav) {
      const items = nav[navKey]
      const navItemIndex = items.findIndex(x => x.url === page.url)
      if (navItemIndex > -1) {
        const prevIndex = navItemIndex - 1
        if (prevIndex === -1) {
          const navKeys = Object.keys(nav)
          const navKeyIndex = navKeys.findIndex(x => x === navKey)
          if (navKeyIndex > -1) {
            const prevNavKeyIndex = navKeyIndex - 1
            if (prevNavKeyIndex > -1) {
              const prevItems = nav[navKeys[prevNavKeyIndex]]
              const prevItem = prevItems[prevItems.length - 1]
              prevPage = {
                title: prevItem.title,
                url: prevItem.url
              }
            }
          }
        } else if (prevIndex > -1) {
          const prevItem = items[prevIndex]
          prevPage = {
            title: prevItem.title,
            url: prevItem.url
          }
        }
      }
    }
    return prevPage
  }
}
