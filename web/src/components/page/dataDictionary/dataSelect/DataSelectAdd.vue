<template>
    <el-dialog title="数据字典键值添加"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false">
        <el-form
                ref="dataSelAddForm"
                :model="dataSelData"
                size="small"
                :rules="rules"
                v-loading="showLoading"
                label-width="100px"
                label-position="right"
                @keyup.enter.native="addSubmit">
            <el-row :gutter="20">
                <!--<el-col :md="12" :sm="24">-->
                    <!--<el-form-item label="字典名称:" prop="dataValue">-->
                        <!--{{dataSelData.dictionary.dataValue}}-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :md="12" :sm="24">-->
                    <!--<el-form-item label="字典key:" prop="dictionary">-->
                        <!--{{dataSelData.dictionary.dataKey}}-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数名称:" prop="contentValue">
                        <el-input v-model="dataSelData.contentValue"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="参数值:" prop="contentKey">
                        <el-input v-model="dataSelData.contentKey"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="序列:" prop="sequence">
                        <el-input v-model="dataSelData.sequence"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="状态:" prop="status">
                        <el-select v-model="dataSelData.status">
                            <el-option v-for="item in statusOptionsList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                                       placeholder="请选择">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :md="24" :sm="24">
                    <el-form-item label="描述:" prop="describe">
                        <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入内容"
                                v-model="dataSelData.describe"></el-input>
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
        name: 'DataSelectAdd',
        data () {
            return {
                dialogVisible: false, // 控制添加弹出框是否显示
                showLoading: false, // 控制组件加载动画
                rules: {
                    contentValue: [
                        {required: true, message: '值不能为空', trigger: 'blur'}
                    ],
                    contentKey: [
                        {required: true, message: '键不能为空', trigger: 'blur'}
                    ],
                    sequence: [
                        {required: true, message: '序列不能为空', trigger: 'blur'}
                    ]
                },
                dataSelData: {
                    status: 'Normal',
                    dicID: '',
                    dictionary: {}
                },
                // 状态下拉框内容
                statusOptionsList: [
                    {
                        value: 'Normal',
                        label: '正常'
                    }, {
                        value: 'Disabled',
                        label: '禁用'
                    }
                ]
            }
        },
        props: {
            selDicId: {type: Number}
        },
        methods: {
            openCreate () {
                // console.log(this.selDicId);
                this.dialogVisible = true;
            },
            // 新增完后将信息表单清空
            init () {
                this.$refs.dataSelAddForm.resetFields();
            },
            createSubmit (event) {
                this.validate().then(valid => {
                    this.loadingStart();
                    dictionaryMainAPI.addDataItem(this.dataSelData, this.selDicId).then(res => {
                        console.log(res);
                        this.loadingEnd();
                        this.$emit('load'); // 新建完刷新表单
                        showMessage('success', '新增成功!');
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
                    return _this.$refs.dataSelAddForm.validate((valid) => {
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
