/// <reference types="cypress" />

describe('the consolidated website', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('offers scripting and embedded paths with runnable examples', () => {
    cy.contains('a.path', 'On your computer').click()
    cy.get('h1').should('contain', 'everyday tools')
    cy.get('.terminal').should('contain', 'Hello, Ada!')
    if (Cypress.env('screenshots')) cy.screenshot('scripting-desktop', { capture: 'fullPage' })
    cy.get('nav[aria-label="Main navigation"]').contains('Embedded').click()
    cy.get('#containers').should('contain', 'keep the others running')
    cy.get('.example').should('contain', 'button.wait-for')
    if (Cypress.env('screenshots')) cy.screenshot('embedded-desktop', { capture: 'fullPage' })
  })

  it('links the latest release to rendered release notes', () => {
    cy.get('.latest-release h2 a').click()
    cy.get('h1').should('contain', 'Release notes')
    cy.get('.release .markdown').should('exist')
  })

  it('keeps the page within the viewport on mobile', () => {
    cy.viewport(375, 812)
    cy.get('a.path').should('have.length', 2)
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(375)
    })
    if (Cypress.env('screenshots')) cy.screenshot('home-mobile', { capture: 'fullPage' })
    cy.contains('a.path', 'On an ESP32').click()
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(375)
    })
  })

  it('shows the desktop overview', () => {
    cy.viewport(1440, 1000)
    cy.get('.paths').should('be.visible')
    cy.document().its('characterSet').should('eq', 'UTF-8')
    if (Cypress.env('screenshots')) cy.screenshot('home-desktop', { capture: 'fullPage' })
  })

  it('preserves the authentication callback without displaying its token', () => {
    cy.visit('/auth/#access_token=example-token&type=signup')
    cy.get('h1').should('contain', 'Authentication successful')
    cy.get('body').should('not.contain', 'example-token')
    cy.location('hash').should('eq', '')
    cy.visit('/auth/#error=denied&error_description=Please+try+again')
    cy.get('#status').should('contain', 'Please try again')
    cy.request({ url: '/this-page-does-not-exist', failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
  })
})
