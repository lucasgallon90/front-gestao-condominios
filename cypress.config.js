const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    e2e: {
      baseUrl: "http://localhost:3000",
    },
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },
  env: {
    front_url:"http://localhost:3000/",
    api_url:"http://localhost:8001/v1/",
    email_super_admin: "superadmin@gestaodecondominios.com.br",
    senha_super_admin: "123",
    email_admin: "admin@gestaodecondominios.com.br",
    senha_admin: "123",
    email_morador: "morador@gestaodecondominios.com.br",
    senha_morador: "123"
  }
});
