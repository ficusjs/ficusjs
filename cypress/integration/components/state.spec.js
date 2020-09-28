/* global expect describe cy before it */
/* eslint-disable no-unused-expressions */
describe('State component', () => {
  before(() => {
    cy.visit('components')
  })

  describe('three instances of the same state components', () => {
    it('three components with state are rendered', () => {
      cy.get('mock-state')
        .should('have.length', 3)
    })

    it('each state component has a zero value', () => {
      cy.get('mock-state')
        .each($el => {
          expect($el.text()).to.contain('0')
        })
    })

    describe('click the first component', () => {
      before(() => {
        cy.get('mock-state:nth-of-type(1) button').click()
      })

      it('the first component should have a value of 1 and each remaining state component have zero values', () => {
        cy.get('mock-state')
          .each(($el, index) => {
            if (index === 0) {
              expect($el.text()).to.contain('1')
            } else {
              expect($el.text()).to.contain('0')
            }
          })
      })
    })

    describe('click the second component', () => {
      before(() => {
        cy.get('mock-state:nth-of-type(2) button').click()
      })

      it('the first and second components should have a value of 1 and the remaining state component have zero value', () => {
        cy.get('mock-state')
          .each(($el, index) => {
            if (index === 0 || index === 1) {
              expect($el.text()).to.contain('1')
            } else {
              expect($el.text()).to.contain('0')
            }
          })
      })
    })

    describe('click the third component', () => {
      before(() => {
        cy.get('mock-state:nth-of-type(3) button').click()
      })

      it('all components should have a value of 1', () => {
        cy.get('mock-state')
          .each(($el) => {
            expect($el.text()).to.contain('1')
          })
      })
    })

    describe('click the first component again', () => {
      before(() => {
        cy.get('mock-state:nth-of-type(1) button').click()
      })

      it('the first component should have a value of 2 and each remaining state component has a value of 1', () => {
        cy.get('mock-state')
          .each(($el, index) => {
            if (index === 0) {
              expect($el.text()).to.contain('2')
            } else {
              expect($el.text()).to.contain('1')
            }
          })
      })
    })
  })

  describe('setting state from props', () => {
    it('should use default prop value', () => {
      cy.get('mock-prop-state:nth-of-type(1)')
        .should('contain.text', 'Default dummy')
    })

    it('should use the prop value passed to the component', () => {
      cy.get('mock-prop-state:nth-of-type(2)')
        .should('contain.text', 'Dumb dumb')
    })
  })
})
