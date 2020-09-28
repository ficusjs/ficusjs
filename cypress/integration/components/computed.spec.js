/* global describe cy before it  */
describe('Getters component', () => {
  before(() => {
    cy.visit('components')
  })

  it('is rendered', () => {
    cy.get('mock-computed')
      .should('have.text', 'Computed component')
  })

  it('cached is rendered', () => {
    cy.get('mock-cached-computed')
      .should('contain.text', 'Cached computed component')
  })
})
