import { cobrancas } from "../../src/__mocks__/cobrancas";
const cobranca = cobrancas[0];
const cobrancaUpdate = cobrancas[1];

describe("Cobranças", () => {
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

  it("Listar cobranças", () => {
    cy.visit("/cobrancas");
  });

  it("Criar tipo de cobranças", () => {
    cy.get("#add")
      .click()
      .then(() => {
        cy.get("input[name=descricao]").clear().type(cobranca.descricao);
        cy.get("input[name=valor]").clear().type(cobranca.valor);
        cy.get("input[name=morador]").click().focused().type("{downarrow}{enter}", { force: true });
        cy.get("button[name=carregarContas]")
          .click()
          .then(() => {
            cy.get("form").submit();
            cy.url().should("equal", `${Cypress.env("front_url")}cobrancas`);
          });
      });
  });

    it("Atualizar tipo de cobranças", () => {
      cy.get(`[aria-label="edit"]`)
        .first()
        .click()
        .then(() => {
            cy.get("input[name=descricao]").clear().type(cobrancaUpdate.descricao);
            cy.get("input[name=valor]").clear().type(cobrancaUpdate.valor);
            cy.get("input[name=morador]").click().focused().type("{downarrow}{enter}", { force: true });
            cy.get("button[name=carregarContas]")
              .click()
              .then(() => {
                cy.get("form").submit();
                cy.url().should("equal", `${Cypress.env("front_url")}cobrancas`);
              });
        });
    });

    it("Imprimir cobrança", () => {
      cy.get(`[aria-label="print"]`)
        .first()
        .click();
    });

    it("Enviar por email cobrança", () => {
      cy.get(`[aria-label="email"]`)
        .first()
        .click()
        .then(() => {
          cy.get(`button[id="submit-email"]`).click();
        });
    });

    it("Excluir tipo de cobranças", () => {
      cy.get(`[aria-label="delete"]`)
        .last()
        .click()
        .then(() => {
          cy.contains("Deletar").click();
        });
    });

    it("Exportar tipo de cobranças", () => {
      cy.get(`#exportar`)
        .click()
        .then(() => {
          cy.verifyDownload("cobrancas.pdf");
        });
    });
});
