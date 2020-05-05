<template>
    <el-dialog title="用户角色分配"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-col :md="12" :sm="24">
            <el-form-item label="账号:" prop="account">
                {{userData.account}}
                <!--<el-input name="account" v-model="userData.account"></el-input>-->
            </el-form-item>
            <!--<p style="padding-left: 54px;margin-top: 10px"><span style="font-weight: 600;margin-right: 5px;">账号：</span>{{userData.account}}</p>-->
        </el-col>
    </el-dialog>
</template>

<script>
    export default {
        name: 'UserRole'
    }
</script>

<style scoped>

</style>
