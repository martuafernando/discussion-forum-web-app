/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
        .contains(/^Sign In$/)
        .should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button')
        .contains(/^Sign In$/)
        .click();

    cy.get('div')
        .contains(/^"email" is not allowed to be empty$/)
        .should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]')
        .type('testing@email.com');

    cy.get('button')
        .contains(/^Sign In$/)
        .click();

    cy.get('div')
        .contains(/^"password" is not allowed to be empty$/)
        .should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]')
        .type('testing@testing.com');

    cy.get('input[placeholder="Password"]')
        .type('testing');

    cy.get('button')
        .contains(/^Sign In$/)
        .click();

    cy.get('div')
        .contains(/^email or password is wrong$/)
        .should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]')
        .type('testing@email.com');

    cy.get('input[placeholder="Password"]')
        .type('testing');

    cy.get('button')
        .contains(/^Sign In$/)
        .click();

    cy.get('nav')
        .contains(/^Logout$/)
        .should('be.visible');
  });
});
