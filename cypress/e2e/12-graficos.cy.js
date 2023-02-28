import { cobrancas } from "../../src/__mocks__/cobrancas";
const cobranca = cobrancas[0];
const cobrancaUpdate = cobrancas[1];

describe("Gráficos", () => {
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

  it("Acessar a página para gerar gráficos", () => {
    cy.visit("/graficos");
  });

  it("Gerar gráfico de barras de fluxo de caixa", () => {
    
        cy.get("button[name=gerar]")
          .click()
          .then(() => {
            cy.get("form").submit();
            cy.url().should("contain", `${Cypress.env("front_url")}graficos/view`);
          });
      });
});
