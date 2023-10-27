import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

import "@/assets/scss/app.scss";

import { ROUTER_BASE_URL } from "@/constants";

/**
 * Add Vuetify
 */
import vuetify from "@/plugins/vuetify";

/**
 * Add Router
 */
import { routers } from "@/routes";

// Add electron to Vue
import { ipcRenderer } from "electron";
Vue.prototype.$electron = { ipcRenderer };

Vue.use(VueRouter);
const router = new VueRouter({
  base: ROUTER_BASE_URL,
  mode: "history",
  routes: routers
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
