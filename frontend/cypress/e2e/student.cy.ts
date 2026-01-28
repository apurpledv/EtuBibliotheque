import { expect } from 'chai';
import { should } from 'chai';

describe('Consult, Add, Edit and Remove a Student', () => {
    it('should add, edit and delete one Student', () => {
        const userData = 'brandNewUser2';
        const studentData = 'brandNewStudent';

        cy.on('window:alert', () => true);

        // Login & Register operation to Authenticate
        cy.visit('localhost:4200/register');

        cy.get('input[name=firstName]').type(userData);
        cy.get('input[name=lastName]').type(userData);
        cy.get('input[name=login]').type(userData);
        cy.get('input[name=password]').type(userData);
        cy.contains('button', 'Register').click();
        
        cy.url().should('include', '/login');
        cy.get('input[name=login]').type(userData);
        cy.get('input[name=password]').type(userData);
        cy.contains('button', 'Login').click();

        cy.url().should('include', '/student-list');

        // Actually interact with Students
        let studentNb = cy.get('tbody').children.length

        // add
        cy.contains('a', 'Add a Student').click();
        cy.url().should('include', '/student-add');
        cy.get('input[name=firstName]').type(studentData);
        cy.get('input[name=lastName]').type(studentData);
        cy.contains('button', 'Add').click();

        cy.url().should('include', '/student-list');

        // edit
        cy.contains('td', studentData)
            .siblings()
            .last()
            .children()
            .contains('a', 'Edit').click();
        cy.url().should('include', '/student-edit');
        cy.get('input[name=firstName]').clear().type(studentData + '-UPDATED');
        cy.get('input[name=lastName]').clear().type(studentData + '-UPDATED');
        cy.contains('button', 'Update').click();

        cy.url().should('include', '/student-list');

        // delete
        cy.contains('td', studentData + '-UPDATED')
            .siblings()
            .last()
            .children()
            .contains('button', 'Delete').click();

        cy.url().should('include', '/student-list');
    })
});