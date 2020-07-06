// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import './permission'
import utils from './utils'

import Icon from 'vue2-svg-icon/Icon'
Vue.component('icon', Icon);

Vue.config.productionTip = false;
Vue.use(Element);

Vue.prototype.$utils = utils

// console.log(process.env.VUE_APP_BASE_API);
// console.log('111111111')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
