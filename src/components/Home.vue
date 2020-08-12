<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/shop.png" alt style="width:40px;height:40px" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主题区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu unique-opened background-color="#333744" 
        text-color="#fff" active-text-color="#409BFF"
        :collapse-transition="false" 
        :collapse="isCollapse" router 
        :default-active="activePath">
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{item.authName}}</span>
            </template>

            <!--二级菜单-->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
            :key="subItem.id" @click="saveNavState('/'+subItem.path)">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      //左侧菜单数据
      menuList:[],
      iconsObj:{
        '125':'iconfont iconuser',
        '103':'iconfont icontijikongjian',
        '101':'iconfont iconshangpin',
        '102':'iconfont icondanju',
        '145':'iconfont iconbaobiao'
      },
      //是否折叠
      isCollapse:false,
      //被激活的链接地址
      activePath:'',
    }
  },
  created(){
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    //退出
    logout() {
      //清空token
      window.sessionStorage.clear();
      //跳转到登陆页面
      this.$router.push("/login");
    },
    //获取所有的菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus');
      if(res.meta.status != 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
      console.log('请求菜单返回的结果：',res);
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}

.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>