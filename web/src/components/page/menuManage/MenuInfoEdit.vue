<template>
    <el-card  class="card-no-border" shadow="never">
        <div slot="header" class="clearfix">
            <card-title title="菜单信息">
                <el-row slot="right">
                    <!--新增提交-->
                    <el-button v-if="editStatus==='create'" type="success" icon="el-icon-check" circle @click="createSubmit" size="mini"></el-button>
                    <!--修改提交-->
                    <el-button v-if="editStatus==='edit'" type="success" icon="el-icon-check" circle @click="updateSubmit" size="mini"></el-button>
                    <!--开始编辑-->
                    <el-button v-if="editStatus==='show'&& menuData.menuURL!==''" type="primary" icon="el-icon-edit" circle @click="startEdit" size="mini"></el-button>
                    <!--编辑取消-->
                    <el-button v-if="editStatus==='create' || editStatus==='edit'" icon="el-icon-close" circle @click="editCancel" size="mini"></el-button>
                    <!--删除-->
                    <el-button v-if="editStatus!=='create' && menuData.menuURL!==''" type="danger" icon="el-icon-delete" circle @click="remove" size="mini"></el-button>
                </el-row>
            </card-title>
        </div>
        <el-form size="small"
                 :rules="rules"
                 :model="menuData"
                 ref="menuForm"
                 v-loading="submitLoading"
                 label-position="right" label-width="100px"
                 class="edit-dialog-form">
            <el-row :gutter="20">
                <el-col :md="12" :sm="24">
                    <el-form-item label="菜单代码:" prop="menuValue">
                        <el-input v-model="menuData.menuValue" v-if="editStatus==='create'"></el-input>
                        <span v-else>{{menuData.menuValue}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="菜单名称:" prop="menuName">
                        <el-input v-model="menuData.menuName" v-if="editStatus==='create' || editStatus==='edit'"></el-input>
                        <span v-else>{{menuData.menuName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="菜单路径:" prop="menuURL">
                        <el-input v-model="menuData.menuURL" v-if="editStatus==='create' || editStatus==='edit'"></el-input>
                        <span v-else>{{menuData.menuURL}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="菜单图标:" prop="icon">
                        <el-input v-model="menuData.icon" v-if="editStatus==='create' || editStatus==='edit'"></el-input>
                        <span v-else>{{menuData.icon}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="是否开启:" prop="menuStatus">
                        <el-switch v-model="menuData.menuStatus" :disabled="!(editStatus==='create' || editStatus==='edit')"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="顺序:" prop="sequence">
                        <el-input-number v-model="menuData.sequence" v-if="editStatus==='create' || editStatus==='edit'"></el-input-number>
                        <span v-else>{{menuData.sequence}}</span>
                    </el-form-item>
                </el-col>
                <el-col :md="12" :sm="24">
                    <el-form-item label="上级菜单:" prop="parent">
                        <simple-select v-model="menuData.parentMenuId"
                                       itemKey="id"
                                       :options="parentOptionsList"
                                       :disabled="!(editStatus==='create' || editStatus==='edit')"></simple-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script>
    import menuMainAPI from '../../../api/manage/menuMainAPI'
    import CardTitle from '../../common/Card/CardTitle';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';
    import SimpleSelect from '../../common/SimpleSelect';

    export default {
        name: 'MenuInfoEdit',
        components: {SimpleSelect, CardTitle},
        data () {
            return {
                editStatus: '', // edit编辑状态   create创建状态  show展示状态
                editable: false,
                parentOptionsList: [],
                submitLoading: false,
                title: {
                    'create': '新增系统菜单',
                    'edit': '修改系统菜单信息'
                },
                menuData: {
                    menuValue: '',
                    menuName: '',
                    menuURL: '',
                    sequence: 0,
                    parentMenuId: '',
                    menuStatus: true,
                    icon: ''
                },
                rules: {
                    menuValue: [
                        {required: true, message: '菜单代码不能为空', trigger: 'blur'},
                        {min: 0, max: 30, message: '菜单代码的长度需在30个字符以内', trigger: 'blur'}
                    ],
                    menuName: [
                        {required: true, message: '菜单名称不能为空', trigger: 'blur'},
                        {min: 0, max: 60, message: '菜单名称的长度需在60 个字符以内', trigger: 'blur'}
                    ],
                    menuURL: [
                        {required: true, message: '菜单路径不能为空', trigger: 'blur'},
                        {min: 0, max: 255, message: '菜单路径的长度需在255 个字符以内', trigger: 'blur'}
                    ],
                    sequence: [
                        {required: true, message: '顺序不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            menuMainAPI.allMenu().then(res => {
                this.parentOptionsList = res.data;
            })
        },
        methods: {
            // 初始化
            init (code) {
                if (this.$refs.menuForm !== undefined) {
                    this.$refs.menuForm.resetFields();
                }
                if (code === '') {
                    // 初始化
                    this.menuData = {
                        menuValue: '',
                        menuName: '',
                        menuURL: '',
                        sequence: 0,
                        parentMenuId: '',
                        menuStatus: true,
                        icon: ''
                    };
                    return;
                }
                this.menuData.menuValue = code;
                this.editStatus = 'show';
                this.loadingStart();
                menuMainAPI.getMenuByKey(code).then(res => {
                    console.log(res)
                    this.menuData = res.data;
                    this.loadingEnd();
                }).finally(() => {
                    this.loadingEnd();
                });
            },
            openCreate () {
                this.editStatus = 'create';
                this.init('');
                // 初始化菜单选择
                menuMainAPI.getSelectMenu().then(res => {
                    this.parentOptionsList = res.data;
                })
            },
            openEdit (row) {
                this.editStatus = '';
                this.init(row.code);
            },

            validate () {
                const _this = this;
                var p1 = new Promise(function (resolve, reject) {
                    return _this.$refs.menuForm.validate((valid) => {
                        if (valid) {
                            resolve();
                        }
                    })
                });
                return p1;
            },
            createSubmit (event) {
                console.log(event);
                this.validate().then(valid => {
                    this.loadingStart();
                    menuMainAPI.save(this.menuData).then(res => {
                        this.loadingEnd();
                        this.refreshTree();
                        showMessage('success', '新增系统菜单信息成功!');
                        this.openCreate();
                    }).finally(() => {
                        this.loadingEnd();
                    });
                })
            },
            updateSubmit () {
                this.validate().then(valid => {
                    this.loadingStart();
                    let {id, menuValue, menuName, menuUrl, parentMenuId, sequence, parent, menuStatus, icon} = this.menuData;
                    menuMainAPI.update({id, menuValue, menuName, menuUrl, parentMenuId, sequence, parent, menuStatus,icon}).then(res => {
                        // console.log(res);
                        this.loadingEnd();
                        this.refreshTree();
                        this.editStatus = 'show';
                        this.init(this.menuData.menuValue);
                        showMessage('success', '更新系统菜单信息成功!');
                    }).finally(() => {
                        this.loadingEnd();
                    });
                })
            },
            loadingStart () {
                this.submitLoading = true;
            },
            loadingEnd () {
                this.submitLoading = false;
            },
            // 刷新菜单树
            refreshTree () {
                this.$emit('refreshTree');
            },
            // 删除菜单
            remove () {
                console.log(this.menuData);
                if (this.menuData.id === undefined) return;
                const _this = this;
                _this.$utils.message.showSimpleConfirm('是否确定删除菜单' + this.menuData.menuName + '?', function () {
                    console.log('confirm');
                    menuMainAPI.remove(_this.menuData.id).then(res => {
                        _this.editStatus = 'show';
                        _this.init('');
                        _this.refreshTree();
                    })
                }, function () {
                    console.log('cancel');
                    showInfo('取消删除');
                })
            },
            startEdit () {
                this.editStatus = 'edit';
            },
            editCancel () {
                this.editStatus = 'show';
                this.init(this.menuData.menuValue);
            }
        }
    }
</script>

<style scoped>

</style>
