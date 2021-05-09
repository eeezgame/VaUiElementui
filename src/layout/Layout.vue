<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="isMobile && sidebar.opened"
      class="drawer-bg"
      @click="handleCollapse"
    />
    <sidebar
      class="sidebar-container"
      :sidebar="sidebar"
      :menus="menus"
      :title="title"
      :logo="logo"
      :handle-logo-click="handleLogoClick"
    />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar
          :sidebar="sidebar"
          :device="device"
          :menus="menus"
          :toggleSideBar='toggleSideBar'
        >
          <template slot="rightMenuRender">
            <slot name="rightMenuRender"></slot>
          </template>
        </navbar>
        <template  v-if="needTagsView" >
          <slot name="tagsView"></slot>
        </template>
      </div>
      <slot></slot>
      <right-panel v-if="showSettings">
        <slot name="settingsDrawer"></slot>
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import {
  Navbar,
  NavBarProps,
  Sidebar,
  SidebarProps,
} from "./components";
import { LAYOUT_MODE, DEVICE_MODE } from "@/types"
const LayoutProps = Object.assign({}, NavBarProps, SidebarProps, {
  showSettings: {
    type: Boolean,
    default: false,
  },
  needTagsView: {
    type: Boolean,
    default: false,
  },
  fixedHeader: {
    type: Boolean,
    default: false,
  },
  handleCollapse:{
    type: Function,
    default: ()=>{}
  },
  toggleSideBar:{
    type: Function,
    default: ()=>{}
  },
  mode:{
    type:String,
    default: LAYOUT_MODE.sideMenuLayout,
    validator: function (value) {
      return [LAYOUT_MODE.leftLayout, LAYOUT_MODE.mixLayout, LAYOUT_MODE.sideMenuLayout, LAYOUT_MODE.topMenu].indexOf(value) !== -1
    }
  },
  dashboardPath: {
    type: String,
    default: "/dashboard"
  }
});
export default {
  name: "Layout",
  components: {
    Navbar,
    RightPanel,
    Sidebar,
  },
  provide () {
    return {
      layout: this
    }
  },
  props: LayoutProps,
  data(){
    return {
      currentTopMenu: null
    }
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === DEVICE_MODE.mobile
      };
    },
    isMobile() {
      return this.device === DEVICE_MODE.mobile
    }
  },
  methods: {
    setCurrentTopMenu(topMenu){
      this.currentTopMenu = topMenu
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container ::v-deep{
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 16px;
  }

  .sub-el-icon {
    margin-right: 12px;
    margin-left: -2px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $menuHover !important;
    }
    height: $subMenuTitleHeight;
    line-height: $subMenuTitleHeight;
    font-size: $subMenuTitleFontSize;
    i {
      color: #ffffff;
    }
    span {
      font-size: 12px;
    }
  }

  .is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;
    height: $subMenuItemHeight;
    line-height: $subMenuItemHeight;
    font-size: $subMenuItemFontSize;
    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.hideSidebar ::v-deep {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px;
  }

  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }
    }
  }

  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}

::v-deep .el-menu--collapse .el-menu .el-submenu {
  min-width: $sideBarWidth !important;
}

// mobile responsive
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}

// when menu collapsed
::v-deep .el-menu--vertical {
  &>.el-menu {
    .svg-icon {
      margin-right: 16px;
    }
    .sub-el-icon {
      margin-right: 12px;
      margin-left: -2px;
    }
  }

  .nest-menu .el-submenu>.el-submenu__title,
  .el-menu-item {
    &:hover {
      // you can use $subMenuHover
      background-color: $menuHover !important;
    }
  }

  // the scroll bar appears when the subMenu is too long
  >.el-menu--popup {
    max-height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>
