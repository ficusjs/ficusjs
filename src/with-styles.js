export function withStyles (options) {
  return {
    ...options,
    created () {
      if (options.created) options.created.call(this)
      if (options.styles && typeof options.styles === 'function') {
        if (typeof window !== 'undefined') {
          window.__ficusjs__ = window.__ficusjs__ || {}
          window.__ficusjs__.styles = window.__ficusjs__.styles || {}
        }
        this._injectStyles(options.styles())
      }
    },
    _injectStyles (cssText) {
      if (typeof window !== 'undefined') {
        if (window.__ficusjs__ && window.__ficusjs__.styles && window.__ficusjs__.styles[this.componentTagName]) return
        const style = this._createAndInjectStylesheet(cssText, { 'data-tag': this.componentTagName })
        window.__ficusjs__.styles[this.componentTagName] = { loaded: true, style }
      }
    },
    _createAndInjectStylesheet(cssText, attributes) {
      const style = this._createStyle(cssText)
      this._setElementAttributes(style, attributes)
      document.getElementsByTagName('head')[0].appendChild(style)
      return style
    },
    _createStyle(cssText) {
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(cssText))
      return style
    },
    _setElementAttributes(element, attributes) {
      if (attributes) {
        Object.keys(attributes).forEach(k => {
          element.setAttribute(k, attributes[k])
        })
      }
    }
  }
}
