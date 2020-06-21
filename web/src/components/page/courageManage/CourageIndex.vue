<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :model="selectForm" ref="selectForm">
          学校：
          <el-select
            v-model="selectForm.selectSchool"
            placeholder="全部学校"
            class="handle-select mr10"
          >
            <el-option key="1" label="福州大学" value="福州大学"></el-option>
            <el-option key="2" label="福建师范大学" value="福建师范大学"></el-option>
          </el-select>学院：
          <el-select
            v-model="selectForm.selectCollege"
            placeholder="全部学院"
            class="handle-select mr10"
          >
            <el-option key="1" label="数学与计算机科学学院" value="数学与计算机科学学院"></el-option>
            <el-option key="2" label="材料与化学学院" value="材料与化学学院"></el-option>
          </el-select>课程：
          <el-input
            v-model="selectForm.selectCourse"
            placeholder="请输入课程名称"
            class="handle-input mr10"
          ></el-input>

          <el-button type="primary" icon="search" @click="search(selectForm)">查询</el-button>
          <!--<el-button type="primary" icon="search" @click="addUser">添加</el-button>-->
        </el-form>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="学/工号" sortable width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="120"></el-table-column>
        <el-table-column prop="identity" label="身份" width="120"></el-table-column>
        <el-table-column prop="school" label="学校" width="160"></el-table-column>
        <el-table-column prop="course" label="课程" width="160"></el-table-column>
        <el-table-column prop="class" label="班级" width="120"></el-table-column>
        <el-table-column prop="access_goal" label="获得分数" width="120"></el-table-column>
        <el-table-column prop="total_goal" label="总分数" width="120"></el-table-column>
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
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="this.isAdd?'新增':'编辑'" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="学/工号">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="form.identity"></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="form.course"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item label="获得分数">
          <el-input v-model="form.access_goal"></el-input>
        </el-form-item>
        <el-form-item label="总分数">
          <el-input v-model="form.total_goal"></el-input>
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
import courageMainAPI from "@/api/manage/courageMainAPI";

export default {
  data() {
    return {
      tableData: [
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        },
        {
          number: "",
          name: "",
          identity: "",
          school: "",
          course: "",
          class: "",
          access_goal: "",
          total_goal: ""
        }
      ],
      curPage: 1,
      multipleSelection: [],
      selectForm: {
        selectSchool: "",
        selectCollege: "",
        selectCourse: ""
      },
      delList: [],
      isSearch: false,
      isAdd: false,
      editVisible: false,
      delVisible: false,
      form: {
        number: "",
        name: "",
        identity: "",
        school: "",
        course: "",
        class: "",
        access_goal: "",
        total_goal: ""
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
      // this.$axios
      //     .get(this.url, {
      //         page: this.curPage
      //     })
      //     .then(res => {
      //         this.tableData = res.data.list;
      //     });
    },
    search(formName) {
      this.isSearch = true;
      const self = this;
      courageMainAPI.getAllCourage(self.selectForm, this.curPage).then(res => {
        console.log(res);
        for (let i in res.data) {
          this.tableData[i].number = res.data[i].User_No;
          this.tableData[i].name = res.data[i].User_Name;
          this.tableData[i].identity = res.data[i].User_Type;
          this.tableData[i].school = res.data[i].User_School;
          this.tableData[i].course = res.data[i].Course_Name;
          this.tableData[i].class = res.data[i].Class_Name;
          this.tableData[i].access_goal = res.data[i].acc_goals;
          this.tableData[i].total_goal = res.data[i].total;
        }
      });
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      this.rowId = index;
      const item = this.tableData[index];
      this.form = {
        number: item.number,
        name: item.name,
        identity: item.identity,
        school: item.school,
        course: item.course,
        class: item.class,
        access_goal: item.access_goal,
        total_goal: item.total_goal
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
      if (!length) {
        this.$message.error("请先勾选要删除的数据！");
        return;
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
      if (!this.isAdd) {
        this.$message.success(`修改第 ${this.rowId + 1} 行成功`);
      } else {
        this.$message.success("数据添加成功");
      }
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.rowId, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    },
    addUser() {
      this.isAdd = true;
      this.editVisible = true;
      this.tableData.shift({
        name: this.form.name,
        age: this.form.age,
        address: this.form.address,
        email: this.form.email
      });
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
