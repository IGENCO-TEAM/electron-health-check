import Vue from 'vue'
import App from './App.vue'

import "@/assets/scss/app.scss"

// Add electron to Vue
import { ipcRenderer } from 'electron'

import vuetify from './plugins/vuetify'
Vue.prototype.$electron = { ipcRenderer }

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
