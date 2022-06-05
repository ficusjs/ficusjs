/* global describe cy before it  */
describe('Slots component', () => {
  before(() => {
    cy.visit('components')
  })

  it('default slot is rendered', () => {
    cy.get('mock-slots')
      .should('have.text', 'Slots component with default slot of Marty McFly')
  })

  it('named slots are rendered', () => {
    cy.get('mock-slot-named')
      .should('have.text', 'Slots component with named slots of Marty McFly and Doc Brown')
  })
})
