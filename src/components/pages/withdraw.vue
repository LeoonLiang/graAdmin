<template>
    <div class="container">
  <div class="func-btn com-form">

    <el-button type="primary" @click="getList">查询</el-button>
  </div>
   <div class="money-card-box">
    <div class="money-card">
        <div class="money-title">剩余总金额/元</div>
        <div class="money">{{moneyData.nowMoney}}</div>
    </div>
    <div class="money-card">
        <div class="money-title">提现中总金额/元</div>
        <div class="money">{{moneyData.ingMoney}}</div>
    </div>
    <div class="money-card">
        <div class="money-title">已提现总共金额/元</div>
        <div class="money">{{moneyData.edMoney}}</div>
    </div>
  </div>
  <div class="list com-form">
    <div style="font-size: 16px;font-weight: bold; margin-bottom: 20px">会员管理</div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="nickname" label="会员名称" width="150">
      </el-table-column>
      <el-table-column fixed prop="business_name" label="店铺名称" width="150">
      </el-table-column>
      <el-table-column prop="telphone" label="提现手机号" width="120">
      </el-table-column>
			<el-table-column prop="ingMoney" label="提现金额" width="120">
      </el-table-column>
      <el-table-column prop="member_type" label="提现状态">
        <template slot-scope="scope">
         {{scope.row.moneyType==0 ? '提现中' : scope.row.moneyType== -1 ? '提现失败' : '提现成功'}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="withdraw(scope.row)" type="primary" size="small">出款</el-button>
          <el-button @click="fail(scope.row)" type="" size="small">拒绝提现</el-button>
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
      list: [],
       moneyData: {
          nowMoney: 0,
          ingMoney: 0,
          edMoney: 0
      }
    };
  },
  methods: {
    withdraw(row) {
        this.$confirm("请确定已发送资金","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.$http.post('/v2/update/confirmWithdraw', {
            id: row.id
          }).then((res) => {
            if (res.data.error_code === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.getList()
            } else {
            this.$message({
                type: 'error',
                message: '未知错误'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
     
    },
     fail(row) {
          this.$confirm("请确定已发送资金","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$http.post('/v2/update/failWithdraw', {
            id: row.id
          }).then((res) => {
            if (res.data.error_code === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.getList()
            } else {
            this.$message({
                type: 'error',
                message: '未知错误'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
 
    },
    async getList() {
      const url = "/v2/get/adminRecord"
      const res = await this.$http.get(url)
      if (res.status === 200) {
        this.list = [...res.data.recordData]
        this.moneyData = {...res.data.money}
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
.money-card-box {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
}
.money-card {
    padding: 20px;
    box-sizing: border-box;
    min-width: 200px;
    height: 100px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-right: 10px;
    color: #c9c9c9;
}
.money {
    padding-top: 4px;
    font-size: 32px;
    font-weight: bold;
    color: #409eff;
}

</style>