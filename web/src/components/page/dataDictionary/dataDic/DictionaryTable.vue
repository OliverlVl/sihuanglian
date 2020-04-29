<template>
    <div>
        <el-table
                class="dict-manage-table"
                :data="dictInfoList"
                @row-click="rowClick"
                @row-dblclick="rowDblClick"
                v-loading="tableLoading"
                fit highlight-current-row stripe
                size="mini"
                :default-sort="{prop: 'id', order: 'descending'}">
            <el-table-column prop="dataValue" label="参数名称" align="center" sortable></el-table-column>
            <el-table-column prop="dataKey" label="参数key" align="center" ></el-table-column>

            <el-table-column prop="dataDesc" label="描述" align="center" ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                            icon="el-icon-edit"
                            size="mini"
                            @click="openEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'DictionaryTable',
        data () {
            return {
                tableList: [],
                tableLoading: false,
                selectRow: undefined
            }
        },
        props: {
            rowDblClick: {
                type: Function,
                default () {
                }
            },
            search: {type: Object}
        },
        computed: {
            dictInfoList () {
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                // console.log( this.search.query.text)
                let tmpList = this.tableList.filter((item) => {
                    return this.checkStringIn(item.dataValue, this.search.query.text) ||
                        this.checkStringIn(item.dataKey, this.search.query.text)
                    // return true;
                })
                let total = tmpList.length;
                this.search.total = total;
                return tmpList.slice((page - 1) * pageSize, page * pageSize > total ? total : page * pageSize);
            },
            tableIndex () {
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                return pageSize * (page - 1);
            }
        },
        created () {
            this.load();
        },
        methods: {
            load () {
                this.tableLoading = true;
                dictionaryMainAPI.getAllDictList().then(res => {
                    console.log(res);
                    this.tableLoading = false;
                    this.tableList = res.data.sort(function (a, b) {
                        return b.account - a.account;
                    })
                }).catch(() => {
                    this.tableLoading = false;
                });
            },
            getSelected () {
                return this.selectRow;
            },
            rowClick (row) {
                this.selectRow = row;
            },
            formatter (row, column) {
                return row.address;
            },
            filterTag (value, row) {
                return row.dataTypeKey === value;
            },
            openEdit (row) {
                // console.log(row)
                this.$emit('openEdit', row);
            },
            checkStringIn (a, tmp) {
                if (a === undefined || a === null) return false;
                return a.indexOf(tmp) >= 0;
            },

        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
</style>
