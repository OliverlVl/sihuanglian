<template>
  <div class="dict-manage-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="数据字典" name="first">
        <dictionary-index></dictionary-index>
      </el-tab-pane>
      <el-tab-pane label="系统参数" name="second">
        <data-select-index></data-select-index>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DictionaryIndex from "./dataDic/DictionaryIndex";
import DataSelectIndex from "./dataSelect/DataSelectIndex";
export default {
  name: "DictionaryContainer",
  components: {
    DictionaryIndex,
    DataSelectIndex
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style scoped>
</style>
