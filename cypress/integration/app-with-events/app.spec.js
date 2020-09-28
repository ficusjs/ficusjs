/* global describe cy before it  */
describe('App events', () => {
  before(() => {
    cy.visit('app-with-events')
  })

  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', 'You have clicked 0 times!')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('publish-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        cy.get('subscribe-button')
          .should('have.text', `You have clicked ${expecting} times!`)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))
})
