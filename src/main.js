import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerGlobalComps } from './utils/register'
import 'nprogress/nprogress.css'
import DateFilter from './filters/date'

/**
 * three solutions exist for showing progress bar
 * 1. intercepting the network request
 * 2. using route guards
 * 3. global and per route guard
 */

Vue.filter('date', DateFilter)
Vue.use(Vuelidate)

// register global components
registerGlobalComps(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
