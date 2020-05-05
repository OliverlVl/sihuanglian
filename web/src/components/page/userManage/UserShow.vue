<template>
    <el-dialog title="用户信息查看"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                :model="userData"
                size="small"
                ref="userShowForm"
                v-loading="showLoading"
                label-width="100px"
                label-position="right">
            <el-row :gutter="20">
                <el-col :md="12" :sm="24">
                    <el-form-item label="账号:" prop="account">
                        {{userData.account}}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="用户名:" prop="userName">
                        {{userData.userName}}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="性别:" prop="sex">
                        {{userData.sex}}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="邮箱:" prop="email">
                        {{userData.email}}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="手机:" prop="phone">
                        {{userData.phone}}
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="用户状态:" prop="status">
                        <el-tag :type="userData.status === 'Disabled' ? 'danger' : 'success'">{{setUserStatus(userData.status)}}</el-tag>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">关 闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import userMainAPI from '@/api/manage/userMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'UserShow',
        data () {
            return {
                userData: {},
                dialogVisible: false, // 控制添加用户的弹出框是否显示
                showLoading: false // 控制组件加载动画
            }
        },
    methods: {
        openShow (userId) {
            console.log(userId)
            this.loadingStart();
            userMainAPI.getUser(userId).then(res => {
                this.userData = res.data;
                this.loadingEnd();
            }).catch(err => {
                this.loadingEnd();
                console.error(err);
            });
            this.dialogVisible = true;
        },
        // 关闭表单弹窗
        close () {
            this.dialogVisible = false;
        },
        // 将用户状态英文转为中文
        setUserStatus (status) {
            if ('Disabled' === status) {
                return '禁用';
            }
            return '正常';
        },
        open (userId) {
            console.log(userId)
            this.openShow(userId);
            this.dialogVisible = true;
        },
        loadingStart () {
            this.showLoading = true;
        },
        loadingEnd () {
            this.showLoading = false;
        }
    }
    }
</script>

<style scoped>

</style>
