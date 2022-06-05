/* global describe cy before it  */
describe('App state', () => {
  before(() => {
    cy.visit('app-with-app-state')
  })

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
          .should('have.text', `You have clicked ${expecting} times! ${expecting} * 10 = ${expecting * 10}, ${expecting} * 20 = ${expecting * 20}`)
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
