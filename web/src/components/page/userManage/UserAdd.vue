<template>
    <el-dialog title="添加用户"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                ref="userAddForm"
                :model="userData"
                size="small"
                :rules="rules"
                v-loading="showLoading"
                label-width="100px"
                label-position="right"
                @keyup.enter.native="createSubmit">
            <el-row :gutter="20">
                <el-col :md="12" :sm="24">
                    <el-form-item label="账号:" prop="account">
                        <el-input name="account" v-model="userData.account"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="用户名:" prop="userName">
                        <el-input v-model="userData.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="密码:" prop="pwd">
                        <el-input v-model="userData.pwd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="性别:" prop="sex">
                        <el-select v-model="userData.sex">
                            <el-option v-for="item in sexOptionsList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        placeholder="请选择">
                            </el-option>
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
            <el-button type="primary" @click="createSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import userMainAPI from '@/api/manage/userMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'UserAdd',
        data () {
            return {
                userData: {
                    account: '',
                    userName: '',
                    pwd: '',
                    sex: 'male',
                    email: '',
                    phone: ''
                },
                dialogVisible: false, // 控制添加用户的弹出框是否显示
                showLoading: false, // 控制提交按钮是否可点击
                // 性别下拉框内容
                sexOptionsList: [
                    {
                        value: 'female',
                        label: '女'
                    }, {
                        value: 'male',
                        label: '男'
                    }
                ],
                // 验证规则
                rules: {
                    account: [
                        {required: true, message: '账号不能为空', trigger: 'blur'},
                        {min: 5, max: 10, message: '账号的长度需大于4个小于10个', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 1, max: 12, message: '密码的长度需在60 个字符以内', trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 0, max: 60, message: '用户名的长度需在60 个字符以内', trigger: 'blur'}
                    ],
                    sex: [
                        {required: false, message: '性别不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
                        {min: 0, max: 100, message: '邮箱的长度需在100个字符以内', trigger: 'blur'}
                    ],
                    phone: [
                        {min: 0, max: 20, message: '手机的长度需在20个字符以内', trigger: 'blur'}
                    ]
                }
            };
        },
        props: {
            sexMap: {type: Array},
            userTypeMap: {type: Array},
            userStatusMap: {type: Array}
        },
        methods: {
            // 打开创建用户的弹窗
            openCreate () {
                this.dialogVisible = true;
            },
            // 新增完后将信息表单清空
            init () {
              this.$refs.userAddForm.resetFields();
            },
            // 创建新用户
            createSubmit (event) {
                console.log(event);
                this.validate().then(valid => {
                    this.loadingStart();
                    userMainAPI.addUser(this.userData).then(res => {
                        console.log(res);
                        this.loadingEnd();
                        this.$emit('load'); // 新建完刷新表单
                        showMessage('success', '新增用户信息成功!');
                        this.close();
                    }).catch(err => {
                        this.loadingEnd();
                        console.error(err);
                    });
                })
            },
            // 表单验证
            validate () {
              const _this = this;
              var p1 = new Promise(function (resolve, reject) {
                  return _this.$refs.userAddForm.validate((valid) => {
                      if (valid) {
                          resolve();
                      }
                  })
              });
              return p1;
            },
            // 关闭表单弹窗
            close () {
                this.dialogVisible = false;
                this.init();
            },
            // 开始加载的动画
            loadingStart () {
                this.showLoading = true;
            },
            // 结束加载的动画
            loadingEnd () {
                this.showLoading = false;
            }
        }
    }
</script>

<style scoped>

</style>
