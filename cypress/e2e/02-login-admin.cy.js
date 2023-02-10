import { admin } from "../../src/__mocks__/usuario-admin";
describe("Login - Admin", () => {
  it("Realizar Login - admin", () => {
    cy.visit("/login");
    cy.get("input[name=email]").clear().type(admin.email);
    cy.get("input[name=senha]").clear().type(`${admin.senha}{enter}`);
    cy.url().should("include", "/");
  });
});

describe("Recuperar senha", () => {
  it("Recuperar a senha por email", () => {
    cy.visit("/recuperar-senha");
    cy.get("input[name=email]").clear().type(admin.email).type(`${admin.senha}{enter}`);
    cy.url().should("include", "/");
  });
});
