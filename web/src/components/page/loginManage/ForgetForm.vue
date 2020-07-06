<template>
  <div>
    <div class="login_name">
      <p>忘记密码</p>
    </div>
    <el-form
      class="login-form"
      autocomplete="on"
      ref="forgetForm"
      :model="forgetForm"
      :rules="forgetFormRules"
    >
      <el-form-item prop="account">
        <el-input name="account" type="text" v-model="forgetForm.account" placeholder="请输入用户名/手机号/邮箱号">
          <div class="svg-container" slot="prefix">
            <icon name="user" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          name="email"
          type="text"
          v-model="forgetForm.email"
          placeholder="请输入邮箱"
          style=" float: left;width: 60%;"
        >
          <div class="svg-container" slot="prefix">
            <icon name="email" :w="16" :h="16"></icon>
          </div>
        </el-input>
        <clock-click-button
          type="plain"
          style="float: right;width: 35%"
          text="发送验证码"
          after-text="重新发送"
          :on-click="sendEmailCode"
        ></clock-click-button>
      </el-form-item>
      <el-form-item prop="code">
        <el-input name="code" type="text" v-model="forgetForm.code" placeholder="请输入验证码">
          <div class="svg-container" slot="prefix">
            <icon name="vercode" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          type="text"
          v-model="forgetForm.password"
          placeholder="请输入密码"
          show-password
        >
          <div class="svg-container" slot="prefix">
            <icon name="password" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          name="repassword"
          type="text"
          v-model="forgetForm.repassword"
          placeholder="请再次输入密码"
          show-password
        >
          <div class="svg-container" slot="prefix">
            <icon name="password" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;" @click="submitForget">提交</el-button>
    </el-form>
    <div class="login-footer">
      <a @click="showLogin" class="login-footer-left">返回登录</a>
    </div>
  </div>
</template>

<script>
import utilsMainAPI from "@/api/utilsMainAPI";
import loginAPI from "@/api/loginAPI";
import ClockClickButton from "../../common/ClockClickButton";

export default {
  name: "ForgetForm",
  components: { ClockClickButton },
  props: {
    showLogin: {
      type: Function,
      default() {}
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.forgetForm.repassword !== "") {
          this.$refs.forgetForm.validateField("repassword");
        }
        callback();
      }
    };
    var validateRepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      forgetForm: {
        account: "",
        password: "",
        repassword: "",
        email: "",
        code: ""
      },
      forgetFormRules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 10, message: "账号在4-10以内", trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            required: true,
            message: "请输入长度为6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            message: "请输入长度为6-20位包含数字和字母的密码",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        repassword: [
          { validator: validateRepass, trigger: "blur" },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    async sendEmailCode(e) {
      let flag = await this.validateCode().then(
        () => {
          this.$utils.message.showSuccess("你的验证码为8098");

          return true;
        },
        () => {
          return false;
        }
      );
      return flag;
    },
    validateCode() {
      return new Promise((resolve, reject) => {
        this.$refs.forgetForm.validateField("email", res => {
          console.log(res);
          if (res === "") {
            resolve(res);
          }
          reject(res);
        });
      });
    },
    validate() {
      const _this = this;
      var p1 = new Promise(function(resolve, reject) {
        return _this.$refs.forgetForm.validate(valid => {
          if (valid) {
            resolve();
          }
          reject(valid);
        });
      });
      return p1;
    },
    submitForget() {
      this.validate().then(valid => {
        if (this.forgetForm.code === "8098") {
          this.showLoading = true;
          loginAPI
            .resetPassword(this.forgetForm)
            .then(res => {
              this.$utils.message.showSuccess(res.data.msg);
            })
            .finally(err => {
              this.showLoading = false;
              console.error(err);
            });
        } else {
          this.$utils.message.showSuccess("验证码错误");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
