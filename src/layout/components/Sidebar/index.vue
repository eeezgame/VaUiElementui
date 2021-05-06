<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :handle-logo-click="handleLogoClick" :logo='logo' :title="title" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in sideMenus"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :device='device'
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { LAYOUT_MODE } from "@/types"
const variables = {
  menuBg: '#304156',
  menuText: '#bfcbd9',
  menuActiveText: '#409EFF'
}

export const SidebarProps =  {
  sidebar: {
    type: Object,
    default: () => {
      return {
        opened: true,
        withoutAnimation: false,
      };
    },
  },
  menus: {
    type: Array,
    default: () => [],
  },
  device: {
    type: String,
    default: "desktop",
  },
  title: {
    type: String,
    default: ""
  },
  logo:{
    type: String,
    default: "https://avatars.githubusercontent.com/u/63237008?v=4"
  },
  handleLogoClick: {
    type: Function,
    default: ()=>{}
  }
};

export default {
  components: { SidebarItem, Logo },
  inject: ['layout'],
  props: SidebarProps,
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    sideMenus() {
      const _currentTopMenu = this.layout && this.layout.currentTopMenu
      const _layoutMode = this.layout && this.layout.mode
      if (_currentTopMenu && _layoutMode === LAYOUT_MODE.mixLayout) {
        if (_currentTopMenu.path == this.layout.dashboardPath) {
          return [_currentTopMenu];
        } else {
          const activedSideMenu = this.menus.find(
            (item) => item.path === _currentTopMenu.path
          );
          if (activedSideMenu && activedSideMenu.children) {
            const formattedSideMenu = activedSideMenu.children.map(child=>{
              if(child.path[0] === '/'){
                return child
              } else {
                return Object.assign({}, child, {
                  path: activedSideMenu.path + '/' + child.path
                });
              }
            });
            return formattedSideMenu;
          } else {
            return [];
          }
        }
      } else if(_layoutMode === LAYOUT_MODE.sideMenuLayout){
        return this.menus;
      }

      return this.menus;
    },
    showLogo() {
      return true;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss" scoped></style>
