import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerGlobalComps } from './utils/register'
import 'nprogress/nprogress.css'

/**
 * three solutions exist for showing progress bar
 * 1. intercepting the network request
 * 2. using route guards
 * 3. global and per route guard
 */

// register global components
registerGlobalComps(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
