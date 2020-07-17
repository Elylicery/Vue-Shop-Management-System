<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!--头像区域-->
        <img src="../assets/logo.png" alt />
      </div>
      <!--登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont iconuser"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont iconi-pwd"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      //登陆表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456',
      },
      //这是表单的验证规则对象
      loginFormRules:{
        //验证用户名是否合法
        username:[
          { required:true, message:"请输入登录用户名", trigger:"blur"},
          { min:3, max:10, message:"长度在3到10个字符中间", trigger:"blur"}
        ],
        //验证密码是否合法
        password:[
          { required:true, message:"请输入登录密码", trigger:"blur"},
          { min:6, max:15, message:"长度在6到15个字符中间", trigger:"blur"}
        ],
      }
    }
  },
  methods:{
    //重置登录表单
    resetLoginForm(){
      //console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    //登录预验证 valid是验证结果 判断验证通过/失败
    login(){
      this.$refs.loginFormRef.validate(async valid =>{
        //console.log(valid);
        if(!valid) return;
        //发送请求
        const {data: res} = await this.$http.post('login',this.loginForm);//操作返回的是await，可以使用async和await简化操作
        if(res.meta.status!==200) return this.$message.error('登陆失败');
        this.$message.success('登陆成功')
        //1. 将登陆成功之后的token，保存到客户端的sessionStorage中
        //  1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2 token只应当在当前网站打开期间生效，所以将token保存在sessionStorage中
        //console.log(res);
        window.sessionStorage.setItem('token',res.data.token);
        //2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%); //根据盒子的高度
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>