<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
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
    import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        // {
        //   icon: "el-icon-setting",
        //   index: "dashboard",
        //   title: "系统首页"
        // },
        {
          icon: "el-icon-tickets",
          index: "1",
          title: "事务管理",
            subs:[
               {
                   index:"s_course",
                   title:"课程管理"
               },
                {
                    index:"s_sign_student",
                    title:"人员签到详情"
                },
                {
                    index:"s_sign_situation",
                    title:"课程签到详情"
                },
                {
                    index:"s_ts_account",
                    title:"教师和学生账号管理"
                }
                // {
                //     index:"table",
                //     title:"表格"
                // }
            ]
        },
        {
          icon: "el-icon-date",
          index: "2",
          title: "权限管理",
          subs: [
              {
                  index: "q_role",
                  title: "人员角色管理"
              }
          ]
        },
        {
          icon: "el-icon-warning",
          index: "permission",
          title: "权限测试"
        },
        {
          icon: "el-icon-error",
          index: "404",
          title: "404页面"
        },
          {
              icon: "el-icon-error",
              index: "403",
              title: "403页面"
          }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item,
.el-submenu__title {
  height: 70px;
  line-height: 70px;
}
.el-submenu__title {
  height: 70px;
  line-height: 70px;
}
</style>
