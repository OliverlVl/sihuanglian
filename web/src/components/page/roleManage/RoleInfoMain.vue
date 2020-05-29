<template>
    <simple-card style="min-height: 700px" title="角色信息">
        <div slot="right" class="clearfix">
            <el-button v-if="editStatus=='create'" type="success" icon="el-icon-check" circle
                       @click="createSubmit" size="mini"></el-button>
            <el-button v-else-if="editable" type="success" icon="el-icon-check" circle @click="updateSubmit"
                       size="mini"></el-button>
            <el-button v-if="!editable" type="primary" icon="el-icon-edit" circle @click="startEdit"
                       size="mini"></el-button>
            <el-button v-if="editStatus!='create' && editable" icon="el-icon-close" circle
                       @click="editCancel" size="mini"></el-button>
            <el-button v-if="editStatus!='create'" type="danger" icon="el-icon-delete" circle @click="remove"
                       size="mini"></el-button>
        </div>
        <el-form size="small"
                 :rules="rules"
                 :model="roleData"
                 ref="roleForm"
                 v-loading="submitLoading"
                 label-position="right" label-width="100px"
                 class="edit-dialog-form">
            <el-row :gutter="20">
                <el-col :md="24" :sm="24">
                    <el-form-item label="角色名称:" prop="roleName">
                        <el-input v-model="roleData.roleName" v-if="editable"></el-input>
                        <span v-else>{{roleData.roleName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="24" :sm="24">
                    <el-form-item label="角色类型:" prop="userType">
                    <simple-select v-model="roleData.userType"
                                   item-key="value"
                                   :options="typeOptionsList" :disabled="!editable"></simple-select>
                    </el-form-item>
                </el-col>
            
                <el-col :md="24" :sm="24">
                    <el-form-item label="说明:" prop="detail">
                        <el-input v-model="roleData.detail" v-if="editable"></el-input>
                        <span v-else>{{roleData.detail}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </simple-card>
</template>

<script>
    import roleMainAPI from '@/api/manage/roleMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import SimpleCard from '../../common/Card/SimpleCard';
    import SimpleSelect from '../../common/SimpleSelect';

    export default {
        name: 'RoleInfoMain',
        components: {SimpleSelect, SimpleCard},
        props: {
            userTypeMap: {type: Array}
        },
        data () {
            return {
                editStatus: '',
                editable: false,
                submitLoading: false,
                title: {
                    'create': '新增角色',
                    'edit': '修改角色信息'
                },
                typeOptionsList: [],
                groupOptionsList: [],
                dataScopeOptionsList: [],
                roleData: {
                    roleName: '',
                    userType: '',
                    detail: ''
                },
                rules: {
                    roleName: [
                        {required: true, message: '角色名称不能为空', trigger: 'blur'},
                        {min: 0, max: 60, message: '角色名称的长度需在60 个字符以内', trigger: 'blur'}
                    ],
                    userType: [
                        {required: true, message: '角色类型不能为空', trigger: 'blur'}
                    ],
                    detail: [
                        {min: 0, max: 255, message: '说明的长度需在255 个字符以内', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            // baseInfoAPI.getDictMap(['RoleType', 'RoleDataScope']).then(res => {
            //   this.typeOptionsList = res.RoleType;
            //   this.dataScopeOptionsList = res.RoleDataScope;
            // });
            // roleAPI.groupSelect().then(res => {
            //   this.groupOptionsList = res.data;
            // })
            dictionaryMainAPI.getDataItemByType('RoleType').then(res => {
                this.typeOptionsList = res.data;
            });
            this.init();
        },
        methods: {
            // 初始化
            init (code) {
                // if (this.$refs.roleForm !== undefined) {
                //     this.$refs.roleForm.resetFields();
                // }
                if (code === undefined) {
                    this.roleData = {}
                    return;
                }
                // this.editStatus = '';
                // this.editable = false;
                this.loadingStart();
                console.log(code)
                roleMainAPI.getById(code).then(res => {
                    console.log(res)
                    this.roleData = res.data;
                }).finally(() => {
                    this.loadingEnd();
                })
            },
            clearForm () {
                this.init();
            },
            openCreate () {
                this.editStatus = 'create';
                this.editable = true;
                this.init();
            },
            validate () {
                const _this = this;
                var p1 = new Promise(function (resolve, reject) {
                    return _this.$refs.roleForm.validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                return p1;
            },
            createSubmit (event) {
                console.log(event);
                const _this = this;
                this.validate().then(valid => {
                    _this.loadingStart();
                    roleMainAPI.addRole(this.roleData).then(res => {
                        console.log(res);
                        _this.loadingEnd();
                        showMessage('success', '新增角色信息成功!');
                        this.refreshTree();
                        this.init(res.data.code);
                        _this.submitLoading = false;
                    }).finally(() => {
                        this.loadingEnd();
                    })
                })
            },
            updateSubmit () {
                this.validate().then(valid => {
                    this.loadingStart();
                    roleMainAPI.editRole(this.roleData).then(res => {
                        console.log(res);
                        this.loadingEnd();
                        this.editable = false;
                        this.refreshTree();
                        showMessage('success', '更新角色信息成功!')
                    }).finally(() => {
                        this.loadingEnd();
                    })
                })
            },
            // 刷新角色树
            refreshTree () {
                this.$emit('refreshTree');
            },
            loadingStart () {
                this.submitLoading = true;
            },
            loadingEnd () {
                this.submitLoading = false;
            },

            // 删除角色
            remove () {
                if (this.roleData.roleId === undefined) {
                    console.log(this.roleData);
                    return;
                }
                const _this = this;
                showSimpleConfirm('是否确定删除角色' + this.roleData.roleName + '?', function () {
                    console.log('confirm');
                    roleMainAPI.remove(_this.roleData.roleId).then(res => {
                        showSuccess('删除角色成功!');
                        _this.refreshTree();
                    })
                }, function () {
                    console.log('cancel');
                    showInfo('取消删除');
                })
            },
            startEdit () {
                this.editable = true;
            },
            editCancel () {
                this.editable = false;
            }
        }
    }
</script>

<style scoped>

</style>
