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
  return h('span','๐ธ')
}

const dashboardMenu = {
  path: "/dashboard",
  name: "Dashboard",
  meta: { title: "้ฆ้กต", iconRender: MyIcon },
};


const permissionMenus = {
  path: "/permission",
  meta: {
    title: "ๆ้",
    icon: "el-icon-lock",
  },
  children: [
    {
      path: "/permission/page?p=1",
      meta: {
        title: "้กต้ขๆ้",
        icon: "el-icon-s-check"
      },
    },
    {
      path: "/permission/directive",
      meta: {
        title: "ๆไปคๆ้",
        icon: "el-icon-s-check"
      },
    },
    {
      path: "/permission/role",
      meta: {
        title: "่ง่ฒๆ้",
        icon: "el-icon-s-check"
      },
    },
  ],
};

const nestedMenus = {
  path: "/nested",
  meta: {
    title: "ๅตๅฅ่ๅ",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "/nested/menu1",
      meta: {
        title: "่ๅ 1",
        icon: "el-icon-menu",
      },
      children: [
        {
          path: "/nested/menu1/menu1-1",
          meta: {
            title: "่ๅ 1-1",
            icon: "el-icon-menu",
          },
        },
        {
          path: "/nested/menu1/menu1-2",
          meta: {
            title: "่ๅ 1-2",
            icon: "el-icon-menu",
          },
          children: [
            {
              path: "/nested/menu1/menu1-2/menu1-2-1",
              meta: {
                title: "่ๅ 1-2-1",
                icon: "el-icon-menu",
              },
            },
            {
              path: "/nested/menu1/menu1-2/menu1-2-2",
              meta: {
                title: "่ๅ 1-2-2",
                icon: "el-icon-menu",
              },
            },
            createMenuData("/nested/menu1/menu1-2/menu1-2-3","่ๅ 1-2-3","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-4","่ๅ 1-2-4","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-5","่ๅ 1-2-5","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-6","่ๅ 1-2-6","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-7","่ๅ 1-2-7","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-8","่ๅ 1-2-8","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-9","่ๅ 1-2-9","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-10","่ๅ 1-2-10","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-11","่ๅ 1-2-11","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-12","่ๅ 1-2-12","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-13","่ๅ 1-2-13","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-14","่ๅ 1-2-14","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-15","่ๅ 1-2-15","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-16","่ๅ 1-2-16","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-17","่ๅ 1-2-17","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-18","่ๅ 1-2-18","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-19","่ๅ 1-2-19","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-20","่ๅ 1-2-20","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-21","่ๅ 1-2-21","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-22","่ๅ 1-2-22","el-icon-menu"),
            createMenuData("/nested/menu1/menu1-2/menu1-2-23","่ๅ 1-2-23","el-icon-menu"),
          ],
        },
      ],
    },
    {
      path: "/nested/menu2",
      meta: {
        title: "่ๅ 2",
        icon: "el-icon-menu",
      },
    },
  ],
};

const nestedMenus2 = {
  path: "/nested2",
  meta: {
    title: "ๅตๅฅ่ๅ2",
    icon: "el-icon-menu",
  },
  children: [
    {
      path: "menu1",
      meta: {
        title: "่ๅ 1",
        icon: "el-icon-menu",
      },
      children: [
        {
          path: "menu1-1",
          meta: {
            title: "่ๅ 1-1",
            icon: "el-icon-menu",
          },
        },
        {
          path: "menu1-2",
          meta: {
            title: "่ๅ 1-2",
            icon: "el-icon-menu",
          },
          children: [
            {
              path: "menu1-2-1",
              meta: {
                title: "่ๅ 1-2-1",
                icon: "el-icon-menu",
              },
            },
            {
              path: "menu1-2-2",
              meta: {
                title: "่ๅ 1-2-2",
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
        title: "่ๅ 2",
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
        title: "ๅ?ไฝ่ๅ" + count,
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
    meta: { title: "ๅค้พ", icon: "el-icon-link" },
  },
];

