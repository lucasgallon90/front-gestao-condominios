import { moradores } from "../../src/__mocks__/moradores";
const moradorUpdate = moradores[1];

describe("Moradores", () => {
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

  it("Listar moradores", () => {
    cy.visit("/moradores");
  });

  it("Atualizar morador", () => {
    cy.get(`[aria-label="edit"]`)
      .first()
      .click()
      .then(() => {
        cy.get("input[name=apto]").clear().type(moradorUpdate.apto);
        cy.get("input[name=bloco]").clear().type(moradorUpdate.bloco);
        cy.get("button[name=save").click();
        cy.url().should("equal", `${Cypress.env("front_url")}moradores`);
      });
  });

  it("Excluir morador", () => {
    cy.contains("novomorador1@gestaodecondominios.com.br")
      .parents("tr")
      .find("button")
      .eq(1)
      .click()
      .then(() => {
        cy.contains("Deletar").click();
      });
  });

  it("Exportar moradores", () => {
    cy.get(`#exportar`)
      .click()
      .then(() => {
        cy.verifyDownload("moradores.pdf");
      });
  });
});
