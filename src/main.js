import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerGlobalComps } from './utils/register'

// register global components
registerGlobalComps(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
