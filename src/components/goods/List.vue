<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!--table表格区域-->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="90px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //查询参数对象
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10,
      },
      //商品列表
      goodsList:[],
      //总数据条数
      total:0,
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    //根据分页获取对应的商品列表
    async getGoodsList(){
      const {data:res} = await this.$http.get('goods',{params:this.queryInfo})

      if(res.meta.status!==200){
        return this.$message.error('获取商品列表失败！');
      }

      //this.$message.success('获取商品列表成功！');
      console.log("获取到的商品列表:",res.data);
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },

    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },

    //删除商品
    async removeById(id){
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'      
        }).catch(err => err)

        if(confirmResult !== 'confirm'){
          return this.$message.info('已经取消删除!');
        }

        const {data:res} = await this.$http.delete(`goods/${id}`);
        if(res.meta.status!==200){
        return this.$message.error('删除失败！');
      }

      this.$message.success('删除成功！');
      this.getGoodsList();
    },

    //进入添加商品页面组件
    goAddpage(){
      this.$router.push('/goods/add');
    }
  },
  
}
</script>

<style lang="less" scoped>

</style>