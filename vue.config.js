const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  }
});
