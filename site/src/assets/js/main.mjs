import { use } from './lib/ficus.mjs'
import { html, renderer } from './lib/uhtml.mjs'
import { module as navbarModule } from './lib/navbar.mjs'
import { module as dropdownModule } from './lib/dropdown.mjs'
import './fonts.mjs'
import './sidebar-details.mjs'
import './theme.mjs'
import './adaptive-tables.mjs'
import './nav-filter.mjs'
use(navbarModule, { renderer, html })
use(dropdownModule, { renderer, html })
