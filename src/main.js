//项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import './plugins/element.js'

//导入字体图标 使用iconfont
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'


import TreeTable from 'vue-table-with-tree-grid'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import axios from 'axios'
//配置请求根路径
//axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config);
  //为请求头对象，添加token认证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //最后必须return config
  return config;
})

Vue.prototype.$http = axios; 

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

//注册全局过滤器
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = (dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,'0');

  const hh = (dt.getHours() + '').padStart(2,'0');
  const mm = (dt.getMinutes() + '').padStart(2,'0');
  const ss = (dt.getSeconds() + '').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
