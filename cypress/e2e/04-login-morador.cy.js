import { moradores } from "../../src/__mocks__/moradores";
describe("Login - Morador", () => {
  const morador = moradores[1];
  it("Realizar Login - morador", () => {
    cy.visit("/login");
    cy.get("input[name=email]").clear().type(morador.email);
    cy.get("input[name=senha]").clear().type(`${morador.senha}{enter}`);
    cy.url().should('include', '/')
  });
});
