import Vue from 'vue'

//按需导入element-ui组件
import {
  Button,Form,FormItem,Input,Message,
 } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//将弹框组件挂载到vue的原型上，使得每个组件都可以通过this.$message访问
Vue.prototype.$message = Message;

