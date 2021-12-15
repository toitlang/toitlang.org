/// <reference types="cypress" />

describe('code samples', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should have functioning pagination', () => {
    cy.get('.CodeSamples .Slide-description h2').should('contain', 'Defining functions')
    cy.get('.CodeSamples .Pagination-button:nth-child(2)').click()
    cy.get('.CodeSamples .Slide-description h2').should('contain', 'Declaration and assignment')
    cy.get('.CodeSamples .Pagination-button:nth-child(1)').click()
    cy.get('.CodeSamples .Slide-description h2').should('contain', 'Defining functions')
  })
})
