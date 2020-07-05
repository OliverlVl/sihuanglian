<template>
  <div>
    <div class="login_name">
      <p>注册</p>
    </div>
    <el-form
      class="login-form"
      autocomplete="on"
      ref="registerForm"
      :model="registerForm"
      :rules="registerFormRules"
    >
      <el-form-item prop="account">
        <el-input name="account" type="text" v-model="registerForm.account" placeholder="请输入账号">
          <div class="svg-container" slot="prefix">
            <icon name="user" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input name="userName" type="text" v-model="registerForm.userName" placeholder="请输入用户名">
          <div class="svg-container" slot="prefix">
            <icon name="username" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input name="phone" type="text" v-model="registerForm.phone" placeholder="请输入手机号">
          <div class="svg-container" slot="prefix">
            <icon name="username" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input
          name="email"
          type="text"
          v-model="registerForm.email"
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
        <el-input name="code" type="text" v-model="registerForm.code" placeholder="请输入验证码">
          <div class="svg-container" slot="prefix">
            <icon name="vercode" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          name="pwd"
          type="text"
          v-model="registerForm.pwd"
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
          v-model="registerForm.repassword"
          placeholder="请再次输入密码"
          show-password
        >
          <div class="svg-container" slot="prefix">
            <icon name="password" :w="16" :h="16"></icon>
          </div>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;" @click="submitRegister">确认注册</el-button>
    </el-form>
    <div class="login-footer">
      <a @click="showLogin" class="login-footer-left">返回登录</a>
    </div>
  </div>
</template>

<script>
import ClockClickButton from "../../common/ClockClickButton";
import utilsMainAPI from "@/api/utilsMainAPI";
import loginAPI from "@/api/loginAPI";
export default {
  name: "RegisterForm",
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
        if (this.registerForm.repassword !== "") {
          this.$refs.registerForm.validateField("repassword");
        }
        callback();
      }
    };
    var validateRepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      showLoading: false,
      registerForm: {
        account: "",
        pwd: "",
        repassword: "",
        phone: "",
        email: "",
        code: "",
        userName: ""
      },
      registerFormRules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 10, message: "账号在4-10以内", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "用户名在20字以内", trigger: "blur" }
        ],
        pwd: [
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
          this.$utils.message.showSuccess("你的验证码为8888");

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
        this.$refs.registerForm.validateField("email", res => {
          console.log(res);
          if (res === "") {
            resolve(res);
          }
          reject(res);
        });
      });
    },
    // 表单验证
    validate() {
      const _this = this;
      var p1 = new Promise(function(resolve, reject) {
        return _this.$refs.registerForm.validate(valid => {
          if (valid) {
            resolve();
          }
          reject(valid);
        });
      });
      return p1;
    },
    submitRegister() {
      this.validate().then(valid => {
        // this.loadingStart();
        if (this.registerForm.pwd === this.registerForm.repassword) {
          if (this.registerForm.code === "8888") {
            loginAPI
              .register(this.registerForm)
              .then(res => {
                // setTimeout(function() {
                //   window.location.reload();
                // }, 1000);
                this.$utils.message.showSuccess(res.data.msg);
              })
              .finally(err => {
                // this.loadingEnd();
                console.error(err);
              });
          } else {
            this.$alert("请输入正确验证码");
          }
        } else {
          this.$alert("请确认两次输入密码是否相同");
        }
      });
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
.login-get-code {
  cursor: pointer;
  color: #5bbff3;
}
</style>
