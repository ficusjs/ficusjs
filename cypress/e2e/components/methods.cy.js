/* global describe cy before it expect */
/* eslint-disable no-unused-expressions */
describe('Methods component', () => {
  const spies = {
    clicked: null
  }

  before(() => {
    spies.clicked = cy.spy()
    cy.visit('components')
    cy.document().then((doc) => {
      doc.addEventListener('click', () => spies.clicked())
    })
  })

  it('is rendered', () => {
    cy.get('mock-methods')
      .should('have.text', 'Methods component that formats the name Dr Indiana Jones')
  })

  describe('emit based on an action', () => {
    before(() => {
      cy.get('mock-method-event button').click()
    })

    it('should emit the clicked event', () => {
      expect(spies.clicked).to.be.called
    })

    it('should emit the has-clicked event', () => {
      cy.get('#event-emit-message').should('be.visible')
    })
  })
})
