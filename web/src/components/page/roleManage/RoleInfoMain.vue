<template>
  <simple-card style="min-height: 700px" title="角色信息(请点击一个角色进行操作)">
    <div slot="right" class="clearfix">
      <el-button
        v-if="editStatus =='disable'"
        type="danger"
        icon="el-icon-delete"
        round
        @click="remove"
        size="mini"
      >删除</el-button>

      <el-button
        v-if="editStatus =='disable'"
        type="primary"
        icon="el-icon-edit"
        round
        @click="startEdit"
        size="mini"
      >编辑</el-button>

      <el-button
        v-if="(editStatus =='edit') || (editStatus =='create')"
        icon="el-icon-close"
        round
        @click="editCancel"
        size="mini"
      >关闭</el-button>

      <el-button
        v-if="editStatus =='create'"
        type="success"
        icon="el-icon-check"
        round
        @click="createSubmit"
        size="mini"
      >提交</el-button>

      <el-button
        v-if="editStatus =='edit'"
        type="success"
        icon="el-icon-check"
        round
        @click="updateSubmit"
        size="mini"
      >提交</el-button>
    </div>
    <el-form
      size="small"
      :rules="rules"
      :model="roleData"
      ref="roleForm"
      v-loading="submitLoading"
      label-position="right"
      label-width="100px"
      class="edit-dialog-form"
    >
      <el-row :gutter="20">
        <el-col :md="24" :sm="24">
          <el-form-item label="角色名称:" prop="role_name">
            <el-input v-model="roleData.role_name" v-if="editable"></el-input>
            <span v-else>{{roleData.role_name}}</span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24">
          <el-form-item label="角色类型:" prop="role_type">
            <el-select v-model="roleData.role_type" placeholder="请选择">
              <el-option
                v-for="item in typeOptionsList"
                :key="item.lable"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :md="24" :sm="24">
          <el-form-item label="说明:" prop="detail">
            <el-input v-model="roleData.detail" v-if="editable"></el-input>
            <span v-else>{{roleData.detail}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </simple-card>
</template>

<script>
import roleMainAPI from "@/api/manage/roleMainAPI";
import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";
import dictionaryMainAPI from "@/api/manage/dictionaryMainAPI";
import SimpleCard from "../../common/Card/SimpleCard";

export default {
  name: "RoleInfoMain",
  components: { SimpleCard },

  data() {
    return {
      editStatus: "disable",
      editable: false,
      submitLoading: false,
      title: {
        create: "新增角色",
        edit: "修改角色信息"
      },
      typeOptionsList: [
        {
          value: "1",
          label: "学生"
        },
        {
          value: "2",
          label: "老师"
        },
        {
          value: "3",
          label: "管理员"
        }
      ],

      groupOptionsList: [],
      dataScopeOptionsList: [],
      selected: {
        detail: "",
        id: "",
        label: "",
        role_type: ""
      },
      roleData: {
        id: "",
        role_name: "",
        role_type: "",
        detail: ""
      },
      rules: {
        role_name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          {
            min: 0,
            max: 60,
            message: "角色名称的长度需在60 个字符以内",
            trigger: "blur"
          }
        ],
        role_type: [
          { required: true, message: "角色类型不能为空", trigger: "blur" }
        ],
        detail: [
          {
            min: 0,
            max: 255,
            message: "说明的长度需在255 个字符以内",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      // this.editStatus = '';
      // this.editable = false;

      //   console.log('code');
      //   console.log(code);

      roleMainAPI
        .getById(this.selected.id)
        .then(res => {
          //   console.log(res.data);
          this.roleData = res.data;
        })
        .catch(() => {});
    },
    getselected(select) {
      this.roleData.detail = select.detail;
      this.roleData.id = select.id;
      this.roleData.role_name = select.label;

      if (select.role_type === 1) {
        this.roleData.role_type = "学生";
      } else if (select.role_type === 2) {
        this.roleData.role_type = "老师";
      } else {
        this.roleData.role_type = "管理员";
      }

      // console.log("this.selected");
      // console.log(this.roleData);
      // console.log("this.selected");
      console.log(select);
    },
    clearForm() {
      this.init();
    },
    openCreate() {
      this.editStatus = "create";
      this.editable = true;
      this.init();
    },
    validate() {
      const _this = this;
      var p1 = new Promise(function(resolve, reject) {
        return _this.$refs.roleForm.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
      return p1;
    },
    createSubmit(event) {
      //   console.log(event);
      const _this = this;
      this.validate().then(valid => {
    
        roleMainAPI
          .addRole(this.roleData)
          .then(res => {
            // console.log(res.data);
           
            showMessage("success", "新增角色信息成功!");
            
            location.reload();
          })
          .finally(() => {
        
          });
      });
    },
    updateSubmit() {
      this.validate().then(valid => {
        this.loadingStart();
        roleMainAPI
          .editRole(this.roleData)
          .then(res => {
            //   console.log('res.data');
            // console.log(res.data);
            this.loadingEnd();
            this.editable = false;
            this.refreshTree();
            showMessage("success", "更新角色信息成功!");
            location.reload();
          })
          .finally(() => {
            this.loadingEnd();
          });
      });
    },
    // 刷新角色树
    refreshTree() {
      roleMainAPI
        .getAllRole()
        .then(res => {
          //   console.log("data");

          //   console.log(res.data);
          for (let i in res.data) {
            this.treeData[i].id = res.data[i].id;
            this.treeData[i].label = res.data[i].role_name;
            this.treeData[i].role_type = res.data[i].role_type;
            this.treeData[i].detail = res.data[i].detail;
          }
        })
        .catch(() => {});
    },
    loadingStart() {
      this.submitLoading = true;
    },
    loadingEnd() {
      this.submitLoading = false;
    },

    // 删除角色
    remove() {
      if (this.roleData.id === undefined) {
        // console.log(this.roleData);
        return;
      }
      const _this = this;
      showSimpleConfirm(
        "是否确定删除角色" + this.roleData.role_name + "?",
        function() {
          console.log("confirm");
          roleMainAPI.remove(_this.roleData.id).then(res => {
            showSuccess("删除角色成功!");
            _this.refreshTree();
            location.reload();
          });
        },
        function() {
          console.log("cancel");
          showInfo("取消删除");
        }
      );
    },
    startEdit() {
      this.editStatus = "edit";
    },

    editCancel() {
      this.editStatus = "disable";
    }
  }
};
</script>

<style scoped>
</style>
