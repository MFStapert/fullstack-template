describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8081');
    cy.get('h1').should('have.text', 'Hello world');
  });
});
