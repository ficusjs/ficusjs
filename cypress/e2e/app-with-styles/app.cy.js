/* global describe cy before it expect  */
describe('App with styles', () => {
  before(() => {
    cy.visit('app-with-styles')
  })

  describe('single style', () => {
    it('has a message element', () => {
      cy.get('single-style .message')
        .should('exist')
    })

    it('has custom styles', () => {
      cy.get('single-style .message')
        .then($el => {
          const win = $el[0].ownerDocument.defaultView
          const styles = win.getComputedStyle($el[0])
          const bgColorValue = styles.getPropertyValue('background-color')
          const colorValue = styles.getPropertyValue('color')
          expect(bgColorValue).to.eq('rgb(0, 128, 0)')
          expect(colorValue).to.eq('rgb(255, 255, 255)')
        })
    })

    it('has head styles', () => {
      cy.get('head > style[data-tag="single-style"]')
        .should('have.length', 1)
    })
  })

  describe('single link', () => {
    it('has a message element', () => {
      cy.get('single-link .message')
        .should('exist')
    })

    it('has custom styles', () => {
      cy.get('single-link .message')
        .then($el => {
          const win = $el[0].ownerDocument.defaultView
          const styles = win.getComputedStyle($el[0])
          const bgColorValue = styles.getPropertyValue('background-color')
          const colorValue = styles.getPropertyValue('color')
          expect(bgColorValue).to.eq('rgb(255, 69, 0)')
          expect(colorValue).to.eq('rgb(255, 255, 255)')
        })
    })

    it('has head styles', () => {
      cy.get('head > link[data-tag="single-link"]')
        .should('have.length', 1)
    })
  })

  describe('multiple styles', () => {
    it('has a message element', () => {
      cy.get('multiple-styles .message')
        .should('exist')
    })

    it('has custom styles', () => {
      cy.get('multiple-styles .message')
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
      cy.get('head > style[data-tag="multiple-styles"]')
        .should('have.length', 1)
    })
  })
})
