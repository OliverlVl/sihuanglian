<template>
    <div class="main-wrapper">
        <el-row class="card-flex">
            <simple-card position="left" title="角色列表">
                <template slot="right">
                    <el-button v-show="!editVisible" icon="el-icon-refresh" type="text"
                               @click="loadRoleTree">刷新</el-button>
                    <el-button v-show="!editVisible" icon="el-icon-plus" type="text"
                               @click="addRole">新增</el-button>
                </template>
                <system-role-tree :handleNodeClick="selectRole" ref="roleTree"></system-role-tree>
            </simple-card>
            <simple-card position="right" hide-title style="border: none;" :body-style="{paddingTop:0,paddingBottom:0}">
                <el-row  :gutter="20">
                    <el-col :md="24" :sm="24">
                        <role-info-main ref="roleInfoMain" @refreshTree="loadRoleTree" :userTypeMap="userTypeMap"></role-info-main>
                    </el-col>
                    
                </el-row>
            </simple-card>
        </el-row>
    </div>
</template>
<script>
    import SimpleCard from '../../common/Card/SimpleCard';
    import SystemRoleTree from './SystemRoleTree';
    import RoleInfoMain from './RoleInfoMain';

    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';

    export default {
        name: 'RoleMainIndex',
        components: { RoleInfoMain, SystemRoleTree, SimpleCard },
        data () {
            return {
                editVisible: false,
                loading: false,
                activeName: 'role',
                roleSelected: false,
                roleID: '',
                role_name: '',
                userTypeMap: []
            }
        },
        created () {
        },
        methods: {
            getBaeInfo () {
                dictionaryMainAPI.selectDictionaryDetail('userType').then(res => {
                    this.userTypeMap = res.data;
                }).catch(err => {
                    console.error(err)
                });
            },
            selectRole (node) {
                // console.log(node);
                this.$refs.roleInfoMain.getselected(node)
                
            },
            addRole () {
                this.$refs.roleInfoMain.openCreate();
                this.roleSelected = false;
                this.activeName = 'role';
            },
            loadRoleTree: function () {
                this.$refs.roleTree.init();
            }
        }
    }
</script>

<style scoped>

</style>
