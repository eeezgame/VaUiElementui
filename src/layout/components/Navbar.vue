<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <menu-header
      :menus="menus"
      class="menu-header"
    ></menu-header>

    <div class="right-menu">
      <slot name="rightMenuRender">
      </slot>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
import MenuHeader from "./MenuHeader";
import { DEVICE_MODE } from "@/types"

export const NavBarProps = {
  sidebar: {
    type: Object,
    default: () => {
      return {
        opened: true,
        withoutAnimation: false,
      };
    },
  },
  device: {
    type: String,
    default: DEVICE_MODE.desktop,
    validator: function (value) {
      return [DEVICE_MODE.desktop, DEVICE_MODE.mobile].indexOf(value) !== -1
    }
  },
  menus: {
    type: Array,
    default: () => [],
  },
  toggleSideBar: {
    type:Function,
    default: () => {}
  }
};

export default {
  components: {
    Hamburger,
    MenuHeader,
  },
  props: NavBarProps
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #2b2f3a;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.925);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .menu-header {
    height: 100%;
    line-height: 50px;
    width: 100%;
    white-space: nowrap;
  }
  .right-menu {
    // float: right;
    white-space: nowrap;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.925);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          & + .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 20px;
            font-size: 12px;
            color: #ffffff;
          }
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
