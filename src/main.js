import Vue from 'vue'
import App from './App.vue'

import "@/assets/scss/app.scss"

import vuetify from './plugins/vuetify'

// Add electron to Vue
import { ipcRenderer } from 'electron'
Vue.prototype.$electron = { ipcRenderer }

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
