/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
let menus = [];

const createMenuData = (path,title,icon,iconRender)=>{
  return {
    path,
    meta:{
      title,
      icon,
      iconRender
    }
  }
}

const MyIcon = h =>{
  return h('span','😸')
}

const dashboardMenu = {
  path: "/dashboard",
  name: "Dashboard",
  meta: { title: "首页", iconRender: MyIcon },
};


const permissionMenus = {
  path: "/permission",
  meta: {
    title: "权限",
    icon: "el-icon-lock",
  },
  children: [
    {
      path: "/permission/page?p=1",
      meta: {
        title: "页面权限",
        icon: "el-icon-s-check"
      },
    },
    {
      path: "/permission/directive",
      meta: {
        title: "指令权限",
        icon: "el-icon-s-check"
      },
    },
    {
      path: "/permission/role",
      meta: {
        title: "角色权限",
        icon: "el-icon-s-check"
      },
    },
  ],
};

const nestedMenus = {
  path: "/nested",
  meta: {
    title: "嵌套菜单",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "/nested/menu1",
      meta: {
        title: "菜单 1",
        icon: "el-icon-menu",
      },
      children: [
        {
          path: "/nested/menu1/menu1-1",
          meta: {
            title: "菜单 1-1",
            icon: "el-icon-menu",
          },
        },
        {
          path: "/nested/menu1/menu1-2",
          meta: {
            title: "菜单 1-2",
            icon: "el-icon-menu",
          },
          children: [
            {
              path: "/nested/menu1/menu1-2/menu1-2-1",
              meta: {
                title: "菜单 1-2-1",
                icon: "el-icon-menu",
              },
            },
            {
              path: "/nested/menu1/menu1-2/menu1-2-2",
              meta: {
                title: "菜单 1-2-2",
                icon: "el-icon-menu",
              },
            },
            createMenuData("/nested/menu1/menu1-2/menu1-2-3","菜单 1-2-3","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-4","菜单 1-2-4","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-5","菜单 1-2-5","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-6","菜单 1-2-6","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-7","菜单 1-2-7","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-8","菜单 1-2-8","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-9","菜单 1-2-9","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-10","菜单 1-2-10","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-11","菜单 1-2-11","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-12","菜单 1-2-12","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-13","菜单 1-2-13","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-14","菜单 1-2-14","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-15","菜单 1-2-15","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-16","菜单 1-2-16","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-17","菜单 1-2-17","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-18","菜单 1-2-18","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-19","菜单 1-2-19","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-20","菜单 1-2-20","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-21","菜单 1-2-21","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-22","菜单 1-2-22","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-23","菜单 1-2-23","el-icon-menu"),
          ],
        },
      ],
    },
    {
      path: "/nested/menu2",
      meta: {
        title: "菜单 2",
        icon: "el-icon-menu",
      },
    },
  ],
};

const nestedMenus2 = {
  path: "/nested2",
  meta: {
    title: "嵌套菜单2",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "menu1",
      meta: {
        title: "菜单 1",
        icon: "el-icon-menu",
      },
      children: [
        {
          path: "menu1-1",
          meta: {
            title: "菜单 1-1",
            icon: "el-icon-menu",
          },
        },
        {
          path: "menu1-2",
          meta: {
            title: "菜单 1-2",
            icon: "el-icon-menu",
          },
          children: [
            {
              path: "menu1-2-1",
              meta: {
                title: "菜单 1-2-1",
                icon: "el-icon-menu",
              },
            },
            {
              path: "menu1-2-2",
              meta: {
                title: "菜单 1-2-2",
                icon: "el-icon-menu",
              },
            },
          ],
        },
      ],
    },
    {
      path: "menu2",
      meta: {
        title: "菜单 2",
        icon: "el-icon-menu",
      },
    },
  ],
};

function g(){
  const size = 5;
  const arr = [];
  for(let count = 0; count < size; count++){
    arr[count] = {
      path:'/placeholder/page-' + count,
      meta: {
        title: "占位菜单" + count,
        icon: "el-icon-menu",
      }
    }
  }
  return arr
}
menus = [
  dashboardMenu,
  permissionMenus,
  nestedMenus,
  nestedMenus2,
  ...g(),
  {
    path: "https://github.com/PanJiaChen/vue-element-admin",
    meta: { title: "外链", icon: "el-icon-link" },
  },
];

