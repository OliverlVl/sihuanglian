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
    <el-button type="primary" @click="handdelete()">勾选删除(仅一个)</el-button>
    <el-dialog title="添加菜单" :visible.sync="dialogVisible1" width="60%" :before-close="handleClose1">
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="menuname"></el-input>
        </el-form-item>
        
        
      </el-form>
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="addmenu()">确 定</el-button>
    </el-dialog>
    <el-dialog title="添加页面" :visible.sync="dialogVisible2" width="60%" :before-close="handleClose2">
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="menuname"></el-input>
        </el-form-item>
        
        <el-form-item label="上级菜单">
          <el-input v-model="supermenu"></el-input>
        </el-form-item>
        
      </el-form>
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="addpage()">确 定</el-button>
    </el-dialog>
    <el-dialog title="添加按钮" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose3">
      <el-form :model="menuname" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="button"></el-input>
        </el-form-item>
        <el-form-item label="上级页面">
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
        {
          id:1,
          name: "班课频道",
          state: "checked",
          layer: 1,
          sub: [
            {
              id:2,
              name: "班课管理",
              state: "checked",
              layer: 2,
              sub: [
                {
                  id:3,
                  name: "创建班课",
                  state: "unchecked",
                  layer: 3,
                  sub: null
                },
                {
                  id:4,
                  name: "班课列表排序",
                  state: "checked",
                  layer: 3,
                  sub: null
                },
                {
                  id:5,
                  name: "查看班课",
                  state: "checked",
                  layer: 3,
                  sub: null
                }
              ]
            },
            {
              id:6,
              name: "加入班级",
              state: "unchecked",
              layer: 2,
              sub: null
            }
          ]
        },
        {
          id:7,
          name: "发现",
          state: "checked",
          layer: 1,
          sub: null
        },
        {
          id:8,
          name: "我的频道",
          state: "checked",
          layer: 1,
          sub: [
            
            {
              id:9,
              name: "333",
              state: "checked",
              layer: 3,
              sub: null
            },
            {
              id:10,
              name: "222",
              state: "checked",
              layer: 3,
              sub: null
            },
            {
              id:11,
              name: "111",
              state: "checked",
              layer: 3,
              sub: null
            }
          ]
        }
      ]
    };
  },
  methods: {
    handdelete() {
      
      console.log('selected'+this.selected[0]);
      
      const _this = this;
      menuMainAPI.deletemenu(this.selected[0]).then(res => {
        menuMainAPI.findAll().then(res => {
          _this.datatable = res.data;
          this.$alert("删除成功", "删除", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        });
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
      
      menuMainAPI.addmenu(this.menuname,  this.submenus).then(res => {
        menuMainAPI.findAll().then(res => {
          this.datatable = res.data;
          this.$alert("分配权限成功", "分配权限", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        });
      });
    },
    addpage() {
      this.dialogVisible2 = false;
      this.buttons = this.submenus;
      
      menuMainAPI.addpage(this.buttons, this.menuname, this.supermenu).then(res => {
        menuMainAPI.findAll().then(res => {
          this.datatable = res.data;
          this.$alert("新增页面成功", "新增页面", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        });
      });
    },
    addbutton() {
      this.dialogVisible3 = false;
      menuMainAPI.addbutton(this.button, this.supermenu).then(res => {
        menuMainAPI.findAll().then(res => {
          this.datatable = res.data;
          this.$alert("新增按钮成功", "新增按钮", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        });
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
  },
  created() {
    menuMainAPI.findAll().then(res => {
      this.datatable = res.data;
      for (let i = 0; i < this.datatable.length; ++i) {
        if (this.datatable[i].state == "checked") {
          this.selected.push(this.datatable[i].name);
        }
        if (this.datatable[i].sub == null) {
          continue;
        }
        for (let j = 0; j < this.datatable[i].sub.length; ++j) {
          if (this.datatable[i].sub[j].state == "checked") {
            this.selected.push(this.datatable[i].sub[j].name);
          }
          if (this.datatable[i].sub[j].sub == null) {
            continue;
          }
          for (var k = 0; k < this.datatable[i].sub[j].sub.length; ++k) {
            if (this.datatable[i].sub[j].sub[k].state == "checked") {
              this.selected.push(this.datatable[i].sub[j].sub[k].name);
            }
            if (this.datatable[i].sub[j].sub[k].sub == null) {
              continue;
            }
          }
        }
      }
    });
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
