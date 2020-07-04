<template>
  <el-tree
    :data="treeData"
    v-loading="loading"
   
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
          // console.log(node);
        }
      }
    },
    data () {
      return {
        treeData: [
          {
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },
          {
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },
          {
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },{
            id: "",
            label: "",
            role_type: "",
            detail:"",
          },

        ],
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
          // console.log('data');
           
            
          // console.log(res.data);
          for (let i in res.data) {
            this.treeData[i].id = res.data[i].id;
            this.treeData[i].label = res.data[i].role_name;
            this.treeData[i].role_type = res.data[i].role_type;
            this.treeData[i].detail = res.data[i].detail;
          
        }
        //  console.log('treeData');
        // console.log(this.treeData);

         
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
