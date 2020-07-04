<template>
  <div class="sidebar">
    <el-menu
      mode="vertical"
      background-color="#324157"
      text-color="#bfcbd9"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      router
      active-text-color="#66b1ff"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(subItem,i) in item.subs"
              :key="i"
              :index="subItem.index"
            >{{ subItem.title }}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { routes } from "../../../router";

export default {
  name: "sidebar",
  computed: {
    isCollapse() {
      return this.$store.state.app.sidebar.isCollapse;
    },
    routes() {
      return this.$store.state.app.routes;
    }
  },
  data() {
    return {
 items: [
     {
          icon: "el-icon-date",
          index: "home",
          title: "首页",
          
        },
        {
          icon: "el-icon-date",
          index: "courage",
          title: "课程查看",
          
        },
        {
          icon: "el-icon-date",
          index: "dict",
          title: "数据字典",
          
        },
         {
          icon: "el-icon-date",
          index: "user",
          title: "用户管理",
          
        },
         {
          icon: "el-icon-date",
          index: "role",
          title: "角色管理",
          
        },
         {
          icon: "el-icon-date",
          index: "menu",
          title: "菜单管理",
          
        },
        {
          icon: "el-icon-date",
          index: "organ",
          title: "组织管理",
          
        },
        {
          icon: "el-icon-tickets",
          index: "2",
          title: "异常页",
            subs:[
               {
                   index:"err403",
                   title:"403"
               },
                {
                    index:"err404",
                    title:"404"
                },
                {
                    index:"err500",
                    title:"500"
                }
            ]
        },
       
      ]

    };
  },
  created() {
    console.log(routes);
   
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    countChildNum(item) {
      if (item.children === undefined) return 0;
      let count = 0;
      for (let t of item.children) {
        if (!t.hidden) {
          count++;
        }
      }
      return count;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.el-menu {
  .svg-icon {
    margin-right: 10px;
  }
}
</style>
