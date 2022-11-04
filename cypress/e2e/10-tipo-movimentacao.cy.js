import { tiposMovimentacao } from "../../src/__mocks__/tiposMovimentacao";
const tipoMovimentacao = tiposMovimentacao[0];
const tipoMovimentacaoUpdate = tiposMovimentacao[1];

describe("Tipos de movimentação", () => {
  before(() => {
    cy.postTokenAdmin();
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

  it("Listar tipos de movimentação", () => {
    cy.visit("/tipos-movimentacao");
  });

  it("Criar tipo de movimentação", () => {
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=descricao]").clear().type(tipoMovimentacao.descricao);
        cy.get("select[name=tipo]").select(tipoMovimentacao.tipo);
        cy.get("form").submit();
        cy.url().should("equal", `${Cypress.env("front_url")}tipos-movimentacao`);
      });
  });

  it("Atualizar tipo de movimentação", () => {
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=descricao]").clear().type(tipoMovimentacaoUpdate.descricao);
        cy.get("select[name=tipo]").select(tipoMovimentacaoUpdate.tipo);
        cy.get("form").submit();
        cy.url().should("equal", `${Cypress.env("front_url")}tipos-movimentacao`);
      });
  });

  it("Excluir tipo de movimentação", () => {
    cy.get(`[aria-label="delete"]`)
      .last()
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar tipo de movimentaçãos", () => {
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("tipos-movimentacao.pdf");
      });
  });
});
