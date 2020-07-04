<template>
  <el-table
    class="dict-manage-table"
    :data="tableData"
  
    
    fit
    highlight-current-row
    stripe
    size="mini"
   
  >
    
    <el-table-column prop="exp" label="签到经验" align="center"></el-table-column>
    <el-table-column prop="distance" label="签到距离" align="center"></el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button icon="el-icon-edit" size="mini" @click="openEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dictionaryMainAPI from "@/api/manage/dictionaryMainAPI";

export default {
  name: "DataSelectTable",
   data() {
    return {
      tableVisible: false, // 控制添加弹出框是否显示
   
      tableData: [
        {
          exp: "1",
          distance:"1" 
        }
      ]
    };
  },
  props: {
    rowDblClick: {
      type: Function,
      default() {}
    },
    search: { type: Object }
  },
  computed: {
    dataInfoList() {}
  },
 
  created() {
    dictionaryMainAPI
        .selcetSystemParameterAll()
        .then(res => {
         
          // console.log(res.data);
          this.tableData[0].exp = res.data.exp;
          this.tableData[0].distance = res.data.distance;
          // console.log('this.tableData');
          // console.log(this.tableData);
          //  console.log('this.tableData');
        })
        .catch(error => {
          console.log(error);
         
        });
  },
  methods: {
    load(event) {
      if (event === undefined || event === null || event === "请选择") {
        return;
      }

      dictionaryMainAPI
        .selcetSystemParameterAll()
        .then(res => {
     
          // console.log(res.data);
          this.tableData.exp = res.data.exp;
          this.tableData.distance = res.data.distance;
        })
        .catch(error => {
          console.log(error);
       
        });
    },
    // 打开编辑窗口
    openEdit() {
      this.$emit("openEdit");
    },

 
    
    // 将用户状态英文转为中文
   
    getSelected() {
      return this.selectRow;
    },
    rowClick(row) {
      this.selectRow = row;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.status === value;
    },
   
  }
};
</script>

<style scoped>
</style>
