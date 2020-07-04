<template>
  <div class="user-manage-index">
    <div class="tool-wrapper">
      <el-button-group>
        <el-button type="danger" icon="el-icon-delete" @click="removeOpen" size="mini">删除</el-button>
      </el-button-group>
    </div>

    <div>
      <el-table
        class="user-manage-table"
        :data="tableList"
        @row-click="rowClick"
        @row-dblclick="rowDblClick"
        fit
        highlight-current-row
        stripe
        size="mini"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <el-table-column prop="account" label="学号" align="center" width="120" sortable></el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" width="120"></el-table-column>

        <el-table-column prop="sex" label="性别" align="center" width="70" sortable>
          <template slot-scope="scope">
            <span>{{sexText(scope.row.sex)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if=" scope.row.userName !='' "
              size="mini"
              @click="openEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <user-edit ref="UserEdit" @load="load"></user-edit>
  </div>
</template>

<script>
import ContainerSearchGroup from "../../common/ContainerSearchGroup";

import UserEdit from "./UserEdit";

import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";

import userMainAPI from "@/api/manage/userMainAPI";
import dictionaryMainAPI from "@/api/manage/dictionaryMainAPI";

export default {
  name: "UserIndex",
  components: {
    UserEdit,

    ContainerSearchGroup
  },
  data() {
    return {
      selectRow: undefined,
      tableList: [
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        },
        {
          id: "",
          account: " ",
          userName: "",
          sex: "",
          email: "",
          phone: ""
        }
      ]
    };
  },
  props: {
    rowDblClick: {
      type: Function,
      default() {}
    }
  },
  computed: {},
  created() {
    this.load();
  },
  methods: {
    // 加载用户列表
    load() {
      userMainAPI
        .getAllList()
        .then(res => {
          // console.log(res.data);
          for (let i in res.data) {
            this.tableList[i].id = res.data[i].student_id,
            (this.tableList[i].account = res.data[i].student_number),
              (this.tableList[i].userName = res.data[i].student_name),
              (this.tableList[i].sex = res.data[i].student_sex),
              (this.tableList[i].email = res.data[i].student_mailbox),
              (this.tableList[i].phone = res.data[i].student_telephone);
          }
          // console.log("---------");
          // console.log(this.tableList);
        })
        .catch(() => {});
    },
    // 获取选择列
    getSelected() {
      var row = this.selectRow;
      if (row === undefined) {
        showMessage("error", "请先选择一个用户");
      }
      return row;
    },

    // 打开编辑用户页面
    openEdit(row) {
      // console.log("112222111111")
      // console.log(row.id)
      this.$refs.UserEdit.openEdit(row.id);
      // this.$emit("openEdit", row.id);
    },

    // 删除用户
    removeOpen() {
      var row = this.getSelected();
      if (row === undefined) {
        return;
      }
      const _this = this;
      showSimpleConfirm(
        "是否确定删除用户" + row.userName + "?",
        function() {
          userMainAPI.deleteUser(row.id).then(res => {
            showSuccess("删除用户成功!");
            _this.load();
          });
        },
        function() {
          showInfo("取消删除");
        }
      );
    },

    // 页面切换

    // 重置搜索表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rowClick(row) {
      this.selectRow = row;
    },
    // 将性别英文转为中文
    sexText(sex) {
      // console.log(sex);
      if (sex === 1) {
        return "男";
      } else if (sex === 0) {
        return "女";
      } else return "";
    },

    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    // 角色过滤器 value是要搜索的值  row是当前行的信息
    filterRole(value, row) {
      var userType = row.userType;
      for (var i = 0; i < userType.length; i++) {
        if (userType[i] === value) {
          return row.userType[i] === value;
        }
      }
      // console.log(row.userType)
    },
    // 将用户角色英文转为中文
    setUserRole(role) {
      // console.log(role)
      let roleSpan = "";
      if (role === null) return "暂无角色";
      for (var i = 0; i < role.length; i++) {
        roleSpan += role[i].role_name;
        if (i === role.length - 1) {
          return roleSpan;
        }
        roleSpan += "|";
      }
      return roleSpan;
      // return '用户';
    },
    // // 打开编辑窗口
    // openEdit(row) {
    //   this.$emit("openEdit", row);
    // },
    // 重置密码
    openResetPass(row) {
      const _this = this;
      showSimpleConfirm(
        "是否确定确定重置账号" + row.account + " 的密码？(8888)",
        function() {
          // console.log('confirm');
          userMainAPI.resetPassword(row.id).then(res => {
            showSuccess("重置密码成功!");
            _this.load();
          });
        },
        function() {
          showInfo("取消重置密码");
        }
      );
    },
    checkStringIn(a, tmp) {
      if (a === undefined || a === null) return false;
      return a.indexOf(tmp) >= 0;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.user-manage-table {
  .role-name-tag {
    display: inline-flex;
  }
  .role-name-tag:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
