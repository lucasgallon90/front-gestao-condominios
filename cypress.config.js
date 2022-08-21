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
});
