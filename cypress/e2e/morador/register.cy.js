import { moradores } from "../../../src/__mocks__/moradores";
describe("Registro", () => {
  const morador = moradores[0];
  it("Registrar-se em um condomínio", () => {
    cy.visit("/register");
    cy.get("input[name=codigoCondominio]").clear().type(morador.codigoCondominio);
    cy.get("input[name=nome]").clear().type(morador.nome);
    cy.get("input[name=apto]").clear().type(morador.apto);
    cy.get("input[name=email]").clear().type(morador.email);
    cy.get("input[name=senha]").clear().type(morador.senha);
    cy.get("input[name=confirmacaoSenha]").clear().type(`${morador.senha}{enter}`);
    cy.url().should("include", "/");
  });
});
