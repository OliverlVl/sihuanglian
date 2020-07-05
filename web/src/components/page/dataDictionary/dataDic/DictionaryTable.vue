<template>
  <div>
    <el-table
      class="dict-manage-table"
      :data="tableList"
      @row-click="rowClick"
      @row-dblclick="rowDblClick"
      fit
      highlight-current-row
      stripe
      size="mini"
      :default-sort="{prop: 'detail_id', order: 'descending'}"
    >
      <el-table-column prop="code" label="参数名称" align="center" ></el-table-column>
      <el-table-column prop="item_key" label="参数key" align="center"></el-table-column>

      <el-table-column prop="item_value" label="参数value" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if=" scope.row.detail_id !='' " icon="el-icon-edit" size="mini" @click="openEdit(scope.row)">编辑参数value</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dictionaryMainAPI from "@/api/manage/dictionaryMainAPI";
import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";

export default {
  name: "DictionaryTable",
  data() {
    return {
      tableList: [
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        },
        {
          detail_id: "",
          code: "",
          item_key: "",
          item_value: ""
        }
      ],

      selectRow: "1"
    };
  },
  props: {
    rowDblClick: {
      type: Function,
      default() {}
    },
    search: { type: Object }
  },
  computed: {},
  created() {
    this.load();
  },
  methods: {
    load() {
      dictionaryMainAPI
        .getAllDictList()
        .then(res => {
          for (let i in res.data) {
              this.tableList[i].detail_id = res.data[i].detail_id,
              this.tableList[i].code = res.data[i].code,
              this.tableList[i].item_key = res.data[i].item_key,
              this.tableList[i].item_value = res.data[i].item_value;
          }
          
        })
        .catch(() => {});
    },
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
      return row.dataTypeKey === value;
    },
    openEdit(row) {
      // console.log(row)
      this.$emit("openEdit", row);
    },
    checkStringIn(a, tmp) {
      if (a === undefined || a === null) return false;
      return ture;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
