<template>
    <el-tree
            :data="treeData"
            v-loading="loading"
            node-key="id"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick">
    </el-tree>
</template>

<script>
    import menuMainAPI from '../../../api/manage/menuMainAPI'
    export default {
        name: 'MenuTree',
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
                this.loading = true;
                menuMainAPI.getMenuTree().then(res => {
                    this.treeData = res.data;
                    this.loading = false;
                })
            },
            handleNodeClick (node) {
                console.log(node);
                this.$emit('selectMenu', node);
            }
        }
    }
</script>

<style scoped>

</style>
