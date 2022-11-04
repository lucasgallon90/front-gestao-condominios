import { tiposLeitura } from "../../src/__mocks__/tiposLeitura";
const tipoLeitura = tiposLeitura[0];
const tipoLeituraUpdate = tiposLeitura[1];

describe("Tipos de Leitura", () => {
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

  it("Listar tipos de leitura", () => {
    cy.visit("/tipos-leitura");
  });

  it("Criar tipo de leitura", () => {
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=descricao]").clear().type(tipoLeitura.descricao);
        cy.get("input[name=unidadeMedida]").clear().type(tipoLeitura.unidadeMedida);
        cy.get("input[name=taxaFixa]").clear().type(tipoLeitura.taxaFixa);
        cy.get("input[name=valorUnidade]").clear().type(tipoLeitura.valorUnidade);
        cy.get("form").submit();
        cy.url().should('equal', `${Cypress.env('front_url')}tipos-leitura`);
      });
  });

  it("Atualizar tipo de leitura", () => {
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=descricao]").clear().type(tipoLeituraUpdate.descricao);
        cy.get("input[name=unidadeMedida]").clear().type(tipoLeituraUpdate.unidadeMedida);
        cy.get("input[name=taxaFixa]").clear().type(tipoLeituraUpdate.taxaFixa);
        cy.get("input[name=valorUnidade]").clear().type(tipoLeituraUpdate.valorUnidade);
        cy.get("form").submit();
        cy.url().should('equal', `${Cypress.env('front_url')}tipos-leitura`);
      });
  });

  it("Excluir tipo de leitura", () => {
    cy.get(`[aria-label="delete"]`)
      .last()
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar tipo de leituras", () => {
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("tipos-leitura.pdf");
      });
  });
});
