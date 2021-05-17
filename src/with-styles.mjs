export function withStyles (options) {
  return {
    ...options,
    created () {
      if (options.styles && typeof options.styles === 'function') {
        globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
        globalThis.__ficusjs__.styles = globalThis.__ficusjs__.styles || {}
        this._injectStyles(options.styles())
      }
      if (options.created) options.created.call(this)
    },
    _injectStyles (styleItems) {
      if (globalThis.__ficusjs__ && globalThis.__ficusjs__.styles && globalThis.__ficusjs__.styles[this.componentTagName]) return

      if ((Array.isArray(styleItems) && styleItems.filter(x => typeof x !== 'string').length) || (!Array.isArray(styleItems) && typeof styleItems !== 'string')) {
        // if this IS an array and any of the elements are NOT a string -> Error
        // if this is NOT an array and also NOT a string -> Error
        console.error('Dude, styles must return a string or an array of strings!')
        return
      }

      let cssToImport = ''
      // styles may be an array
      if (Array.isArray(styleItems)) {
        Promise.all(styleItems.map(item => this._processStyle(item)))
          .then(allCss => {
            cssToImport = allCss.filter(css => css).join('\n')
            this._createAndInjectStylesheet(cssToImport, { 'data-tag': this.componentTagName })
          })
      } else {
        this._processStyle(styleItems)
          .then(cssToImport => this._createAndInjectStylesheet(cssToImport, { 'data-tag': this.componentTagName }))
      }
    },
    _processStyle (item) {
      // if this is an http(s)://**/*.css url, create link element and inject into header
      const linkRegex = /http[s]?:\/\/.+\.css$/
      if (linkRegex.test(item)) {
        const linkElem = document.createElement('link')
        linkElem.rel = 'stylesheet'
        linkElem.type = 'text/css'
        linkElem.href = item
        document.head.appendChild(linkElem)
        return Promise.resolve()
      }

      // if this is a local file, read it and return the contents
      const fileRegex = /.+\.css$/
      if (fileRegex.test(item)) {
        return globalThis.fetch(item).then(css => css.text())
      }

      // otherwise this is (hopefully) raw css so return it
      return Promise.resolve(item)
    },
    _createAndInjectStylesheet (cssText, attributes) {
      const style = this._createStyle(cssText)
      this._setElementAttributes(style, attributes)
      document.head.appendChild(style)
      globalThis.__ficusjs__.styles[this.componentTagName] = { loaded: true, style }
    },
    _createStyle (cssText) {
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(cssText))
      return style
    },
    _setElementAttributes (element, attributes) {
      if (attributes) {
        Object.keys(attributes).forEach(k => {
          element.setAttribute(k, attributes[k])
        })
      }
    }
  }
}
