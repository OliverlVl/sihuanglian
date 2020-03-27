<template>
    <div class="body">
        <div class="login_box">
           
            <div class="login">
                <div class="login_logo"><a href="#"><img src="@/assets/logo.png"></a></div>

                <!--登录-->
                <!--<transition name="fade" mode="out-in">-->
                <login-form v-show="form=='login'" :show-forget="showForget" :show-register="showRegister">
                </login-form>
                <!--</transition>-->

                <!--注册-->
                <!--<transition name="fade" mode="out-in">-->
                <register-form v-show="form=='register'" :show-login="showLogin"></register-form>
                <!--</transition>-->

                <!--忘记密码-->
                <!--<transition name="fade" mode="out-in">-->
                <forget-form v-show="form=='forget'" :show-login="showLogin"></forget-form>
                <!--</transition>-->
            </div>
        </div>
    </div>
</template>

<script>
    import RegisterForm from './RegisterForm'
    import ForgetForm from './ForgetForm'
    import LoginForm from './LoginForm'

    export default {
        name: 'Login',
        components: {ForgetForm, RegisterForm, LoginForm},
        component: { RegisterForm, LoginForm, ForgetForm },
        data () {
            return {
                form: 'login'
            }
        },
        methods: {
            showForget () {
                this.form = 'forget';
            },
            showRegister () {
                this.form = 'register';
            },
            showLogin () {
                this.form = 'login';
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

    @bg: #2d3a4b;
    @dark_gray: #889aa4;
    @light_gray: #eee;

    .body {
        background: #93defe;
        background-size: cover;
        position: fixed;
        height: 100%;
        width: 100%;
    }
    .login_box {
        width: 1100px;
        margin: 120px auto 0;
        padding: 10px;
    }
    .login_box .login_l_img {
        float: left;
        width: 432px;
        height: 440px;
        margin-left: 50px;
    }
    .login_logo img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: middle;
    }
    .login {
        /*height: 360px;*/
        width: 400px;
        padding: 50px;
        background-color: #ffffff;
        border-radius: 6px;
        box-sizing: border-box;
        float: right;
        position: relative;
        margin-top: 50px;
    }
    .login_logo {
        width: 120px;
        height: 120px;
        border: 5px solid #93defe;
        border-radius: 100px;
        background: #fff;
        text-align: center;
        line-height: 110px;
        position: absolute;
        top: -60px;
        right: 140px;
    }
    .login_name {
        width: 100%;
        float: left;
        text-align: center;
        margin-top: 20px;
    }
    .login_name p {
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #444;
        padding: 10px 0 20px;
    }
    .login-footer{
        font-size: 14px;
        color: #848484;
        margin-top: 10px;
        .login-footer-left{
            float: left;
        }
        .login-footer-right{
            float: right;
        }
    }
    @media  screen and (max-width:1024px){
        .login_box .login_l_img{
            display: none;
        }
        .login_box{
            padding: 0;
        }
        .login{
            float: none;
            margin: 0 auto;
        }

        .login_box{
            width: auto;
        }
    }
    //小屏幕样式
    @media screen and (max-width: 400px) {
        .login{
            width: auto;
        }
    }

</style>
