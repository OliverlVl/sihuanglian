<template>
    <el-dialog title="键值修改"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                ref="dataSelEditForm"
                :model="dataSelectData"
                size="small"
                :rules="rules"
                v-loading="showLoading"
                label-width="100px"
                label-position="right"
                @keyup.enter.native="editSubmit">
            <el-row :gutter="20">

                <el-col :md="12" :sm="24">
                    <el-form-item label="经验:">
                        <el-input v-model="dataSelectData.exp"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :md="12" :sm="24">
                    <el-form-item label="距离:">
                        <el-input v-model="dataSelectData.distance"></el-input>
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
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'DataSelectEdit',
        data () {
            return {
                dataSelectData: {
                //    exp:'',
                //    distance:''
                },
                dialogVisible: false, // 控制添加用户的弹出框是否显示
                showLoading: false, // 控制组件加载动画
                // 状态下拉框内容
                statusOptionsList: [
                    {
                        value: 'Normal',
                        label: '正常'
                    }, {
                        value: 'Disabled',
                        label: '禁用'
                    }
                ],
                // 验证规则
                rules: {
                    // account: [
                    //     {required: true, message: '账号不能为空', trigger: 'blur'},
                    //     {min: 5, max: 10, message: '账号的长度需大于4个小于10个', trigger: 'blur'}
                    // ]
                }
            }
        },
        methods: {
            // 提交表单
            editSubmit () {
                this.validate().then(valid => {
                    this.loadingStart();
                    console.log(this.dataSelectData)
                    dictionaryMainAPI.editDataItem(this.dataSelectData).then(res => {
                        // console.log(res);
                        this.loadingEnd();
                        this.$emit('load');
                        showMessage('success', '修改成功!');
                        this.close();
                    }).catch(err => {
                        this.loadingEnd();
                        console.error(err)
                    });
                })
            },
            // 打开编辑用户信息窗口
            openEdit () {
                
                this.loadingStart();
                
                dictionaryMainAPI.getDataInfo().then(res => {
                    console.log(res)
                    this.dataSelectData = res.data;
                    this.loadingEnd();
                }).catch(err => {
                    this.loadingEnd();
                    console.error(err);
                });
                this.dialogVisible = true;
            },
            // 表单验证
            validate () {
                const _this = this;
                var p1 = new Promise(function (resolve, reject) {
                    return _this.$refs.dataSelEditForm.validate((valid) => {
                        if (valid) { resolve(); }
                    })
                });
                return p1;
            },
            // 修改完后将信息表单清空
            init () {
                this.$refs.dataSelEditForm.resetFields();
            },
            // 关闭表单弹窗
            close () {
                this.dialogVisible = false;
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
