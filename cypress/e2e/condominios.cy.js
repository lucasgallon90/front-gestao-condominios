import { condominios } from "../../src/__mocks__/condominios";
import { v4 as uuid } from "uuid";
const condominio = condominios[0];
const condominioUpdate = condominios[1];

describe("Condomínios", () => {
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

  it("Listar condominios", () => {
    cy.visit("/condominios");
  });

  it("Criar condominio", () => {
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=nome]").clear().type(condominio.nome);
        cy.get("input[name=endereco]").clear().type(condominio.endereco);
        cy.get("input[name=cidade]").clear().type(condominio.cidade);
        cy.get("input[name=uf]").clear().type(condominio.uf);
        cy.get("input[name=cep]").clear().type(condominio.cep);
        cy.get("input[name=codigoCondominio]").clear().type(uuid().substring(0, 5));
        cy.get("button[name=save").click();
        cy.url().should("equal", `${Cypress.env("front_url")}condominios`);
      });
  });

  it("Atualizar condominio", () => {
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=nome]").clear().type(condominioUpdate.nome);
        cy.get("input[name=endereco]").clear().type(condominioUpdate.endereco);
        cy.get("input[name=cidade]").clear().type(condominioUpdate.cidade);
        cy.get("input[name=uf]").clear().type(condominioUpdate.uf);
        cy.get("input[name=cep]").clear().type(condominioUpdate.cep);
        cy.get("input[name=codigoCondominio]").clear().type(uuid().substring(0, 5));
        cy.get("button[name=save").click();
        cy.url().should("equal", `${Cypress.env("front_url")}condominios`);
      });
  });

  it("Excluir condominio", () => {
    cy.get(`[aria-label="delete"]`)
      .last()
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar condominios", () => {
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("condominios.pdf");
      });
  });
});
