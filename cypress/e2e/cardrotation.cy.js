describe('Card Showcase', () => {

  it('records the animation', () => {

    cy.viewport(1080, 1920);

    cy.visit('/cardrotation.html');

    cy.wait(10000);

  });

});