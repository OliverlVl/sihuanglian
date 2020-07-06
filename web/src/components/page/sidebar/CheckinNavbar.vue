<template>
    <div class="navbar-container">
        <!-- <div class="left-toggle" @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
        <checkin-breadcrumb></checkin-breadcrumb>
        <div class="app-header-userinfo">
            
        </div> -->
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
            // console.log(this.$store.state.user);
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
