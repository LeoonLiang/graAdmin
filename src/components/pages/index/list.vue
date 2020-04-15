<template>
    <div class="container">
  <div class="func-btn com-form">

    <el-button type="primary" @click="getList = true">查询</el-button>
  </div>
  <div class="list com-form">
    <div style="font-size: 16px;font-weight: bold; margin-bottom: 20px">会员管理</div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="name" label="会员名称" width="150">
      </el-table-column>
      <el-table-column prop="idNum" label="身份证号" width="120">
      </el-table-column>
			<el-table-column prop="telphone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          {{scope.row.type==1 ? '审核通过' : scope.row.type==-1 ? '审核不通过' : '未审核'}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="emitter('detail', scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import store from "@/vuex/store"
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    emitter(key, data, state={}) {
			this.$emit('view', key, data, state)
    },
    //标签页
    handleEdit(index, row) {
      this.editform = {
        id: row.id,
        name: row.name,
        price: row.price,
        describe: row.describe
      }
      this.editFormVisible = true
    },	
    
    async getList() {
      const url = "/v1/checkAll"
      let params = {
        uid: localStorage.getItem('uid')
      }
      const res = await this.$http.get(url, { params })
      if (res.status === 200) {
        this.list = [...res.data.auditData]
        console.log(this.list)
      }
    }
  },
  created: async function () {
    this.getList();
  },
  activated() {
    this.getList()
  }
}

</script>

<style>
    .container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 30px;

    background-color: #f5f5f5;
}

.com-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
}

.func-btn {
    margin-top: 10px;
}
</style>