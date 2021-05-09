<template>
  <div class="top-menu-container" ref="topMenu">
    <div
        v-for="item in headerVisibleMenus"
        :key="item.path"
        class="top-menu-item hover-effect"
        @click="handleTopMenuClick(item)"
    >
      <a
          :class="activeMenu && activeMenu.path == item.path ? 'active' : ''"
      >{{ item.meta.title }}</a
      >
    </div>
    <div ref="moreItem" class="more-item hover-effect" v-show="topMenus && topMenus.length>0 && overflowed">
      <el-dropdown trigger="click">
          <i class="el-icon-more" style="color: #ffffff"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
              v-for="item in overflowedItems"
              :key="item.path"
              class="top-menu-item hover-effect"
              @click.native="handleTopMenuClick(item)"
          >
            <span
                :style="{
                  color: activeMenu && activeMenu.path == item.path ? '#409eff' : ''
                }"
            >
              {{ item.meta.title }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
import { LAYOUT_MODE } from "@/types"
import throttle from "lodash.throttle";

const getWidth = elem => {
  let width =
      elem &&
      typeof elem.getBoundingClientRect === "function" &&
      elem.getBoundingClientRect().width;
  if (width) {
    width = +width.toFixed(6);
  }
  return width || 0;
};

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
    this.resizeObserver = null;
    this.mutationObserver = null;
    this.fullWidth = 0;
    // original scroll size of the list
    this.originalTotalWidth = 0;
    this.originalTopMenuWidth = 0;
    // copy of overflowed items
    // this.overflowedItems = [];

    // cache item of the original items (so we can track the size and order)
    this.menuItemSizes = [];
    this.overflowedItemsSizes = [];

    return {
      overflowed: false,
      overflowedItems: [],
      lastVisibleIndex: undefined,
      lazyM:[]
    };
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
          (this.$route.fullPath + '/').startsWith(menu.path + '/')
      );
    },
    headerVisibleMenus() {
      return this.topMenus.filter(menu => {
        return !this.overflowedItems.includes(menu);
      });
    },
  },
  watch: {
    activeMenu: {
      handler: function (val) {
        if (val) {
          this.layout && this.layout.setCurrentTopMenu(val)
        }
      },
      immediate: true,
    },
  },
  mounted(){
    const menuItemNodes = this.getMenuItemNodes();
    this.fullWidth = menuItemNodes
        .map(c => getWidth(c))
        .reduce((acc, cur) => acc + cur, 0);
    this.$nextTick(() => {
      this.setWidthAndResize();
      const myObserver = new ResizeObserver(
          throttle(entries => {
            entries.forEach(entry => {
              this.setWidthAndResize();
              if (entry.target.className.split(" ").indexOf("top-menu") >= 0) {
                if (entry.contentRect.width > this.originalTopMenuWidth) {
                  this.resetTopMenu();
                }
                this.originalTopMenuWidth = getWidth(this.$refs.topMenu);
              }
            });
          }),
          500
      );
      this.resizeObserver = myObserver;
      [].slice
          .call(this.$refs.topMenu.children)
          .concat(this.$refs.topMenu)
          .forEach(el => {
            this.resizeObserver.observe(el);
          });

      if (typeof MutationObserver !== "undefined") {
        this.mutationObserver = new MutationObserver(() => {
          this.resizeObserver.disconnect();
          [].slice
              .call(this.$refs.topMenu.children)
              .concat(this.$refs.topMenu)
              .forEach(el => {
                this.resizeObserver.observe(el);
              });
          this.setWidthAndResize();
        });
        this.mutationObserver.observe(this.$refs.topMenu, {
          attributes: false,
          childList: true,
          subTree: false
        });
      }
    });
  },
  beforeDestroy() {
    // console.log("over death");
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
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
    getMenuItemNodes() {
      const topMenu = this.$refs.topMenu;
      if (!topMenu) {
        return [];
      }
      return [].slice
          .call(topMenu.children)
          .filter(
              node => node.className.split(" ").indexOf("top-menu-item") >= 0
          );
    },
    setWidthAndResize() {
      const menuItemNodes = this.getMenuItemNodes();
      this.menuItemSizes = menuItemNodes.map(c => getWidth(c));
      this.overflowed = true;
      this.overflowedIndicatorWidth = getWidth(this.$refs.moreItem);
      this.originalTotalWidth = this.menuItemSizes.reduce(
          (acc, cur) => acc + cur,
          0
      );
      this.handleResize();
      if (getWidth(this.$refs.topMenu) - 10 >= this.fullWidth) {
        this.overflowedItems = [];
        this.overflowed = false;
      }
    },
    resetTopMenu() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      this.overflowed = false;
      this.overflowedItems = [];
      [].slice
          .call(this.$refs.topMenu.children)
          .concat(this.$refs.topMenu)
          .forEach(el => {
            this.resizeObserver.observe(el);
          });
    },
    handleResize() {
      let width = getWidth(this.$refs.topMenu);
      // this.overflowedItems = [];
      // this.overflowed = false;
      let currentSumWidth = 0;
      let lastVisibleIndex;
      if (
          this.originalTotalWidth + this.overflowedIndicatorWidth + 10 >=
          width
      ) {
        lastVisibleIndex = -1;
        this.menuItemSizes.forEach(itemWidth => {
          currentSumWidth += itemWidth;
          if (currentSumWidth + this.overflowedIndicatorWidth <= width) {
            lastVisibleIndex += 1;
          }
        });
        this.lastVisibleIndex = lastVisibleIndex;
        this.overflowedItems = this.topMenus.slice(this.lastVisibleIndex);
        this.overflowed = true;
      } else {
        this.lastVisibleIndex = lastVisibleIndex;
        if (this.lastVisibleIndex !== void 0) {
          this.overflowedItems = this.topMenus.slice(this.lastVisibleIndex);
        }
      }

    },
  }
};
</script>

<style lang="scss" scoped>
.top-menu-container {
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
    & a.active {
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

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
      &:hover {
        background: rgba(0, 0, 0, 0.925);
      }
    }
  }
}
</style>
