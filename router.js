


/* BasicLayout */
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Dashboard = { template: '<div>Dashboard</div>' }
const Menu1_1 = { template: '<div>Menu1_1</div>' }
const Menu1_2 = { template: '<div>Menu1_2</div>' }
const Menu1_2_1 = { template: '<div>Menu1_2_1</div>' }
const Menu1_2_2 = { template: '<div>Menu1_2_2</div>' }
const Menu1_3 = { template: '<div>Menu1_3</div>' }
const Menu2 = { template: '<div>Menu2</div>' }
const PagePermission = { template: '<div>PagePermission</div>' }
const DirectivePermission = { template: '<div>DirectivePermission</div>' }
const RolePermission = { template: '<div>RolePermission</div>' }
/* Router Modules */

const BasicLayout = {
    template: `
      <layout
        :menus="menus"
        :show-settings="true"
        :need-tags-view="false"
        :fixed-header="true"
        :sidebar="sidebar"
        device="desktop"
        :handleCollapse="handleCollapse"
        :toggleSideBar="toggleSideBar"
        mode="mixLayout"
      >
        <template slot="rightMenuRender">
            <div style="display: flex;align-items: center;height: 100%;">
                <a href="https://github.com/eeezgame" target="_blank" rel="noopener noreferrer" style="height:40px;">
                    <img src="https://octodex.github.com/images/pusheencat.png" width="40" height="40"></img>   
                </a>
            </div>
        </template>
        <app-main>
            <router-view></router-view>
        </app-main>
      </layout>
    `,
    data(){
      return {
        menus,
        sidebar:{
            opened:true,
            withoutAnimation: false
        }
      }
    },
    methods:{
        handleCollapse(){
            this.sidebar.opened = false
        },
        toggleSideBar(){
            this.sidebar.opened = !this.sidebar.opened
        }
    }
}
const nestedMenuRouter = {
    path: "/nested",
    component: BasicLayout,
    redirect: "/nested/menu1/menu1-1",
    name: "Nested",
    meta: {
        title: "Nested Routes",
        icon: "nested",
    },
    children: [
        {
            path: "/nested/menu1/menu1-1",
            component: Menu1_1,
            name: "Menu1-1",
            meta: { title: "Menu 1-1" },
        },
        {
            path: "/nested/menu1/menu1-2",
            component: Menu1_2,
            name: "Menu1-2",
            redirect: "/nested/menu1/menu1-2/menu1-2-1",
            meta: { title: "Menu 1-2" },
        },
        {
            path: "/nested/menu1/menu1-2/menu1-2-1",
            component: Menu1_2_1,
            name: "Menu1-2-1",
            meta: { title: "Menu 1-2-1" },
        },
        {
            path: "/nested/menu1/menu1-2/menu1-2-2",
            component: Menu1_2_2,
            name: "Menu1-2-2",
            meta: { title: "Menu 1-2-2" },
        },
        {
            path: "/nested/menu1/menu1-3",
            component: Menu1_3,
            name: "Menu1-3",
            meta: { title: "Menu 1-3" },
        },
        {
            path: "/nested/menu2",
            name: "Menu2",
            component: Menu2,
            meta: { title: "Menu 2" },
        },
    ],
};


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const asyncRoutes = [
    {
        path: "/",
        component: BasicLayout,
        redirect: "dashboard",
        children: [
          {
            path: "dashboard",
            component: Dashboard,
            name: "Dashboard",
            meta: {
              title: "dashboard",
              icon: "dashboard",
              affix: true,
            },
          },
        ],
    },
    {
        path: "/permission",
        component: BasicLayout,
        redirect: "/permission/page",
        alwaysShow: true, // will always show the root menu
        name: "Permission",
        meta: {
            title: "权限",
            icon: "lock",
            roles: ["admin", "editor"], // you can set roles in root nav
        },
        children: [
            {
                path: "page",
                component: PagePermission,
                name: "PagePermission",
                meta: {
                    title: "页面权限",
                    roles: ["admin"], // or you can only set roles in sub nav
                },
            },
            {
                path: "directive",
                component: DirectivePermission,
                name: "DirectivePermission",
                meta: {
                    title: "指令权限",
                    // if do not set roles, means: this page does not require permission
                },
            },
            {
                path: "role",
                component: RolePermission,
                name: "RolePermission",
                meta: {
                    title: "角色权限",
                    roles: ["admin"],
                },
            },
        ],
    },
    nestedMenuRouter,
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
    routes:asyncRoutes
})
