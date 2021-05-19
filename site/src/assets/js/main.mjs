import { use } from 'https://cdn.skypack.dev/ficusjs@3'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { module as navbarModule } from 'https://cdn.skypack.dev/@ficusjs/components/custom-elements/navbar'
import { module as dropdownModule } from 'https://cdn.skypack.dev/@ficusjs/components/custom-elements/dropdown'
import './fonts.mjs'
import './sidebar-details.mjs'
import './theme.mjs'
import './adaptive-tables.mjs'
import './nav-filter.mjs'
use(navbarModule, { renderer, html })
use(dropdownModule, { renderer, html })
