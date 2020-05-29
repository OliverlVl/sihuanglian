<template>
    <div>
        <data-select-table
                @openEdit="openEdit"
                :search="search"
                ref="dataSelectTable"
                :rowDblClick="showOpen"
        ></data-select-table>

        <data-select-edit ref="dataSelectEdit" @load="load"></data-select-edit>
        <data-select-show ref="dataSelectShow"></data-select-show>
    </div>
</template>

<script>
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import DataSelectTable from './DataSelectTable';
    import Pagination from '../../../common/Pagination';
    import ContainerSearchGroup from '../../../common/ContainerSearchGroup';
    import DataSelectEdit from './DataSelectEdit';
    // import DataSelectAdd from './DataSelectAdd';
    import DataSelectShow from './DataSelectShow';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'DataSelectIndex',
        components: {DataSelectShow, 
        // DataSelectAdd, 
        DataSelectEdit, ContainerSearchGroup, Pagination, DataSelectTable},
        data () {
            return {
                search: {
                    // query: {
                    //     text: ''
                    // },
                    sort: {
                        prop: 'sequence', order: 'descending'
                    },
                    page: this.$store.state.app.default.page,
                    pageSize: this.$store.state.app.default.pageSize,
                    total: 0
                },
                // dataSelectData: {},
                selectOptionsList: [],
                selectOptions: 0,
                tableVisible: false, // 控制添加弹出框是否显示
                showLoading: false // 控制组件加载动画
            }
        },
        methods: {
            load () {
                this.$refs.dataSelectTable.load(this.selectOptions);
            },
            // getselectOptionsList () {
            //     this.loadingStart();
            //     dictionaryMainAPI.getSelectOption().then(res => {
            //         this.loadingEnd();
            //         this.selectOptionsList = res.data;
            //     }).catch(() => {
            //         this.loadingEnd();
            //     });
            // },
            // changeSelect (data) {
            //     this.selectOptions = data;
            //     this.$refs.dataSelectTable.load(data);
            // },
            openEdit () {
                this.$refs.dataSelectEdit.openEdit();
            },
            // 开始加载的动画
            loadingStart () {
                this.showLoading = true;
            },
            // 结束加载的动画
            loadingEnd () {
                this.showLoading = false;
            },
            showOpen () {
            },
            // 查询
            // query () {
            //     this.search.page = 1;
            //     this.load();
            // },

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
            },
            // 重置搜索表单
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
          
            // 获取选择列
            getSelected () {
                var row = this.$refs.dataSelectTable.getSelected();
                if (row === undefined) {
                    showMessage('error', '请先选择一个键值');
                }
                return row;
            }
        }
    }
</script>

<style scoped>

</style>
