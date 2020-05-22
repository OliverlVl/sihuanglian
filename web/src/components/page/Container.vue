<template>
    <div class="app">
        <el-container>
            <el-aside class="app-side app-side-left"
                      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <checkin-sidebar></checkin-sidebar>
            </el-aside>

            <el-container>
                <el-header class="app-header">
                    <checkin-navbar></checkin-navbar>
                </el-header>

                <el-main class="app-body">
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </el-main>
                <el-footer class="app-footer">Copyright © 第9小组</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import CheckinSidebar from './sidebar/CheckinSidebar';
    import CheckinNavbar from './sidebar/CheckinNavbar'

    export default {
        name: 'home',
        components: {
            CheckinSidebar, CheckinNavbar
            // HelloWorld
        },
        computed: {
            isCollapse () {
                return this.$store.state.app.sidebar.isCollapse
            }
        },
        data () {
            return {
                username: ''
            }
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect (key, keyPath) {
                console.log(key, keyPath);
            },
            mounted: function () {
                let user = sessionStorage.getItem('user');
                if (user) {
                    this.username = user;
                }
            }
        }
    }
</script>
