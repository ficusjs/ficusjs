/* global describe cy before it  */
describe('Component extension builder', () => {
  before(() => {
    cy.visit('component-extension-builder')
  })

  /* events */
  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', 'You have clicked 0 times!')
  })

  function publishing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('publish-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        cy.get('subscribe-button')
          .should('have.text', `You have clicked ${expecting} time${expecting === 1 ? '' : 's'}!`)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => publishing(e))

  /* store */
  it('has an increment button', () => {
    cy.get('increment-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('display-button')
      .should('have.text', 'You have clicked 0 times! 0 * 10 = 0, 0 * 20 = 0')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('increment-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        cy.get('display-button')
          .should('have.text', `You have clicked ${expecting} time${expecting === 1 ? '' : 's'}! ${expecting} * 10 = ${expecting * 10}, ${expecting} * 20 = ${expecting * 20}`)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))

  describe('clear', () => {
    before(() => {
      cy.get('clear-button button').click()
    })

    it('resets the output count to 0', () => {
      cy.get('display-button')
        .should('have.text', 'You have clicked 0 times! 0 * 10 = 0, 0 * 20 = 0')
    })
  })
})
