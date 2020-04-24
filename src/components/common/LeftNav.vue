<template>
  <div class="left-nav">
    <div class="logo">
      管理
      <span>后台</span>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#303133"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <router-link to="/">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">会员管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/withdraw">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">提现管理</span>
        </el-menu-item>
      </router-link>

    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style>
.logo {
  width: 199px;
  height: 80px;
  line-height: 80px;
  /* text-align: center; */
  font-size: 28px;
  background-color: #000;
  color: #c0c0c0;
  box-sizing: border-box;
  padding-left: 20px;
}
.logo span {
  color: #409eff;
}

.left-nav {
  width: 200px;
  float: left;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 100;
}

.left-nav .el-menu {
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
</style>