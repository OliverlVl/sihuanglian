<template>
    <div class="navbar-container">
        <div class="left-toggle" @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
        <checkin-breadcrumb></checkin-breadcrumb>
        <div class="app-header-userinfo">
            <el-dropdown trigger="hover" :hide-on-click="false">
                <span class="el-dropdown-link">
                    用户：{{ userName }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
                    <!-- <el-dropdown-item>设置</el-dropdown-item> -->
                    <!-- <el-dropdown-item divided @click.native="logout">退出登录
                    </el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    import CheckinBreadcrumb from '../../common/CheckinBreadcrumb';
    export default {
        name: 'CheckinNavbar',
        components: {CheckinBreadcrumb},
        data () {
            return {
                userName: this.$store.state.user.userName
            }
        },
        computed: {
            isCollapse () {
                return this.$store.state.app.sidebar.isCollapse
            }
            // userName () {
            //     console.log(this.$store.state)
            //     // return this.$store.state.user.userName
            // }
        },
        created () {
            console.log(this.$store.state.user);
        },
        methods: {
            toggleSideBar () {
                this.$store.dispatch('toggleSideBar');
            },
            logout: function () {
                this.$confirm('确认退出?', '提示', {})
                    .then(() => {
                            // this.$store.dispatch('LogOut').then(() => {
                            
                            this.$router.push({path: '/login'});
                           
                        
                    // }).catch(() => {});
            })
        }
    }}
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .left-toggle {
        width: 30px;
        cursor: pointer;
        display: block;
        float: left;
        line-height: 60px;
    }
</style>
