/* global describe cy before it  */
describe('App with styles', () => {
  before(() => {
    cy.visit('app-with-styles')
  })

  it('has a message element', () => {
    cy.get('.message')
      .should('exist')
  })

  it('has custom styles', () => {
    cy.get('.message')
      .then($el => {
        const win = $el[0].ownerDocument.defaultView
        const styles = win.getComputedStyle($el[0])
        const bgColorValue = styles.getPropertyValue('background-color')
        const colorValue = styles.getPropertyValue('color')
        expect(bgColorValue).to.eq('rgb(255, 255, 0)')
        expect(colorValue).to.eq('rgb(0, 0, 0)')
      })
  })

  it('has head styles', () => {
    cy.get('head > style[data-tag="mock-app-with-styles"]')
      .should('have.length', 1)
  })
})
