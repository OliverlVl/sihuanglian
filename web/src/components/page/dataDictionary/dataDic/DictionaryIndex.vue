<template>
  <div class="dict-manage-index">

    <div class="tool-wrapper">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="createOpen" size="mini">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="removeOpen" size="mini">删除</el-button>
      </el-button-group>
    </div>

    <dictionary-table ref="DictionaryTable" @openEdit="openEdit"></dictionary-table>
   
    <dictionary-add ref="DictionaryAdd" @load="load"></dictionary-add>
    <dictionary-edit @load="load" ref="DictionaryEdit"></dictionary-edit>

  </div>
</template>

<script>
import DictionaryAdd from "./DictionaryAdd";
import DictionaryEdit from "./DictionaryEdit";
import DictionaryTable from "./DictionaryTable";
import Pagination from "../../../common/Pagination";
import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";
import ContainerSearchGroup from "../../../common/ContainerSearchGroup";

import dictionaryMainAPI from "@/api/manage/dictionaryMainAPI";

export default {
  name: "DictionaryIndex",
  components: {
    DictionaryTable,
    DictionaryEdit,
    DictionaryAdd,
    Pagination,
    ContainerSearchGroup
  },
  data() {
    return {
      search: {
        query:
   
          {
            text: " "
          },
        sort: {

        },
        page: 1,
        pageSize: 15,
        total: 0
      },
      tableLoading: false
    };
  },
  created() {
    
    
  },
  methods: {
    load() {
        
      this.$refs.DictionaryTable.load();
    },
    // 获取选择列
    getSelected() {
      var row = this.$refs.DictionaryTable.getSelected();
      if (row === undefined) {
        showMessage("error", "请先选择一个字典");
      }
      // console.log(row);
      return row;
    },
    createOpen() {
      this.$refs.DictionaryAdd.openCreate();
    },
    openEdit(row) {
      // console.log(row)
      this.$refs.DictionaryEdit.openEdit(row);
    },
    removeOpen() {
      var row = this.getSelected();
      if (row === undefined) {
        return;
      }
      const _this = this;
      showSimpleConfirm(
        "是否确定删除数据字典中" + row.code+"参数的"+row.item_value + "参数值?",
        function() {
          console.log(row);
          dictionaryMainAPI.deleteDictionaryDetail(row.detail_id).then(res => {
            showSuccess("删除数据字典成功!");
            _this.load();
          });
        },
        function() {
          showInfo("取消删除");
        }
      );
    },

    query() {
      this.search.page = 1;
      this.load();
    },

    // 页面显示条目数量切换
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.search.page = 1;
      this.load();
    },

    // 页面切换
    handleCurrentChange(val) {
      this.search.page = val;
      this.load();
    }
  }
};
</script>

<style scoped>
</style>
