<template>
    <el-dialog title="数据字典修改"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                ref="dictEditForm"
                :model="dictData"
                size="small"
                :rules="rules"
                v-loading="showLoading"
                label-width="100px"
                label-position="right"
                @keyup.enter.native="editSubmit">
            <el-row :gutter="20">
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数名称:" prop="item_key">
                        <el-input v-model="dictData.item_key" placeholder="请输入参数名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数值:" prop="item_value">
                        <el-input v-model="dictData.item_value" placeholder="请输入参数值"></el-input>
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
        name: 'DictionaryEdit',
        data () {
            return {
                dictData: {},
                dataTypeKeyOptionsList: [
                    {
                        value: 'System',
                        label: '系统参数'
                    }, {
                        value: 'Standard',
                        label: '标准参数'
                    }
                ],
                dialogVisible: false, // 控制添加弹出框是否显示
                showLoading: false, // 控制组件加载动画
                rules: {
                    dataTypeKey: [
                        {required: false, message: '数据类型不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            editSubmit () {
                this.validate().then(valid => {
                    this.loadingStart();
                    console.log('---------')
                    console.log(this.dictData)
                    dictionaryMainAPI.editDictItem(this.dictData).then(res => {
                        // console.log(res.data);
                        this.loadingEnd();
                        this.$emit('load');
                        showMessage('success', '修改数据字典成功!');
                        this.close();
                    }).catch(err => {
                        this.loadingEnd();
                        console.error(err)
                    });
                })
            },
            openEdit (dictData) {
                this.loadingStart();
                dictionaryMainAPI.selectDictionaryDetailById(dictData.detail_id).then(res => {
                    this.loadingEnd();
                    this.dictData = res.data;
                }).catch(err => {
                    this.loadingEnd();
                    console.error(err)
                });
                this.dialogVisible = true;
            },
            // 关闭表单弹窗
            close () {
                this.dialogVisible = false;
                this.init();
            },
            validate () {
                const _this = this;
                var p1 = new Promise(function (resolve, reject) {
                    return _this.$refs.dictEditForm.validate((valid) => {
                        if (valid) { resolve(); }
                    })
                });
                return p1;
            },
            // 修改完后将信息表单清空
            init () {
                this.$refs.dictEditForm.resetFields();
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
