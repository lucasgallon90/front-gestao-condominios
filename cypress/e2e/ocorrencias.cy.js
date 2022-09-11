import { ocorrencias } from "../../src/__mocks__/ocorrencias";
const ocorrencia = ocorrencias[0];
const ocorrenciaUpdate = ocorrencias[1];

describe("Ocorrências", () => {
  before(() => {
    cy.postTokenMorador();
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

  it("Listar ocorrências", () => {
    cy.visit("/ocorrencias");
  });

  it("Criar ocorrência", () => {
    cy.visit("/ocorrencias");
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=motivo]").clear().type(ocorrencia.motivo);
        cy.get("textarea[name=descricao]").clear().type(ocorrencia.descricao);
        cy.get("form").submit();
        cy.url().should('equal', `${Cypress.env('front_url')}ocorrencias`);
      });
  });

  it("Atualizar ocorrência", () => {
    cy.visit("/ocorrencias");
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=motivo]").clear().type(ocorrenciaUpdate.motivo);
        cy.get("textarea[name=descricao]").clear().type(ocorrenciaUpdate.descricao);
        cy.get("form").submit();
        cy.url().should('equal', `${Cypress.env('front_url')}ocorrencias`);
      });
  });

  it("Excluir ocorrência", () => {
    cy.visit("/ocorrencias");
    cy.get(`[aria-label="delete"]`)
      .first()
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar ocorrências", () => {
    cy.visit("/ocorrencias");
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("ocorrencias.pdf");
      });
  });
});
