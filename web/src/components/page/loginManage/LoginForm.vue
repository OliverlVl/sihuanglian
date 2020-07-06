<template>
  <div>
    <div class="login_name">
      <!--<p>登录</p>-->
    </div>
    <el-form
      class="login-form"
      autocomplete="on"
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <el-form-item prop="account">
        <el-input
          name="account"
          type="text"
          v-model="loginForm.account"
          placeholder="请输入账号、邮箱或者手机号"
        >
          <!-- <div class="svg-container" slot="prefix">
            <icon name="user" :w="16" :h="16"></icon>
          </div> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          type="text"
          v-model="loginForm.password"
          placeholder="请输入密码"
          
          
        >
          
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;"
        :loading="loading"
        @click="handleLogin"
      >登录</el-button>
    </el-form>
    <div class="login-footer">
      <a @click="showForget" class="login-footer-left">忘记密码?</a>
      <a @click="showRegister" class="login-footer-right">注册</a>
    </div>
  </div>
</template>



<script>
import loginAPI from "@/api/loginAPI";
export default {
  name: "LoginForm",
  props: {
    showForget: {
      type: Function,
      default() {}
    },
    showRegister: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      loading: false,
      loginForm: {
        account: "",
        password: ""
      },
      loginFormRules: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    handleLogin() {
      
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true;
          // this.$store.dispatch('LoginByAccount', this.loginForm).then(() => {
          //     this.loading = false;
          //     this.$router.push({path: '/home'})
          // })

          loginAPI
            .login(this.loginForm.account, this.loginForm.password)
            .then(res => {
              // console.log(res.data.msg)
              if (res.data.msg === 1) {
                // this.loading = false;
                console.log('1111111')

                var token = res.data.token;
                localStorage.setItem("token", token);

                this.$router.push({ path: "/home" });
                // console.log('1111111')
              } else {
                this.$alert("登陆失败，请检查账号密码");
              }
            })
            .catch(() => {
              // this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
