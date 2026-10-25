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

  it('integrates the blog and preserves access to the Medium archive', () => {
    cy.get('nav[aria-label="Main navigation"]').contains('Blog').click()
    cy.get('h1').should('contain', 'The Toit blog')
    cy.get('a[href="https://blog.toit.io/"]').should('contain', 'archive')
    cy.get('link[rel="alternate"][type="application/rss+xml"]').should(
      'have.attr',
      'href',
      '/blog/feed.xml'
    )
    cy.request('/blog/feed.xml').its('body').should('contain', '<rss version="2.0"')
    cy.request({ url: '/blog/example-post/', failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
    cy.request({ url: '/blog/unknown-post/', failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
    cy.viewport(375, 812)
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(375)
    })
    if (Cypress.env('screenshots')) cy.screenshot('blog-mobile', { capture: 'fullPage' })
  })

  it('renders published articles with readable desktop and mobile layouts', () => {
    cy.request('/blog/posts.json').then(({ body }) => {
      if (!body.posts.length) {
        cy.visit('/blog/')
        cy.contains('h2', 'More to come.').should('be.visible')
        return
      }
      for (const post of body.posts.slice(0, 3)) {
        cy.viewport(1440, 1000)
        cy.visit(`/blog/${post.slug}/`)
        cy.get('h1').should('have.text', post.title)
        cy.get('.blog-byline').should('contain', post.author)
        cy.get('.blog-body').should('not.be.empty')
        cy.get('meta[property="og:type"]').should('have.attr', 'content', 'article')
        cy.get('.blog-post-header img').should('not.exist')
        cy.get('.blog-body').then(($body) => {
          $body.find('img[src^="/blog/"]').each((_, image) => {
            cy.wrap(image).scrollIntoView().should('be.visible')
            cy.wrap(image).should(() => {
              expect((image as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
            })
          })
        })
        if (Cypress.env('screenshots')) {
          cy.screenshot(`blog-${post.slug}-desktop`, { capture: 'fullPage' })
        }
        cy.viewport(375, 812)
        cy.document().then((document) => {
          expect(document.documentElement.scrollWidth).to.be.at.most(375)
        })
        if (Cypress.env('screenshots')) {
          cy.screenshot(`blog-${post.slug}-mobile`, { capture: 'fullPage' })
        }
      }
    })
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
