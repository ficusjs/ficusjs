/* global describe cy before it  */
describe('Persist store with ttl', () => {
  before(() => {
    cy.visit('app-with-persist-store-ttl')
  })

  it('has an increment button', () => {
    cy.get('increment-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('display-button')
      .should('have.text', 'You have clicked 0 times!')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('increment-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        cy.get('display-button')
          .should('have.text', `You have clicked ${expecting} times!`)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))

  describe('reload for persistence', () => {
    before(() => {
      cy.reload()
    })

    it('set the initial state to the last persisted state', () => {
      cy.get('display-button')
        .should('have.text', 'You have clicked 5 times!')
    })
  })

  describe('reload for persistence after ttl time', () => {
    before(() => {
      cy.wait(5000)
      cy.reload()
    })

    it('set the state to the initial state', () => {
      cy.get('display-button')
        .should('have.text', 'You have clicked 0 times!')
    })
  })
})
