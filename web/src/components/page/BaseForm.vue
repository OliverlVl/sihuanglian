<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="表单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="111" label="111" value="111"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="111" name="type"></el-checkbox>
   
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="111"></el-radio>
 
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                options:[
                   
                ],
                form: {
                
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    }
</script>