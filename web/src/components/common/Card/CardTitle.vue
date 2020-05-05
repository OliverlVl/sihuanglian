<template>
  <el-row :class="titleClass" >
    <slot name="title">
      <span>
        {{ title }}
      </span>
    </slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'CardTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    svg: {
      type: String,
      default: ''
    },
    titleBorder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleClass () {
      let cls = 'card-title'
      if (this.svg !== '' || !this.titleBorder) {
        cls += ' card-no-border-title'
      }
      return cls;
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  @import '../../../styles/variables';

  .card-title-svg {
    color: @thema;
  }

  .card-title {
    border-left: solid 4px @thema;
    line-height: 28px;
    font-size: 16px;
    text-indent: 6px;
    padding-left: 6px;

    .right{
      float: right;
      .el-button--text {
        padding: 3px 6px;
      }
    }
  }
  .card-no-border-title {
    border-left: none
  }

</style>
