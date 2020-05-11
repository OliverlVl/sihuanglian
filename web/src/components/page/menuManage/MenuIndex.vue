<template>
    <el-row class="card-flex">
        <simple-card position="left" title="系统菜单列表">
            <template slot="right">
                <el-button icon="el-icon-refresh" type="text" @click="loadMenuTree"></el-button>
                <el-button icon="el-icon-plus" type="text" @click="addMenu"></el-button>
            </template>
            <menu-tree ref="menuTree" @selectMenu="selectMenu"></menu-tree>
        </simple-card>
        <simple-card position="right" hide-title>
            <menu-info-edit ref="menuInfoEdit" @refreshTree="loadMenuTree"></menu-info-edit>
            <div class="blank-line"></div>
            <menu-role-table ref="menuRoleTable" :menu-id="menuId" v-show="menuRoleVisible"></menu-role-table>
        </simple-card>
    </el-row>
</template>

<script>
    import SimpleCard from '../../common/Card/SimpleCard';
    import MenuTree from './MenuTree';
    import MenuInfoEdit from './MenuInfoEdit';
    import MenuRoleTable from './MenuRoleTable';

    export default {
        name: 'MenuIndex',
        components: {MenuRoleTable, MenuInfoEdit, MenuTree, SimpleCard},
        data () {
            return {
                menuId: '',
                menuRoleVisible: false
            }
        },
        methods: {
            loadMenuTree () {
                this.$refs.menuTree.init();
            },
            selectMenu: function (node) {
                this.$refs.menuInfoEdit.init(node.id);
                this.menuId = node.id;
                this.menuRoleVisible = true;
            },
            addMenu () {
                this.$refs.menuInfoEdit.openCreate();
                this.menuRoleVisible = false;
            }
        }
    }

</script>

<style scoped>

</style>
