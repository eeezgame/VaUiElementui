<template>
  <div class="top-menu">
    <div
      class="top-menu-item hover-effect"
      v-for="item in topMenus"
      :key="item.path"
      @click="handleTopMenuClick(item)"
    >
      <span
        :class="activeMenu && activeMenu.path == item.path ? 'active' : ''"
        >{{ item.meta.title }}</span
      >
    </div>
    <div class="more-item" ref="moreItem" v-show="topMenus && topMenus.length>0">
      <i class="el-icon-more" style="color: #ffffff"></i>
    </div>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
import { LAYOUT_MODE } from "@/types"

export default {
  name: "MenuHeader",
  inject: ['layout'],
  props: {
    menus: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    topMenus() {
      if(this.layout && this.layout.mode === LAYOUT_MODE.mixLayout){
        return this.menus.filter((menu) => menu.path != this.layout.dashboardPath);
      } else {
        return []
      }
    },
    activeMenu() {
      return this.menus.find((menu) =>
        this.$route.fullPath.startsWith(menu.path)
      );
    },
  },
  watch: {
    activeMenu: {
      handler: function (val) {
        if (val) {
          // this.$store.commit("user/SET_CURRENT_TOPMENU", val);
          this.layout && this.layout.setCurrentTopMenu(val)
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleTopMenuClick(topMenu) {
      if (topMenu) {
        !isExternal(topMenu.path) &&
          this.layout &&
          this.layout.setCurrentTopMenu(topMenu)
      } else {
        this.layout && this.layout.setCurrentTopMenu(null)
      }

      if (topMenu && topMenu.path && !topMenu.children) {
        if (isExternal(topMenu.path)) {
          window.open(topMenu.path);
        } else {
          this.$router.push({ path: topMenu.path });
        }
      }
      
    },
  }
};
</script>

<style lang="scss" scoped>
.top-menu {
  font-size: 12px;
  color: #fff;
  .top-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 12px;
    color: #ffffff;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
      &:hover {
        background: rgba(0, 0, 0, 0.925);
      }
    }
    & span.active {
      color: #409eff;
    }
  }
  .more-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 12px;
    color: #ffffff;
    vertical-align: text-bottom;
    color: #ccc;
  }
}
</style>
