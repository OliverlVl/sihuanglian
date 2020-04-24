<template>
    <el-dialog title="数据字典添加"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                ref="dictAddForm"
                :model="dictData"
                size="small"
                :rules="rules"
                v-loading="showLoading"
                label-width="100px"
                label-position="right"
                @keyup.enter.native="addSubmit">
            <el-row :gutter="20">
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数名称:" prop="dataValue">
                        <el-input v-model="dictData.dataValue" placeholder="请输入参数名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数Key:" prop="dataKey">
                        <el-input v-model="dictData.dataKey" placeholder="请输入参数key值"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :md="24" :sm="24">
                    <el-form-item label="描述:" prop="dataDesc">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="dictData.dataDesc"></el-input>
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
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'DictionaryAdd',
        data () {
            return {
                dictData: {},
                // dataTypeKeyOptionsList: [
                //     {
                //         value: 'System',
                //         label: '系统参数'
                //     }, {
                //         value: 'Standard',
                //         label: '标准参数'
                //     }
                // ],
                dialogVisible: false, // 控制添加弹出框是否显示
                showLoading: false, // 控制组件加载动画
                // rules: {
                //     dataTypeKey: [
                //         {required: true, message: '数据类型不能为空', trigger: 'blur'}
                //     ]
                // }
            }
        },
        methods: {
            openCreate () {
                this.dialogVisible = true;
            },
            // 新增完后将信息表单清空
            init () {
                this.$refs.dictAddForm.resetFields();
            },
            createSubmit (event) {
                console.log(event);
                this.validate().then(valid => {
                    this.loadingStart();
                    dictionaryMainAPI.addDict(this.dictData).then(res => {
                        console.log(res);
                        this.loadingEnd();
                        this.$emit('load'); // 新建完刷新表单
                        showMessage('success', '新增数据字典成功!');
                        this.close();
                    }).catch(err => {
                        this.loadingEnd();
                        console.error(err);
                    });
                })
            },
            validate () {
                const _this = this;
                var p1 = new Promise(function (resolve, reject) {
                    return _this.$refs.dictAddForm.validate((valid) => {
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
