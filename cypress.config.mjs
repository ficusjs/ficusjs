import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/ci-test-output-[hash].xml',
    jenkinsMode: true,
    rootSuiteTitle: 'FicusJS Integration Tests',
    testsuitesTitle: 'Cypress Tests'
  },
  e2e: {
    testIsolation: false
  }
})
