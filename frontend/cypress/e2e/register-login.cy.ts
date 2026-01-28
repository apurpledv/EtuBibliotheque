describe('Register & Login', () => {
  it('should register a user and navigate to the login page; attempts to login with the new user info', () => {
    cy.visit('localhost:4200/register');

    cy.get('input[name=firstName]').type('brandNewUser');
    cy.get('input[name=lastName]').type('brandNewUser');
    cy.get('input[name=login]').type('brandNewUser');
    cy.get('input[name=password]').type('brandNewUser');
    cy.get('button').first().click();

    cy.on('window:alert', () => true);
    
    cy.url().should('include', '/login');

    cy.get('input[name=login]').type('brandNewUser');
    cy.get('input[name=password]').type('brandNewUser');
    cy.get('button').first().click();

    cy.url().should('include', '/student-list');
  });

  it('should attempt to login with wrong data => stays on the login page', () => {
    cy.visit('localhost:4200/login');

    cy.get('input[name=login]').type('123456789NANNOTAUSER');
    cy.get('input[name=password]').type('123456789NANNOTAUSER');
    cy.get('button').first().click();

    cy.url().should('include', '/login');
  });
});