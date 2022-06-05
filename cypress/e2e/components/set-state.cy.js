/* global expect describe cy before it */
/* eslint-disable no-unused-expressions */
describe('setState components', () => {
  const spies = {
    setStateCallback: null,
    setStateMultipleCallback: null
  }

  before(() => {
    spies.setStateCallback = cy.spy()
    spies.setStateMultipleCallback = cy.spy()
    cy.visit('components')
    cy.document().then((doc) => {
      doc.addEventListener('setStateCallback', () => spies.setStateCallback())
      doc.addEventListener('setStateMultipleCallback', () => spies.setStateMultipleCallback())
    })
  })

  describe('click mock-set-state component', () => {
    before(() => {
      cy.get('mock-set-state button').click()
    })

    it('should emit the setStateCallback event', () => {
      expect(spies.setStateCallback).to.be.called
    })

    it('the component should have a value of 1', () => {
      cy.get('mock-set-state')
        .contains('setState component with count of 1')
    })

    describe('click again', () => {
      before(() => {
        cy.get('mock-set-state button').click()
      })

      it('should emit the setStateCallback event', () => {
        expect(spies.setStateCallback).to.be.called
      })

      it('the component should have a value of 2', () => {
        cy.get('mock-set-state')
          .contains('setState component with count of 2')
      })
    })
  })

  describe('click mock-set-state-multiple component', () => {
    before(() => {
      cy.get('mock-set-state-multiple button').click()
    })

    it('should emit the setStateMultipleCallback event', () => {
      expect(spies.setStateMultipleCallback).to.be.called
    })

    it('the component should have a value of 1', () => {
      cy.get('mock-set-state-multiple')
        .contains('setState component with multiple props and count of 1')
    })

    it('the button is styled as info', () => {
      cy.get('mock-set-state-multiple button')
        .should('have.class', 'info')
    })

    describe('click again', () => {
      before(() => {
        cy.get('mock-set-state-multiple button').click()
      })

      it('should emit the setStateCallback event', () => {
        expect(spies.setStateMultipleCallback).to.be.called
      })

      it('the component should have a value of 2', () => {
        cy.get('mock-set-state-multiple')
          .contains('setState component with multiple props and count of 2')
      })

      it('the button is styled as success', () => {
        cy.get('mock-set-state-multiple button')
          .should('have.class', 'success')
      })
    })
  })
})
