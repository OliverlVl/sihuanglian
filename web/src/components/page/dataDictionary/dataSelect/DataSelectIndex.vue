<template>
    <div>
        <container-search-group>
            <el-form style="float: left"
                    ref="dataSelectForm"
                    size="small"
                    v-loading="showLoading"
                    label-width="100px"
                    label-position="right">
                <el-form-item label="数据字典:">
                    <el-select v-model="dataSelectData" filterable placeholder="请选择" @change="changeSelect" @click.native="getselectOptionsList">
                        <el-option v-for="item in selectOptionsList"
                                   :key="item.id"
                                   :label="item.data_value"
                                   :value="item.id"
                                   placeholder="请选择">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="search" ref="userSearchForm" size="mini" style="float: right">
                <el-form-item label="搜索：" prop="searchText">
                    <el-input placeholder="请输入参数名或其他信息" prefix-icon="el-icon-search" v-model="search.query.text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
        </container-search-group>
        <div class="tool-wrapper" style="clear: both">
            <el-button-group>
                <el-button type="primary" icon="el-icon-plus" @click="createOpen" size="mini">新增</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="removeOpen" size="mini">删除</el-button>
            </el-button-group>
        </div>
        <data-select-table
                @openEdit="openEdit"
                :search="search"
                ref="dataSelectTable"
                :rowDblClick="showOpen"
        ></data-select-table>
        <Pagination
                :size-change="handleSizeChange"
                :pageData="search"
                :current-change="handleCurrentChange">
        </Pagination>
        <data-select-edit ref="dataSelectEdit" @load="load"></data-select-edit>
        <data-select-add ref="dataSelectAdd" @load="load" :selDicId="selectOptions"></data-select-add>
        <data-select-show ref="dataSelectShow"></data-select-show>
    </div>
</template>

<script>
    import dictionaryMainAPI from '@/api/manage/dictionaryMainAPI';
    import DataSelectTable from './DataSelectTable';
    import Pagination from '../../../common/Pagination';
    import ContainerSearchGroup from '../../../common/ContainerSearchGroup';
    import DataSelectEdit from './DataSelectEdit';
    import DataSelectAdd from './DataSelectAdd';
    import DataSelectShow from './DataSelectShow';
    import {showMessage, showSimpleConfirm, showSuccess, showInfo} from '@/utils/message';

    export default {
        name: 'DataSelectIndex',
        components: {DataSelectShow, DataSelectAdd, DataSelectEdit, ContainerSearchGroup, Pagination, DataSelectTable},
        data () {
            return {
                search: {
                    query: {
                        text: ''
                    },
                    sort: {
                        prop: 'sequence', order: 'descending'
                    },
                    page: this.$store.state.app.default.page,
                    pageSize: this.$store.state.app.default.pageSize,
                    total: 0
                },
                dataSelectData: {},
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
            getselectOptionsList () {
                this.loadingStart();
                dictionaryMainAPI.getSelectOption().then(res => {
                    this.loadingEnd();
                    this.selectOptionsList = res.data;
                }).catch(() => {
                    this.loadingEnd();
                });
            },
            changeSelect (data) {
                this.selectOptions = data;
                this.$refs.dataSelectTable.load(data);
            },
            openEdit (row) {
                this.$refs.dataSelectEdit.openEdit(row.id);
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
            },
            // 重置搜索表单
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            createOpen () {
                if (this.selectOptions === undefined ||
                    this.selectOptions === null ||
                    this.selectOptions === 0 ||
                    this.selectOptions === '请选择') {
                    showMessage('error', '请先选择父级字典');
                    return;
                }
                this.$refs.dataSelectAdd.openCreate();
            },
            removeOpen () {
                var row = this.getSelected();
                if (row === undefined) {
                    return;
                }
                const _this = this;
                showSimpleConfirm('是否确定删除键值' + row.contentValue + '?', function () {
                    console.log(row);
                    dictionaryMainAPI.delDataItem(row.id).then(res => {
                        showSuccess('删除成功!');
                        _this.load();
                    })
                }, function () {
                    showInfo('取消删除');
                })
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
