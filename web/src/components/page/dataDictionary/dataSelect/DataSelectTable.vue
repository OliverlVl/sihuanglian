<template>
    <el-table
            class="dict-manage-table"
            :data="tableData"
            @row-click="rowClick"
            @row-dblclick="rowDblClick"
            v-loading="showLoading"
            fit highlight-current-row stripe
            size="mini"
            :default-sort="{prop: 'sequence', order: 'aescending'}">
        <el-table-column prop="sequence" label="序列" align="center" sortable></el-table-column>
        <el-table-column prop="exp" label="签到经验" align="center" ></el-table-column>
        <el-table-column prop="distance" label="签到距离" align="center" ></el-table-column>
     
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button
                        icon="el-icon-edit"
                        size="mini"
                        @click="openEdit(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';

    export default {
        name: 'DataSelectTable',
        props: {
            rowDblClick: {
                type: Function,
                default () {
                }
            },
            search: {type: Object},
        },
        computed: {
            dataInfoList () {
       
            },
            tableIndex () {
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                return pageSize * (page - 1);
            }
        },
        data () {
            return {
                dataInfo: [],
                tableVisible: false, // 控制添加弹出框是否显示
                showLoading: false, // 控制组件加载动画
                tableData: [
                     {"sequence":"1","exp":"10","distance":"1"},
                    
                 ],
            }
        },
        methods: {
            load (event) {
                if (event === undefined || event === null || event === '请选择') { return; }
                this.loadingStart();
                dictionaryMainAPI.getDataInfo(event).then(res => {
                    this.loadingEnd();
                    this.dataInfo = res.data;
                }).catch(error => {
                    console.log(error);
                    this.loadingEnd();
                });
            },
            // 打开编辑窗口
            openEdit (row) {
                this.$emit('openEdit', row);
            },
            // 开始加载的动画
            loadingStart () {
                this.showLoading = true;
            },
            // 结束加载的动画
            loadingEnd () {
                this.showLoading = false;
            },
            // 将用户状态英文转为中文
            setDataStatus (status) {
                if ('Disabled' === status) {
                    return '禁用';
                }
                return '正常';
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
                return row.status === value;
            },
            checkStringIn (a, tmp) {
                if (a === undefined || a === null) return false;
                return a.indexOf(tmp) >= 0;
            }
        }
    }
</script>

<style scoped>

</style>
