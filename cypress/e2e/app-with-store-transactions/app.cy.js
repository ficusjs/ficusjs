/* global describe cy before it  */
describe('App store transactions', () => {
  const fiveClicks = () => {
    const genArr = Array.from({ length: 5 }, (v, k) => k + 1)
    cy.wrap(genArr).each((index) => {
      cy.get('rollback-button').click()
    })
  }

  before(() => {
    cy.visit('app-with-store-transactions')
  })

  it('has an rollback button', () => {
    cy.get('rollback-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('display-button')
      .should('have.text', 'You have clicked 0 times! 0 * 10 = 0, 0 * 20 = 0')
  })

  describe('incrementing', () => {
    before(fiveClicks)

    it('increments the output count to 5', () => {
      cy.get('display-button')
        .should('have.text', 'You have clicked 5 times! 5 * 10 = 50, 5 * 20 = 100')
    })

    describe('increment again with rollback', () => {
      before(fiveClicks)

      it('keeps the output count to 5 due to rollback', () => {
        cy.get('display-button')
          .should('have.text', 'You have clicked 5 times! 5 * 10 = 50, 5 * 20 = 100')
      })
    })
  })
})
