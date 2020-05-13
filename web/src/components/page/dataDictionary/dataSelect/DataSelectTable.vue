<template>
    <el-table
            class="dict-manage-table"
            :data="dataInfoList"
            @row-click="rowClick"
            @row-dblclick="rowDblClick"
            v-loading="showLoading"
            fit highlight-current-row stripe
            size="mini"
            :default-sort="{prop: 'sequence', order: 'aescending'}">
        <el-table-column prop="sequence" label="序列" align="center" sortable></el-table-column>
        <el-table-column prop="contentValue" label="参数名称" align="center" ></el-table-column>
        <el-table-column prop="contentKey" label="参数值" align="center" ></el-table-column>
        <el-table-column prop="status"  width="120"
                         label="状态"
                         align="center"
                         :filters="[{ text: '正常', value: 'Normal' }, { text: '禁用', value: 'Disabled' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.status === 'Disabled' ? 'danger' : 'success'"
                        close-transition >{{ setDataStatus(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
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
                let page = this.search.page !== undefined ? this.search.page : 1;
                let pageSize = this.search.pageSize !== undefined ? this.search.pageSize : 15;
                // console.log( this.search.query.text)
                let tmpList = this.dataInfo.filter((item) => {
                    return this.checkStringIn(item.contentKey, this.search.query.text) ||
                        this.checkStringIn(item.contentValue, this.search.query.text)
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
        data () {
            return {
                dataInfo: [],
                tableVisible: false, // 控制添加弹出框是否显示
                showLoading: false // 控制组件加载动画
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
