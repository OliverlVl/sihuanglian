<template>
  <el-tree
    :data="treeData"
    v-loading="loading"
    node-key="roleId"
    highlight-current
    default-expand-all
    :expand-on-click-node="false"
    @node-click="handleNodeClick">
  </el-tree>
</template>

<script>
  import roleMainAPI from '@/api/manage/roleMainAPI';

  export default {
    name: 'SystemRoleTree',
    props: {
      handleNodeClick: {
        type: Function,
        default: function (node) {
          console.log(node);
        }
      }
    },
    data () {
      return {
        treeData: [],
        loading: false
      }
    },
    created () {
      this.init();
    },
    methods: {
      init: function () {
        this.loading = true;
        roleMainAPI.getAllRole().then(res => {
            console.log(res)
            this.treeData = res.data;
            // if (res.data.length>0){
            //     this.h
            // }
        }).finally(() => {
            setTimeout(() => {
                this.loading = false;
            }, 500)
        })
      }
    }
  }
</script>

<style scoped>

</style>
