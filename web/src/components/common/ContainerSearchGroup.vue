<template>
    <div class="container-search-box">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ContainerSearchGroup'
    }
</script>

<style rel="stylesheet/less" lang="less">
    .container-search-box{
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
        /*padding: 15px;*/
        margin: 0 auto;
        /*border-bottom: 1px solid #EBEEF5;*/
        /*text-align: center;*/
    }
</style>
