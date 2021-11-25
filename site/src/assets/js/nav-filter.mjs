import { createCustomElement, use } from './lib/ficus.mjs'
import { html, renderer } from './lib/uhtml.mjs'
import { module as formModule } from './lib/form.mjs'
import { module as inputModule } from './lib/form-input.mjs'
use(formModule, { renderer, html })
use(inputModule, { renderer, html })

function debounce (fn, time) {
  let timeout

  return function () {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

createCustomElement('nav-filter', {
  renderer,
  filter (e) {
    this.filterDebounced(e.detail.value)
  },
  filterNavigation (query) {
    const navItemsToFilter = Array.from(document.querySelectorAll('.doc__nav-item'))
    for (const item of navItemsToFilter) {
      let value = item.innerText.toLowerCase()
      let foundMatch = false
      if (query) {
        foundMatch = value.includes(query.toLowerCase())
        item.parentNode.style.display = foundMatch ? 'block' : 'none'
      } else {
        item.parentNode.style.display = 'block'
      }
    }
    const navs = Array.from(document.querySelectorAll('.fc-nav'))
    for (const nav of navs) {
      const heading = nav.previousElementSibling
      const navItems = Array.from(nav.querySelectorAll('.fc-nav__list li'))
      const hiddenNavItems = navItems.filter(x => x.style.display === 'none')
      heading.style.display = navItems.length === hiddenNavItems.length ? 'none' : 'block'
    }
  },
  mounted () {
    this.filterDebounced = debounce(query => {
      this.filterNavigation(query)
    }, 300)
  },
  render () {
    return html`
      <style>
        nav-filter {
          display: block;
          margin-bottom: var(--spacing-07);
        }

        nav-filter .fc-input-wrapper input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="submit"]) {
          padding: var(--spacing-03);
        }
      </style>
      <div class="fu-spacing-mt-07 fu-spacing-ml-03 fu-spacing-mr-03 fu-spacing-mb-03 fu-lg-spacing-mt-00 fu-lg-spacing-ml-07 fu-lg-spacing-mr-07">
        <fc-form oninput="${this.filter}">
          <fc-form-input type="search" name="query" placeholder="Filter"></fc-form-input>
        </fc-form>
      </div>
    `
  }
})
