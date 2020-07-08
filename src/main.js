import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './plugins/element.js'

//导入字体图标 使用iconfont
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
//配置请求根路径
//axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
