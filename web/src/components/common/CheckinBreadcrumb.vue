<template>
    <el-breadcrumb separator="/" class="app-breadcrumb">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                    v-for="(item,index) in levelList"
                    :key="item.path">
                <template v-if='item.meta.title'>
                      <span v-if="item.redirect == 'noredirect' || index == levelList.length-1"
                            class="no-redirect">
                        {{ (item.meta.title) }}
                      </span>
                    <router-link v-else :to="item.redirect||item.path">
                        {{ (item.meta.title) }}
                    </router-link>
                </template>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    // import {generateTitle} from '@/utils/i18n'

    export default {
        name: 'CheckinBreadcrumb',
        data () {
            return {
                levelList: null
            }
        },
        created () {
            this.getBreadcrumb()
        },
        watch: {
            $route () {
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb () {
                let matched = this.$route.matched.filter(item => item.name);
                const first = matched[0];
                // console.log('Breadcrumb', matched);
                if (first && first.name !== 'home') {
                    matched = [{path: '/home', meta: {title: '首页'}}].concat(matched);
                }
                this.levelList = matched
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 60px;
        margin-left: 10px;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
