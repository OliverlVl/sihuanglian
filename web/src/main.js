// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './vuex/store';
import Vuex from 'vuex'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
