import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'

import './assets/css/reset.css'

Vue.config.productionTip = false

import { Toast } from './common/plugin'
Vue.use(Toast)

import def_lazy_img from './assets/img/loading.gif'
// 懒加载组件
Vue.use(VueLazyload, {
  loading: def_lazy_img
})

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
