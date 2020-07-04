<template>
  <el-dialog title="用户信息修改" :visible.sync="dialogVisible" :close-on-click-modal="false">
    <el-form
      ref="userEditForm"
      :model="userData"
      size="small"
      :rules="rules"
      v-loading="showLoading"
      label-width="100px"
      label-position="right"
      @keyup.enter.native="editSubmit"
    >
      <el-row :gutter="20">
        <el-col :md="12" :sm="24">
          <el-form-item label="账号:" prop="account">
            {{userData.account}}
            <!--<el-input name="account" v-model="userData.account"></el-input>-->
          </el-form-item>
          <!--<p style="padding-left: 54px;margin-top: 10px"><span style="font-weight: 600;margin-right: 5px;">账号：</span>{{userData.account}}</p>-->
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="用户名:" prop="userName">
            <el-input v-model="userData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="userData.sex">
              <el-option
                v-for="item in sexOptionsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                placeholder="请选择"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="userData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="手机:" prop="phone">
            <el-input v-model="userData.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="editSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import userMainAPI from "@/api/manage/userMainAPI";
import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";
import roleMainAPI from "@/api/manage/roleMainAPI";
import SimpleSelect from "../../common/SimpleSelect";

export default {
  name: "UserEdit",
  components: { SimpleSelect },
  data() {
    return {
      userData: {
        id: 1,
        account: '1',
        userName: '1',
        sex: '1',
        email: '1',
        phone: '',




      },
      roleList: [
        {
          id: "SupperAdmin_SYS",
          label: "超级管理员",
          roleId: 105
        },
        {
          id: "User_SYS",
          label: "普通用户",
          roleId: 152
        },
        {
          id: "Admin_SYS",
          label: "炒鸡用户1",
          roleId: 138
        }
      ],
      dialogVisible: false, // 控制添加用户的弹出框是否显示
      showLoading: false, // 控制组件加载动画
      // 性别下拉框内容
      sexOptionsList: [
        {
          value: "female",
          label: "女"
        },
        {
          value: "male",
          label: "男"
        }
      ],
      // 用户状态下拉框内容
      statusOptionsList: [
        {
          value: "Normal",
          label: "正常"
        },
        {
          value: "Disabled",
          label: "禁用"
        }
      ],
      // 验证规则
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "账号的长度需大于4个小于10个",
            trigger: "blur"
          }
        ],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 0,
            max: 60,
            message: "用户名的长度需在60 个字符以内",
            trigger: "blur"
          }
        ],
        sex: [{ required: false, message: "性别不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          },
          {
            min: 0,
            max: 100,
            message: "邮箱的长度需在100个字符以内",
            trigger: "blur"
          }
        ],
        phone: [
          {
            min: 0,
            max: 20,
            message: "手机的长度需在20个字符以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // roleMainAPI.getAllRole().then(res => {
    //     this.roleList = res.data;
    // });
  },
  methods: {
    // 提交表单
    editSubmit() {
      this.validate().then(valid => {
        this.loadingStart();
        userMainAPI
          .editUser(this.userData)
          .then(res => {
            // console.log(res);
            this.loadingEnd();
            this.$emit("load");
            showMessage("success", "修改用户信息成功!");
            this.close();
          })
          .catch(err => {
            this.loadingEnd();
            console.error(err);
          });
      });
    },
    // 打开编辑用户信息窗口
    openEdit(userId) {
      // console.log("11");
      // console.log(userId);
      this.loadingStart();
      userMainAPI
        .getUser(userId)
        .then(res => {
          console.log('2222222222')
          console.log(res.data)
          for (let i in res.data) {
            this.userData.account = res.data.student_number;
            this.userData.userName = res.data.student_name;
            this.userData.sex = res.data.student_sex;
            this.userData.email = res.data.student_mailbox;
            this.userData.phone = res.data.student_telephone;
           
          }

          
          this.loadingEnd();
        })
        .catch(err => {
          this.loadingEnd();
          console.error(err);
        });
      this.dialogVisible = true;
    },
    // 表单验证
    validate() {
      const _this = this;
      var p1 = new Promise(function(resolve, reject) {
        return _this.$refs.userEditForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
      return p1;
    },
    // 修改完后将信息表单清空
    init() {
      this.$refs.userEditForm.resetFields();
    },
    // 关闭表单弹窗
    close() {
      this.dialogVisible = false;
      this.init();
    },
    // 开始加载的动画
    loadingStart() {
      this.showLoading = true;
    },
    // 结束加载的动画
    loadingEnd() {
      this.showLoading = false;
    }
  }
};
</script>

<style scoped>
</style>
