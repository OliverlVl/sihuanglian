<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
       
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
       
        
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="number" label="学号"  width="220"></el-table-column>
        <el-table-column prop="name" label="姓名"  width="220"></el-table-column>

        <el-table-column prop="course" label="课程" width="220"></el-table-column>

        <el-table-column prop="access_goal" label="经验值" width="220"></el-table-column>
      </el-table>
     
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

        <el-form-item label="课程">
          <el-input v-model="form.course"></el-input>
        </el-form-item>

        <el-form-item label="经验值">
          <el-input v-model="form.access_goal"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
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
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
        {
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },{
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },{
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },{
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },{
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },{
          number: "",
          name: "",
          course: "",
          access_goal: ""
        },
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
        course: "",
        access_goal: ""
      },
      rowId: -1
    };
  },
  created() {
    
    this.load();
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
      
    },
  
    load() {
      //改过了628
      this.isSearch = true;
      const self = this;
  
      courageMainAPI
        .getAllCourage(this.curPage)
        .then(res => {
          
          // console.log('res'+res);
          
          for (let i in res.data) {
            this.tableData[i].number = res.data[i].student_id;
            this.tableData[i].name = res.data[i].student_name;
            this.tableData[i].course = res.data[i].course_name;
            this.tableData[i].access_goal = res.data[i].course_experience_point;

          }
        })
        .catch(err => {
          // console.log(err.status);
          // for (let i in err) {
          //   this.tableData[i].number = err[i].student_id;
          //   this.tableData[i].name = err[i].student_name;
          //   this.tableData[i].course = err[i].course_name;
          //   this.tableData[i].access_goal = err[i].course_experience_point;

          // }
          
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
        course: item.course,
        access_goal: item.access_goal
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
