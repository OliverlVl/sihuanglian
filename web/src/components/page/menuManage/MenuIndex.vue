<template>
  <div>
    <el-checkbox-group v-model="selected">
      <li v-for="(item1,index1) in datatable">
        <el-checkbox :label="item1.id" :key="item1" border>
          <strong>{{item1.name}}</strong>
        </el-checkbox>

        <ul>
          <el-checkbox-group v-model="selected">
            <ul>
              <li v-for="(item2,index2) in datatable[index1].sub">
                <el-checkbox :label="item2.id" :key="item2" border>{{item2.name}}</el-checkbox>
                <ul>
                  <el-checkbox-group v-model="selected">
                    <ul>
                      <el-checkbox
                        v-for="item3 in datatable[index1].sub[index2].sub"
                        :label="item3.id"
                        :key="item3"
                        border
                      >{{item3.name}}</el-checkbox>
                    </ul>
                  </el-checkbox-group>
                </ul>
              </li>
            </ul>
          </el-checkbox-group>
        </ul>
        <el-divider></el-divider>
      </li>
    </el-checkbox-group>

    <el-button type="primary" @click="dialogVisible1 = true">添加菜单</el-button>
    <el-button type="primary" @click="dialogVisible2 = true">添加页面</el-button>
    <el-button type="primary" @click="addbutton3()">添加按钮</el-button>
    <el-button type="primary" @click="handdelete()">删除菜单（仅菜单）</el-button>
    <el-dialog title="添加菜单" :visible.sync="dialogVisible1" width="60%" :before-close="handleClose1">
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="menuname"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="addmenu()">确 定</el-button>
    </el-dialog>
    <el-dialog
      title="添加页面（请确保上级菜单已创建）"
      :visible.sync="dialogVisible2"
      width="60%"
      :before-close="handleClose2"
    >
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="menuname"></el-input>
        </el-form-item>

        <el-form-item label="输入上级菜单">
          <el-input v-model="supermenu"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="addpage()">确 定</el-button>
    </el-dialog>
    <el-dialog
      title="添加按钮（请确保上级页面已创建）"
      :visible.sync="dialogVisible3"
      width="50%"
      :before-close="handleClose3"
    >
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称                   ">
          <el-input v-model="button"></el-input>
        </el-form-item>
        <el-form-item label="上级页面" style="width: 100%;">
          <el-input v-model="supermenu"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="addbutton()">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import menuMainAPI from "@/api/manage/menuMainAPI";
import {
  showMessage,
  showSimpleConfirm,
  showSuccess,
  showInfo
} from "@/utils/message";
export default {
  data() {
    return {
      selected: [],

      temp2: 0,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      submenus: [],
      inputVisible: false,
      inputValue: "",
      menuname: "",
      supermenu: "",
      button: "",

      buttons: [],
      datatable: [
        
      ]
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      menuMainAPI.findAll().then(res => {
        // console.log(res.data.length)
        // for(let i = 0; i < res.data.length; i++){
        //     if(res.data[i].sub){
        //       this.datatable[i].id = res.data[i].id
        //       this.datatable[i].name = res.data[i].name
        //       this.datatable[i].state = res.data[i].state
        //       this.datatable[i].layer = res.data[i].layer
        //       this.datatable[i].sub = res.data[i].sub
        //     }
        //     if(res.data[i].sub.length > 0){
        //       for(let j = 0; j < res.data[i].sub.length; j++){
        //       if(res.data[i].sub[j].sub){
        //       this.datatable[i].sub[j].id = res.data[i].sub[j].id
        //       this.datatable[i].sub[j].name = res.data[i].sub[j].name
        //       this.datatable[i].sub[j].state = res.data[i].sub[j].state
        //       this.datatable[i].sub[j].layer = res.data[i].sub[j].layer
        //       this.datatable[i].sub[j].sub = res.data[i].sub[j].sub
        //       }
        //       if(res.data[i].sub[j].sub.length > 0){
        //         for(let k = 0; k < res.data[i].sub[j].sub.length; k++){
        //           if(res.data[i].sub[j].sub){
        //           this.datatable[i].sub[j].sub[k].id = res.data[i].sub[j].sub[k].id
        //           this.datatable[i].sub[j].sub[k].name = res.data[i].sub[j].sub[k].name
        //           this.datatable[i].sub[j].sub[k].state = res.data[i].sub[j].sub[k].state
        //           this.datatable[i].sub[j].sub[k].layer = res.data[i].sub[j].sub[k].layer
        //           this.datatable[i].sub[j].sub[k].sub = res.data[i].sub[j].sub[k].sub
        //           }
        //         }
        //        }
             

        //       }
        //   }
        // }


        this.datatable = res.data;
        // console.log(this.datatable)
        
      });
    },
    handdelete() {
      console.log("selected" + this.selected[0]);

      menuMainAPI
        .deletemenu(this.selected[0])
        .then(res => {
          if (res.message) {
            showSuccess(res.message);
          } else {
            showMessage("删除成功");
          }
          this.load();
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    addbutton3() {
      this.dialogVisible3 = true;
      this.supermenu = "";
    },
    handleClose3() {
      this.dialogVisible3 = false;
    },
    addmenu() {
      this.dialogVisible1 = false;

      menuMainAPI.addmenu(this.menuname).then(res => {
        if (res.message) {
          showSuccess(res.message);
        } else {
          showMessage("新增菜单成功");
        }
        this.load();
        location.reload();
      });
    },
    addpage() {
      this.dialogVisible2 = false;
      this.buttons = this.submenus;

      menuMainAPI
        .addpage(this.buttons, this.menuname, this.supermenu)
        .then(res => {
          if (res.message) {
            showSuccess(res.message);
          } else {
            showMessage("新增页面成功");
          }
          this.load();
          location.reload();
        });
    },
    addbutton() {
      this.dialogVisible3 = false;
      menuMainAPI.addbutton(this.button, this.supermenu).then(res => {
        if (res.message) {
          showSuccess(res.msg);
        } else {
          showMessage("新增按钮成功");
        }
        this.load();
        location.reload();
      });
    },
    handleClose2(tag) {
      this.dialogVisible2 = false;
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.submenus.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
