/* global describe cy before it  */
describe('Multiple stores transactions', () => {
  const fiveClicks = (num) => {
    const genArr = Array.from({ length: 5 }, (v, k) => k + 1)
    cy.wrap(genArr).each((index) => {
      cy.get(`#btn-${num}`).click()
    })
  }

  before(() => {
    cy.visit('app-with-multiple-stores-transactions')
  })

  it('has an rollback button', () => {
    cy.get('rollback-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('display-button')
      .should('exist')
  })

  function incrementing (num) {
    describe(`incrementing button ${num}`, () => {
      before(() => fiveClicks(num))

      it('increments the output count to 5', () => {
        cy.get(`#p-${num}`)
          .should('have.text', `${num}. You have clicked 5 times!`)
      })

      describe('increment again with rollback', () => {
        before(() => fiveClicks(num))

        it('keeps the output count to 5 due to rollback', () => {
          cy.get(`#p-${num}`)
            .should('have.text', `${num}. You have clicked 5 times!`)
        })
      })
    })
  }

  [1, 2, 3].forEach(e => incrementing(e))
})
