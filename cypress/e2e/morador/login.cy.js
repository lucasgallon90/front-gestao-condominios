import { moradores } from "../../../src/__mocks__/moradores";
describe("Login", () => {
  const morador = moradores[0];
  it("Realizar Login", () => {
    cy.visit("/login");
    cy.get("input[name=email]").clear().type(morador.email);
    cy.get("input[name=senha]").clear().type(`${morador.senha}{enter}`);
    cy.url().should('include', '/')
  });
});
