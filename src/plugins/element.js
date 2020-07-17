import Vue from 'vue'

//按需导入element-ui组件
import {
  Button,Form,FormItem,Input,Message,
  Container,Header,Aside,Main,
  Menu,Submenu,MenuItem,
  Breadcrumb,BreadcrumbItem,
  Card,Row,Col,
  Table,TableColumn,
  Switch,Tooltip,Pagination,Dialog,
  MessageBox,
 } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)

//将弹框组件挂载到vue的原型上，使得每个组件都可以通过this.$message访问
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

