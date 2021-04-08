import { use } from 'https://cdn.skypack.dev/ficusjs@3'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { module as navbarModule } from 'https://cdn.skypack.dev/@ficusjs/components/custom-elements/navbar'
import { module as dropdownModule } from 'https://cdn.skypack.dev/@ficusjs/components/custom-elements/dropdown'
use(navbarModule, { renderer, html })
use(dropdownModule, { renderer, html })
