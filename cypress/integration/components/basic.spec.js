/* global describe cy before it  */
describe('Basic component', () => {
  before(() => {
    cy.visit('components')
  })

  it('is rendered', () => {
    cy.get('mock-basic')
      .should('have.text', 'Basic component')
  })
})
