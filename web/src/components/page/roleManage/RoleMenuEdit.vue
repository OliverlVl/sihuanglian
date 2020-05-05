<template>
    <simple-card style="min-height: 700px" title="菜单权限">
        <div slot="right" class="clearfix">
            <el-button type="success" icon="el-icon-refresh"
                       circle @click="refresh" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-check" circle
                       @click="change" size="mini"></el-button>
        </div>
        <el-tree
                ref="roleMenuTree"
                :data="treeData"
                v-loading="loading"
                node-key="id"
                show-checkbox
                highlight-current
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
        </el-tree>
    </simple-card>
</template>

<script>
    import menuMainAPI from '@/api/manage/menuMainAPI'
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';
    import SimpleCard from '../../common/Card/SimpleCard';

    export default {
        name: 'RoleMenuEdit',
        components: {SimpleCard},
        props: {
            roleId: {},
            roleName: {},
            editable: {
                default: false
            }
        },
        watch: {
            roleId () {
                this.init();
            }
        },
        data () {
            return {
                treeData: [],
                loading: false
            }
        },
        created () {
            this.init();
        },

        methods: {
            init: function () {
                console.log(this.roleId);
                this.loading = true;
                menuMainAPI.getMenuTree().then(res => {
                    this.treeData = res.data;
                    this.loading = false;
                })

                if (this.roleId !== undefined &&
                    this.roleId != null && this.roleId !== '') {
                    menuMainAPI.getRoleMenus(this.roleId).then(res => {
                        let list = [];
                        for (let t of res.data) {
                            list.push(this.findMenuKey(this.treeData, t.id));
                        }
                        this.$refs.roleMenuTree.setCheckedKeys(list);
                    });
                }
            },
            refresh () {
                if (this.roleId === '' || this.roleId === undefined) {
                    showMessage('error', '请先选择角色');
                    return;
                }
                this.init();
            },
            change: function () {
                console.log('修改角色菜单');
                console.log(this.$refs.roleMenuTree.getCheckedNodes());
                if (this.roleId === '' || this.roleId === undefined) {
                    showMessage('error', '请先选择角色');
                }
                let list = this.$refs.roleMenuTree.getCheckedNodes();
                let menuList = [];
                for (let tmp of list) {
                    menuList.push(tmp.id);
                }
                menuMainAPI.updateRoleMenu(this.roleId, menuList).then(res => {
                    console.log(res.data);
                    // let IDList = [];
                    // res.data.forEach(t => {
                    //     IDList.push(t.menuID);
                    // })
                    this.$refs.roleMenuTree.setCheckedKeys(menuList);
                    showMessage('success', '修改角色菜单成功!');
                })
            },
            handleNodeClick (node) {
                console.log(node);
                this.$emit('selectMenu', node);
            },
            findMenuKey (list, id) {
                for (let tmp of list) {
                    if (tmp.menuId === id) return tmp.id;
                    let tId = this.findMenuKey(tmp.children, id)
                    if (tId !== undefined) {
                        return tId
                    }
                }
                return undefined;
            }
        }
    }
</script>

<style scoped>

</style>
