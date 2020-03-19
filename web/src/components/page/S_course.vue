<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i>课程管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="selectForm"  ref="selectForm">
                    <el-select v-model="selectForm.selectSchool" placeholder="全部学校" class="handle-select mr10">
                        <el-option key="1" label="福州大学" value="福州大学"></el-option>
                        <el-option key="2" label="福建师范大学" value="福建师范大学"></el-option>
                    </el-select>
                    <el-input v-model="selectForm.selectKeyWord" placeholder="请输入课程" class="handle-input mr10"></el-input>
                    <el-button type="primary" @click="submitForm(selectForm)">搜索</el-button>
                </el-form>
            </div>
            <el-table  :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="course" label="课程名称"  width="120">
                </el-table-column>
                <el-table-column prop="teacher" label="教师姓名" with="120">
                </el-table-column>
                <el-table-column prop="college" label="院系" width="150">
                </el-table-column>
                <el-table-column prop="term" label="学期" width="120">
                </el-table-column>
                <el-table-column prop="time" label="上课时间" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地点" width="120">
                </el-table-column>
                <el-table-column prop="class" label="班级" width="120">
                </el-table-column>

                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="delAll">
                <el-button type="primary" icon="delete" class="handle-del" @click="delAll">批量删除</el-button>
            </div>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="this.isAdd?'新增':'编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="课程">
                    <el-input type="course" v-model="form.course"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名">
                    <el-input v-model="form.teacher"></el-input>
                </el-form-item>
                <el-form-item label="院系">
                    <el-input v-model="form.college"></el-input>
                </el-form-item>
                <el-form-item label="学期">
                    <el-input v-model="form.term"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-input v-model="form.time"></el-input>
                </el-form-item>
                <el-form-item label="地点">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="form.class"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="400px">
            <div class="del-dialog-cnt">是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    course: "",
                    teacher: "",
                    college: "",
                    term: "",
                    time: "",
                    address: "",
                    class:"",
                    school:""
                },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    },
                    {
                        course: "",
                        teacher: "",
                        college: "",
                        term: "",
                        time: "",
                        address: "",
                        class:"",
                        school:""
                    }],
                curPage: 1,
                multipleSelection: [],
                selectForm:{
                    selectSchool: '',
                    selectKeyWord: ''
                },
                delList: [],
                isSearch: false,
                isAdd:false,
                editVisible: false,
                delVisible: false,
                form: {
                    course: "",
                    teacher: "",
                    college: "",
                    term: "",
                    time: "",
                    address: "",
                    class:"",
                    school:""
                },
                rowId: -1
            };
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                // return this.tableData.filter(d => {
                //     let is_del = false;
                //     for (let i = 0; i < this.delList.length; i++) {
                //         if (d.school === this.delList[i].school) {
                //             is_del = true;
                //             break;
                //         }
                //     }
                //     if (!is_del) {
                //         if (
                //             d.school.indexOf(this.selectSchool) > -1 &&
                //             (d.course.indexOf(this.selectKeyWord) > -1 ||
                //                 d.school.indexOf(this.selectKeyWord) > -1)
                //         ) {
                //             return d;
                //         }
                //     }
                // });
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.curPage = val;
                this.getData();
            },
            // 获取easy mock数据
            getData() {
                // this.$axios
                //     .get(this.url, {
                //         page: this.curPage
                //     })
                //     .then(res => {
                //         this.tableData = res.data.list;
                //     });
            },
            submitForm(formName){
                this.isSearch = true;
                const self = this;
                for(let i=0;i < 10;i++){
                    this.tableData[i].course= null;
                    this.tableData[i].teacher=null;
                    this.tableData[i].college=null;
                    this.tableData[i].term=null;
                    this.tableData[i].time=null;
                    this.tableData[i].address=null;
                    this.tableData[i].class=null;
                    this.tableData[i].school=null;
                    // this.form.course = response.data[i].Course_Name;
                    // this.form.teacher = response.data[i].Teacher_Name;
                    // this.form.college = response.data[i].School;
                    // this.form.term = response.data[i].Course_Term;
                    // this.form.time = response.data[i].Course_Week;
                    // this.form.address = response.data[i].Class_Place;
                    // this.form.class = response.data[i].Class_Name;
                }
                self.$http({
                    method:'get',
                    url:'/api/user/s_course',
                    params:{
                        data:self.selectForm
                    }
                }).then((response) => {
                        for(let i in response.body){
                            this.tableData[i].course=response.data[i].Course_Name;
                            this.tableData[i].teacher=response.data[i].Teacher_Name;
                            this.tableData[i].college=response.data[i].School;
                            this.tableData[i].term=response.data[i].Course_Term;
                            this.tableData[i].time=response.data[i].Course_Week;
                            this.tableData[i].address=response.data[i].Class_Place;
                            this.tableData[i].class=response.data[i].Class_Name;
                            this.tableData[i].school=response.data[i].school;

                        }

                    });


            },
            formatter(row, column) {
                return row.address;
            },
            handleEdit(index, row) {
                this.rowId = index;
                const item = this.tableData[index];
                this.form = {
                    course: item.course,
                    teacher: item.teacher,
                    college: item.college,
                    term: item.term,
                    time: item.time,
                    address: item.address,
                    class:item.class,
                    school:item.school
                };
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.rowId = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = "";
                this.delList = this.delList.concat(this.multipleSelection);
                if(!length){
                    this.$message.error('请先勾选要删除的数据！');
                    return ;
                }
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + " ";
                }
                this.$message.error("删除了" + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.rowId, this.form);
                this.editVisible = false;
                if(!this.isAdd){
                    this.$message.success(`修改第 ${this.rowId + 1} 行成功`);
                }else{
                    this.$message.success('数据添加成功');
                }
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.rowId, 1);
                this.$message.success("删除成功");
                this.delVisible = false;
            },
            addUser(){
                this.isAdd=true;
                this.editVisible = true;
                this.tableData.shift({
                    name:this.form.name,
                    age:this.form.age,
                    address:this.form.address,
                    email:this.form.email
                })
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }
    .delAll {
        margin: 20px 0;
        float: left;
    }
</style>
