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
  Tag,Tree,
  Select,Option,
  Cascader,
  Alert,TabPane,Tabs,Steps,Step,
  CheckboxGroup,Checkbox,
  Upload,
 } from 'element-ui'

import Timeline from './timeline/index.js'
import TimelineItem from './timeline-item/index.js'

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
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)

//将弹框组件挂载到vue的原型上，使得每个组件都可以通过this.$message访问
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

