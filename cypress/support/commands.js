require('cy-verify-downloads').addCustomCommand();

Cypress.Commands.add("postTokenMorador", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env('api_url')}auth/login/local`,
    body: {
      email: Cypress.env('email_morador'),
      senha: Cypress.env('senha_morador'),
    },
  })
    .its("body")
    .then((identity) => {
      cy.setCookie("gc.token", identity.token);
    });
});

Cypress.Commands.add("postTokenSuperAdmin", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env('api_url')}auth/login/local`,
    body: {
      email: Cypress.env('email_super_admin'),
      senha: Cypress.env('senha_super_admin'),
    },
  })
    .its("body")
    .then((identity) => {
      cy.setCookie("gc.token", identity.token);
    });
});

Cypress.Commands.add("postTokenAdmin", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env('api_url')}auth/login/local`,
    body: {
      email: Cypress.env('email_admin'),
      senha: Cypress.env('senha_admin'),
    },
  })
    .its("body")
    .then((identity) => {
      cy.setCookie("gc.token", identity.token);
    });
});

