import { getRandomEmail } from "../../src/utils";
import { usuarios } from "../../src/__mocks__/usuarios";
const usuario = usuarios[0];
const usuarioUpdate = usuarios[1];

describe("Usuários", () => {
  before(() => {
    cy.postTokenSuperAdmin();
  });

  beforeEach(() => {
    let str = [];
    cy.getCookies().then((cook) => {
      cy.log(cook);
      for (let l = 0; l < cook.length; l++) {
        if (cook.length > 0 && l == 0) {
          str[l] = cook[l].name;
          Cypress.Cookies.preserveOnce(str[l]);
        } else if (cook.length > 1 && l > 1) {
          str[l] = cook[l].name;
          Cypress.Cookies.preserveOnce(str[l]);
        }
      }
    });
  });

  it("Listar usuários", () => {
    cy.visit("/usuarios");
  });

  it("Criar usuário", () => {
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=nome]").clear().type(usuario.nome);
        cy.get("input[name=email]").clear().type(getRandomEmail("@gestaodecondominios.com.br",15));
        cy.get("input[name=senha]").clear().type(usuario.senha);
        cy.get("input[name=confirmacaoSenha]").clear().type(usuario.senha);
        cy.get("button[name=save").click();
        cy.url().should('equal', `${Cypress.env('front_url')}usuarios`);
      });
  });

  it("Atualizar usuário", () => {
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=nome]").clear().type(usuarioUpdate.nome);
        cy.get("form").submit();
        cy.url().should('equal', `${Cypress.env('front_url')}usuarios`);
      });
  });

  it("Excluir usuário", () => {
    cy.get(`[aria-label="delete"]`)
      .last()
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar usuários", () => {
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("usuarios.pdf");
      });
  });
});
