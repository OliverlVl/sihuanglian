<template>
    <el-card class="card-no-border" shadow="never">
        <div slot="header" class="clearfix">
            <card-title title="拥有菜单的角色"></card-title>
        </div>
        <el-table
                :data="tableList"
                v-loading="tableLoading"
                stripe border fit highlight-current-row
                :default-sort="{prop: 'createTime', order: 'descending'}"
                size="mini">
            <el-table-column align="center"
                             fixed
                             type="index"
                             width="50">
            </el-table-column>
            <el-table-column align="center"
                             prop="userType"
                             label="角色类型">
            </el-table-column>
            <el-table-column align="center"
                             prop="roleName"
                             label="角色名称">
            </el-table-column>
            <el-table-column align="center"
                             prop="createDate"
                             label="创建时间">
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    import menuMainAPI from '../../../api/manage/menuMainAPI'
    import CardTitle from '../../common/Card/CardTitle';

    export default {
        name: 'MenuRoleTable',
        components: {CardTitle},
        props: {
            menuId: {}
        },
        watch: {
            menuId () {
                this.init();
            }
        },
          data () {
            return {
              tableLoading: false,
              tableList: [{
                createTime: 1534830231614,
                id: 2,
                roleID: 'Basic',
                roleName: '基础角色'
              },
                {
                  createTime: 1534830231614,
                  id: 3,
                  roleID: 'Admin',
                  roleName: '管理员'
                }]
            }
          },
          methods: {
            init () {
              if (this.menuId !== undefined && this.menuId !== '') {
                this.tableLoading = true;
                  menuMainAPI.menuRoleList(this.menuId).then(res => {
                  console.log(res);
                  this.tableList = res.data;
                }).finally(res => {
                  console.log(res);
                  this.tableLoading = false;
                });
              }
            }
          }
    }
</script>

<style scoped>

</style>
