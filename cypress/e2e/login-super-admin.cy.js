import { usuarios } from "../../src/__mocks__/usuarios";
describe("Login", () => {
  const usuario = usuarios[0];
  it("Realizar Login - super admin", () => {
    cy.visit("/login");
    cy.get("input[name=email]").clear().type(usuario.email);
    cy.get("input[name=senha]").clear().type(`${usuario.senha}{enter}`);
    cy.url().should('include', '/')
  });
});
