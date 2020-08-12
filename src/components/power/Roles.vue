<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--添加角色按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表区域-->
      <el-table :data="roleList" border stripe>
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1 === 0?'bdtop':'','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级和三级权限-->
              <el-col :span="19">
                <!--通过for循环渲染二级权限-->
                <el-row
                  :class="[i2 === 0?'':'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>
              {{scope.row}}
            </pre>-->
          </template>
        </el-table-column>
        <!--索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分配权限的对话框-->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogColsed">
      <!--树形控件-->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有角色的列表数据
      roleList: [],
      //控制分配权限对话框显示与隐藏
      setRightDialogVisible:false,
      //所有权限的数据
      rightsList:[],
      //树形控件的属性绑定对象
      treeProps: {
          children: 'children',
          label: 'authName'
      },
      //默认选中的节点id值
      defKeys:[],
      //当前即将分配权限的角色id
      roleId:'',
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //获取所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }
      this.roleList = res.data;
      console.log("所有角色列表",res.data);
    },
    //根据id删除对应的权限
    async removeRightById(role, rightId) {
      //弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将删除用户权限",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除！");
      }
      //console.log("确认了删除！");
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );

      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败");
      }
      //this.getRolesList();//这样会页面全部渲染
      role.children = res.data; //服务器返回的最新权限直接赋给role数据，不用刷新整个页面
    },
    //展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id;
      //获取所有权限的数据
      const {data:res} = await this.$http.get('rights/tree');
      if(res.meta.status!==200){
        return this.$message.error('获取权限数据失败！')
      }
      this.rightsList = res.data;
      console.log("所有权限的数据",this.rightsList);
      
      //递归获取三级节点的id
      this.getLeafKeys(role,this.defKeys)
      console.log("已有的权限",this.defKeys);
      this.setRightDialogVisible = true;
    },
    //通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys(node,arr){
      //如果当前node节点不包含children属性，则是三级节点
      if(!node.children){
        return arr.push(node.id);
      }
      node.children.forEach(item=>
      this.getLeafKeys(item,arr))
    },
    //监听分配权限对话框的关闭事件
    setRightDialogColsed(){
      this.defKeys = [];
    },
    //点击为角色分配权限
    async allotRights(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      console.log("分配的权限",keys);
      const idStr = keys.join(',')
      const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr});
      if(res.meta.status!==200){
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRolesList();
      this.setRightDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
