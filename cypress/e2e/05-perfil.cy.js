import { usuarios } from "../../src/__mocks__/usuarios";
const usuarioUpdate = usuarios[1];

describe("Perfil", () => {
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

  it("Atualizar perfil", () => {
    cy.visit("/perfil");
    cy.get("input[name=nome]").clear().type(usuarioUpdate.nome);
    cy.get("input[name=apto]").clear().type(usuarioUpdate.apto);
    cy.get("input[name=bloco]").clear().type(usuarioUpdate.bloco);
    cy.get("input[name=email]").clear().type(usuarioUpdate.email);
    cy.get("input[name=telefone]").clear().type(usuarioUpdate.telefone);
    cy.get("button[name=save")
      .click()
      .then(() => {
        cy.url().should("equal", `${Cypress.env("front_url")}`);
      });
  });

  it("Alterar senha", () => {
    cy.visit("/perfil").then(() => {
      cy.get("input[name=password]").clear().type(usuarioUpdate.senha);
      cy.get("input[name=confirm]").clear().type(usuarioUpdate.senha);
      cy.get("button[name=update-password")
        .click()
        .then(() => {
          cy.url().should('include', '/');
        });
    });
  });
});
