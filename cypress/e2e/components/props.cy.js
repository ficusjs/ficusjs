/* global describe cy before it */
/* eslint-disable no-unused-expressions */
describe('Props component', () => {
  before(() => {
    cy.visit('components')
  })

  it('component with display-string prop is rendered', () => {
    cy.get('mock-props span:nth-of-type(1)')
      .should('have.text', 'Props component with displayString prop of the holy grail')
  })

  it('component with config prop is rendered', () => {
    cy.get('mock-props span:nth-of-type(2)')
      .should('have.text', 'Props component with config prop of ')
  })

  it('component with default prop value is rendered', () => {
    cy.get('mock-props-default:nth-of-type(1)')
      .should('have.text', 'Props component with default of the pink panther')
  })

  it('component with default prop value and empty prop is rendered', () => {
    cy.get('mock-props-default:nth-of-type(2)')
      .should('have.text', 'Props component with default of the pink panther')
  })

  it('component with default number prop value and empty prop is rendered', () => {
    cy.get('mock-props-default-number:nth-of-type(1)')
      .should('have.text', 'Props component with default number of 0')
  })

  it('component with default number prop value and passed prop is rendered', () => {
    cy.get('mock-props-default-number:nth-of-type(2)')
      .should('have.text', 'Props component with default number of 1.6')
  })

  it('component with default boolean prop value and empty prop is rendered', () => {
    cy.get('mock-props-default-boolean-true:nth-of-type(1)')
      .should('have.text', 'Props component with default boolean of true')
  })

  it('component with default boolean prop value and passed prop is rendered', () => {
    cy.get('mock-props-default-boolean-true:nth-of-type(2)')
      .should('have.text', 'Props component with default boolean of false')
  })

  it('component with default object prop value and empty prop is rendered', () => {
    cy.get('mock-props-default-object:nth-of-type(1)')
      .should('have.text', 'Props component with default object of {"color":"warning"}')
  })

  it('component with default object prop value and passed prop is rendered', () => {
    cy.get('mock-props-default-object:nth-of-type(2)')
      .should('have.text', 'Props component with default object of {"color":"danger"}')
  })

  it('observed prop is rendered', () => {
    cy.get('mock-props-observed')
      .should('have.text', 'Props component with observed prop of the holy grail')
  })

  describe('change observed prop', () => {
    before(() => {
      cy.get('#change-observed-prop').click()
    })

    it('observed prop is changed', () => {
      cy.get('mock-props-observed')
        .should('have.text', 'Props component with observed prop of the last crusade')
    })
  })

  describe('change not observed prop', () => {
    before(() => {
      cy.get('#change-not-observed-prop').click()
    })

    it('observed prop is unchanged', () => {
      cy.get('mock-props-not-observed')
        .should('have.text', 'Props component with observed prop of the holy grail')
    })
  })

  describe('string property binding', () => {
    before(() => {
      cy.get('mock-props-multiple')
        .invoke('prop', 'myString', 'My orange')
    })

    it('observed prop is changed', () => {
      cy.get('#my-string-prop')
        .should('have.text', 'My orange')
    })
  })

  describe('object property binding', () => {
    before(() => {
      cy.get('mock-props-multiple')
        .invoke('prop', 'myObject', { a: 'test', b: 'test2' })
    })

    it('observed prop is changed', () => {
      cy.get('#my-object-prop')
        .should('have.text', '{"a":"test","b":"test2"}')
    })
  })
})
