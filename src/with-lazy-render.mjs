/* global IntersectionObserver */
export function withLazyRender (options) {
  return {
    ...options,
    created () {
      if (options.created) options.created.call(this)
      this.elementVisible = false
      this.intersectionObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(e => {
            if (e.isIntersecting && !this.elementVisible) {
              this.elementVisible = true
              // remove the observer if we've reached our target of being visible
              this.intersectionObserver.disconnect()
              // call render method
              this._processRender()
            }
          })
        },
        {
          threshold: 0.1
        }
      )
      this.intersectionObserver.observe(this)
    },
    removed () {
      if (options.removed) options.removed.call(this)
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
      }
    }
  }
}
