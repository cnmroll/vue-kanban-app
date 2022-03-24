// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const backend = require("./backend/dev-server");

module.exports = defineConfig({
  // options...
  devServer: {
    onBeforeSetupMiddleware: backend,
  },
});
