<template>
    <div class="dict-manage-index">
        <container-search-group>
            <el-form :inline="true" :model="search" ref="dictSearchForm" size="mini" >
                <el-form-item label="搜索：" prop="searchText">
                    <el-input placeholder="请输入参数名称或其他信息" prefix-icon="el-icon-search" v-model="search.query.text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
        </container-search-group>

        <div class="tool-wrapper">
            <el-button-group>
                <el-button type="primary" icon="el-icon-plus" @click="createOpen" size="mini">新增</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="removeOpen" size="mini">删除</el-button>
            </el-button-group>
        </div>

        <dictionary-table :search="search"
                          ref="DictionaryTable"
                          @openEdit="openEdit"></dictionary-table>
        <Pagination
                :size-change="handleSizeChange"
                :pageData="search"
                :current-change="handleCurrentChange">
        </Pagination>
        <dictionary-add ref="DictionaryAdd" @load="load"></dictionary-add>
        <dictionary-edit @load="load" ref="DictionaryEdit"></dictionary-edit>
        <!--<dictionary-show></dictionary-show>-->
    </div>
</template>

<script>
    import DictionaryAdd from './DictionaryAdd';
    import DictionaryEdit from './DictionaryEdit';
    import DictionaryTable from './DictionaryTable';
    import Pagination from '../../../common/Pagination';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';
    import ContainerSearchGroup from '../../../common/ContainerSearchGroup';
    import DictionaryShow from './DictionaryShow';
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';

    export default {
        name: 'DictionaryIndex',
        components: {DictionaryTable, DictionaryEdit, DictionaryAdd, Pagination, ContainerSearchGroup},
        data () {
            return {
                search: {
                    query: 
                    // ' ',
                    {
                        text: ' '
                    },
                    sort: {
                        // prop: 'account', order: 'ascending'
                    },
                    page: 1,
                    pageSize: 15,
                    total: 0
                },
                tableLoading: false
            }
        },
        methods: {
            load () {
                this.$refs.DictionaryTable.load();
            },
            // 获取选择列
            getSelected () {
                var row = this.$refs.DictionaryTable.getSelected();
                if (row === undefined) {
                    showMessage('error', '请先选择一个字典');
                }
                // console.log(row);
                return row;
            },
            createOpen () {
                this.$refs.DictionaryAdd.openCreate();
            },
            openEdit (row) {
                // console.log(row)
                this.$refs.DictionaryEdit.openEdit(row);
            },
            removeOpen () {
                var row = this.getSelected();
                if (row === undefined) {
                    return;
                }
                const _this = this;
                showSimpleConfirm('是否确定删除数据字典' + row.dataValue + '?', function () {
                    console.log(row);
                    dictionaryMainAPI.deleteDict(row.id).then(res => {
                        showSuccess('删除数据字典成功!');
                        _this.load();
                    })
                }, function () {
                    showInfo('取消删除');
                })
            },
            // 打开查看页面
            // showOpen (row) {
            //     this.$refs.DictionaryShow.open(row.id);
            // },
            // 查询
            query () {
                this.search.page = 1;
                this.load();
            },

            // 页面显示条目数量切换
            handleSizeChange (val) {
                this.search.pageSize = val;
                this.search.page = 1;
                this.load();
            },

            // 页面切换
            handleCurrentChange (val) {
                this.search.page = val;
                this.load();
            }
        }
    }
</script>

<style scoped>

</style>
