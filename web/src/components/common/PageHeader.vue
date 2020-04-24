<template>
  <el-row class="page-header">
    <h2 class="title">{{ title }}</h2>
    <div class="right">
      <slot name="right">
        <el-button size="medium" type="text" @click="$router.go(-1)" v-if="showBack">
          <svg-icon icon-class="back"/>返回
        </el-button>
      </slot>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  .page-header {
    margin-bottom: 30px;
    .title{
      float: left;
    }
    .right{
      float: right;
      margin-top: 10px;
    }
    h2{
      margin: 0;
    }
  }
</style>
