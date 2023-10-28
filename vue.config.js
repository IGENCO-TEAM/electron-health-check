const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "com.igenco.health-check",
        productName: "Health Check",
        win: {
          icon: "src/assets/icons/favicon256.ico"
        },
        mac: {
          icon: "src/assets/icons/favicon256.icns"
        },
        linux: {
          icon: "src/assets/icons"
        }
      }
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
