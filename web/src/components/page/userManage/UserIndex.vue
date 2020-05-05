<template>
    <div class="user-manage-index">
        <page-header title="用户信息管理"></page-header>
        <container-search-group>
            <el-form :inline="true" :model="search" ref="userSearchForm" size="mini" >
                <!--<el-form-item label="账号" prop="number">-->
                    <!--<el-input v-model="search.query.courseNumber" placeholder="账号"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="用户名" prop="name">-->
                    <!--<el-input v-model="search.query.courseName" placeholder="用户名"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="搜索：" prop="searchText">
                    <el-input placeholder="请输入用户名或其他信息" prefix-icon="el-icon-search" v-model="search.query.text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
                    <!--<el-button @click="resetForm('userSearchForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </container-search-group>

        <div class="tool-wrapper">
            <el-button-group>
                <el-button type="primary" icon="el-icon-plus" @click="createOpen" size="mini">新增</el-button>
                <el-button type="primary" icon="el-icon-user-solid" @click="roleAssignmentOpen" size="mini">角色分配</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="removeOpen" size="mini">删除</el-button>
            </el-button-group>
        </div>

        <user-table :search="search"
                    :rowDblClick="showOpen"
                    ref="UserTable"
                    @openEdit="openEdit"
                    :sexMap="sexMap"
                    :userTypeMap="userTypeMap"
                    :userStatusMap="userStatusMap">
        </user-table>
        <Pagination
                :size-change="handleSizeChange"
                :pageData="search"
                :current-change="handleCurrentChange"
                :sexMap="sexMap"
                :userTypeMap="userTypeMap"
                :userStatusMap="userStatusMap">
        </Pagination>
        <user-edit ref="UserEdit" @load="load"
                   :sexMap="sexMap"
                   :userTypeMap="userTypeMap"
                   :userStatusMap="userStatusMap">
        </user-edit>
        <user-show ref="UserShow"
                   :sexMap="sexMap"
                   :userTypeMap="userTypeMap"
                   :userStatusMap="userStatusMap">
        </user-show>
        <user-add ref="UserAdd" @load="load"
                  :sexMap="sexMap"
                  :userTypeMap="userTypeMap"
                  :userStatusMap="userStatusMap">
        </user-add>
        <user-role ref="UserRole"></user-role>
    </div>
</template>

<script>
    import ContainerSearchGroup from '../../common/ContainerSearchGroup';
    import UserTable from './UserTable';
    import Pagination from '../../common/Pagination';
    import UserEdit from './UserEdit';
    import PageHeader from '../../common/PageHeader';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';
    import UserShow from './UserShow';
    import UserAdd from './UserAdd';
    import userMainAPI from '@/api/manage/userMainAPI';
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import UserRole from './UserRole';
    export default {
        name: 'UserIndex',
        components: {UserRole, UserAdd, UserShow, UserEdit, UserTable, PageHeader, Pagination, ContainerSearchGroup},
        data () {
            return {
                search: {
                    query: {
                        text: ''
                    },
                    sort: {
                        prop: 'account', order: 'ascending'
                    },
                    page: this.$store.state.app.default.page,
                    pageSize: this.$store.state.app.default.pageSize,
                    total: 0
                },
                tableLoading: false,
                userTypeMap: [],
                sexMap: [],
                userStatusMap: []
            }
        },
        created () {
            this.getBaeInfo();
        },
        methods: {
            // 加载用户列表
            load () {
              this.$refs.UserTable.load();
            },
            // 获取选择列
            getSelected () {
                var row = this.$refs.UserTable.getSelected();
                if (row === undefined) {
                    showMessage('error', '请先选择一个用户');
                }
                return row;
            },
            getBaeInfo () {
                // 获取用户角色数据字典
                dictionaryMainAPI.getDataItemByType('userType').then(res => {
                    this.userTypeMap = res.data;
                }).catch(err => {
                    console.error(err)
                });
                // 获取性别数据字典
                dictionaryMainAPI.getDataItemByType('sex').then(res => {
                    this.sexMap = res.data;
                }).catch(err => {
                    console.error(err)
                });
                // 获取用户状态数据字典
                dictionaryMainAPI.getDataItemByType('userStatus').then(res => {
                    this.userStatusMap = res.data;
                }).catch(err => {
                    console.error(err)
                });
            },
            // 打开角色分配
            roleAssignmentOpen () {
                this.$refs.UserRole.openEdit();
            },
            // 打开创建用户页面
            createOpen () {
                this.$refs.UserAdd.openCreate();
            },

            // 打开编辑用户页面
            openEdit (row) {
                this.$refs.UserEdit.openEdit(row.id);
            },

            // 删除用户
            removeOpen () {
                var row = this.getSelected();
                if (row === undefined) {
                    return;
                }
                const _this = this;
                showSimpleConfirm('是否确定删除用户' + row.userName + '?', function () {
                    userMainAPI.deleteUser(row.id).then(res => {
                        showSuccess('删除用户成功!');
                        _this.load();
                    })
                }, function () {
                    showInfo('取消删除');
                })
            },

            // 打开查看用户页面
            showOpen (row) {
                this.$refs.UserShow.open(row.id);
            },

            // 查询
            query () {
                this.search.page = 1;
                this.load();
            },

            // 页面显示条目数量切换
            handleSizeChange (val) {
                this.search.pageSize = val;
                this.search.page = 1;
                this.load();
            },

            // 页面切换
            handleCurrentChange (val) {
                this.search.page = val;
                this.load();
            },
            // 重置搜索表单
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
