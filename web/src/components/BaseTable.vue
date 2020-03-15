/* eslint-disable */
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">

        <el-select v-model="selectProvince" placeholder="请选择省份" class="handle-select mr10">
          <el-option key="1" label=广东省 value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="selectKeyWord" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="addUser">添加</el-button>
      </div>

      <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="150">
        </el-table-column>
        <el-table-column prop="age" label="年龄" sortable width="150">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="delAll">
        <el-button type="primary" icon="delete" class="handle-del" @click="delAll">批量删除</el-button>
      </div>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="this.isAdd?'新增':'编辑'" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="姓名">
          <el-input type="name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="400px">
      <div class="del-dialog-cnt">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/ms/table/list",
      tableData: [],
      curPage: 1,
      multipleSelection: [],
      selectProvince: "",
      selectKeyWord: "",
      delList: [],
      isSearch: false,
      isAdd:false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        age: "",
        address: "",
        email: ""
      },
      rowId: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.delList.length; i++) {
          if (d.name === this.delList[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.selectProvince) > -1 &&
            (d.name.indexOf(this.selectKeyWord) > -1 ||
              d.address.indexOf(this.selectKeyWord) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.curPage = val;
      this.getData();
    },
    // 获取easy mock数据
    getData() {
      this.$axios
        .get(this.url, {
          page: this.curPage
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    search() {
      this.isSearch = true;
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.rowId = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        age: item.age,
        address: item.address,
        email: item.email
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.rowId = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      if(!length){
        this.$message.error('请先勾选要删除的数据！');
        return ;
      }
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.rowId, this.form);
      this.editVisible = false;
      if(!this.isAdd){
      this.$message.success(`修改第 ${this.rowId + 1} 行成功`);
      }else{
         this.$message.success('数据添加成功');
      }
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.rowId, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    },
    addUser(){
      this.isAdd=true;
      this.editVisible = true;
      this.tableData.shift({
        name:this.form.name,
        age:this.form.age,
        address:this.form.address,
        email:this.form.email
      })
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.delAll {
  margin: 20px 0;
  float: left;
}
</style>
