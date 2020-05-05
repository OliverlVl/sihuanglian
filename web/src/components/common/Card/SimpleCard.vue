<template>
  <el-card :class="getCardClass" shadow="never" :body-style="bodyStyle">
    <div slot="header" class="clearfix" v-if="!hideTitle">
      <card-title :title="title">
        <slot name="right" slot="right"></slot>
      </card-title>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>

  import CardTitle from './CardTitle';
  export default {
    name: 'SimpleCard',
    components: {CardTitle},
    props: {
      // 位置left、right、default
      position: {
        type: String,
        default: 'default'
      },
      // 是否需要边框true、false
      border: {
        type: Boolean,
        default: true
      },
      // 标题
      title: {
        type: String,
        default: ''
      },
      hideTitle: {
        type: Boolean,
        default: false
      },
      bodyStyle: {}
    },
    computed: {
      getCardClass () {
        let getClass = ['simple-card-main'];
        switch (this.position) {
          case 'left':getClass.push('card-flex-left'); break;
          case 'right':getClass.push('card-flex-right'); break;
          default: break;
        }
        if (!this.border) {
          getClass.push('no-border')
        }
        return getClass;
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .simple-card-main{
    .el-card{
    }
  }
</style>
