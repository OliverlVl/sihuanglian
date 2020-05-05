<template>
    <div>
    <el-table
            class="user-manage-table"
            :data="userInfoList"
            @row-click="rowClick"
            @row-dblclick="rowDblClick"
            v-loading="tableLoading"
            fit highlight-current-row stripe
            size="mini"
            :default-sort="{prop: 'account', order: 'ascending'}">
        <el-table-column prop="account" label="账号" align="center" width="120" sortable></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center" width="120"></el-table-column>
        <el-table-column prop="status"  width="120"
                         label="状态"
                         align="center"
                         :filters="userStatusMap"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'Disabled_SYS' ? 'danger' : 'success'"
                        close-transition >{{ setUserStatus(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center" width="70" sortable>
            <template slot-scope="scope">
                <span>{{sexText(scope.row.sex)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role"
                         width="200"
                         label="用户角色"
                         align="center">
            <template slot-scope="scope">
                <span>{{setUserRole(scope.row.role)}}</span>
            </template>
            <!--<template slot-scope="scope">-->
                <!--<div v-for="item in scope.row.role" :key="item" class="role-name-tag">-->
                    <!--<el-tag type="warning" close-transition >{{ setUserRole(item) }}</el-tag>-->
                <!--</div>-->
            <!--</template>-->
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="openEdit(scope.row)">编辑</el-button>
                <el-button type="primary"
                        size="mini"
                        @click="openResetPass(scope.row)">重置密码</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import userMainAPI from '@/api/manage/userMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'UserTable',
        data () {
            return {
                tableList: [],
                tableLoading: false,
                selectRow: undefined
            }
        },
        props: {
            rowDblClick: {
                type: Function,
                default () {
                }
            },
            search: {type: Object},
            sexMap: {type: Array},
            userTypeMap: {type: Array},
            userStatusMap: {type: Array}
        },
        computed: {
            userInfoList () {
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                let tmpList = this.tableList.filter((item) => {
                    return this.checkStringIn(item.account, this.search.query.text) ||
                        this.checkStringIn(item.userName, this.search.query.text) ||
                        this.checkStringIn(item.phone, this.search.query.text)
                    // return true;
                })
                let total = tmpList.length;
                this.search.total = total;
                return tmpList.slice((page - 1) * pageSize, page * pageSize > total ? total : page * pageSize);
            },
            tableIndex () {
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                return pageSize * (page - 1);
            }
        },
        created () {
            this.load();
        },
        methods: {
            // 加载用户列表
            load () {
                this.tableLoading = true;
                userMainAPI.getAllList().then(res => {
                    this.tableLoading = false;
                    console.log(res);
                    this.tableList = res.data.sort(function (a, b) {
                        return b.account - a.account;
                    })
                }).catch(() => {
                    this.tableLoading = false;
                });
            },
            getSelected () {
                return this.selectRow;
            },
            rowClick (row) {
                this.selectRow = row;
            },
            // 将性别英文转为中文
            sexText (sex) {
                // this.$utils.format.mapTransfer(sex, this.sexMap, '女');
                for (let item of this.sexMap) {
                    if (item.value === sex) {
                        return item.text;
                    }
                }
                return '女'
            },
            // 将用户状态英文转为中文
            setUserStatus (status) {
                for (let item of this.userStatusMap) {
                    if (item.value === status) {
                        return item.text;
                    }
                }
                return '未定义';
            },
            formatter (row, column) {
                return row.address;
            },
            filterTag (value, row) {
                return row.status === value;
            },
            // 角色过滤器 value是要搜索的值  row是当前行的信息
            filterRole (value, row) {
                var userType = row.userType;
                for (var i = 0; i < userType.length; i++) {
                    if (userType[i] === value) {
                        return row.userType[i] === value;
                    }
                }
                // console.log(row.userType)
            },
            // 将用户角色英文转为中文
            setUserRole (role) {
                // console.log(role)
                let roleSpan = '';
                if (role === null) return '暂无角色';
                for (var i = 0; i < role.length; i++) {
                    roleSpan += role[i].roleName;
                    if (i === role.length - 1) {
                        return roleSpan;
                    }
                    roleSpan += '|';
                }
                return roleSpan;
                // return '用户';
            },
            // 打开编辑窗口
            openEdit (row) {
                this.$emit('openEdit', row);
            },
            // 重置密码
            openResetPass (row) {
                const _this = this;
                showSimpleConfirm('是否确定确定重置账号' + row.account + ' 的密码？(8888)', function () {
                    // console.log('confirm');
                    userMainAPI.resetPassword(row.id).then(res => {
                        showSuccess('重置密码成功!');
                        _this.load();
                    })
                }, function () {
                    showInfo('取消重置密码');
                })
            },
            checkStringIn (a, tmp) {
                if (a === undefined || a === null) return false;
                return a.indexOf(tmp) >= 0;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .user-manage-table{
        .role-name-tag{
            display: inline-flex;
        }
        .role-name-tag:not(:first-child){
            margin-left: 10px;
        }
    }
</style>
