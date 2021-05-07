import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery/dist/jquery'
//import jQuery from 'jquery/dist/jquery'
//global.jquery = jQuery
//global.$ = jQuery
window.$ = window.jQuery = require('jquery')
import 'popper.js/dist/umd/popper'
import 'bootstrap/dist/js/bootstrap'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  BootstrapVue,
  router,
  render: h => h(App),
  linkActiveClass: "menu-link",
}).$mount('#app')
