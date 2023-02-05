import { createCustomElement, withXStateService, html, renderer } from '../util/ficus.mjs'
import { createDataFetchExample } from './components/data-fetch-example.mjs'
import { createDataFetchStateVisualization } from './components/data-fetch-state-visualization.mjs'
import { createFormSubmissionStateVisualization } from './components/form-submission-state-visualization.mjs'
import { createFormSubmissionExample } from './components/form-submission-example.mjs'
import { createContainerWrapper } from './components/container.mjs'

createDataFetchExample({ createCustomElement, html, renderer, withXStateService })
createDataFetchStateVisualization({ createCustomElement, html, renderer, withXStateService })
createFormSubmissionStateVisualization({ createCustomElement, html, renderer })
createFormSubmissionExample({ createCustomElement, html, renderer })
createContainerWrapper({ createCustomElement, html, renderer })