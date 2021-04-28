<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    iconRender:{
      type: Function,
      default: null
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, iconRender, title } = context.props;
    const vnodes = [];

    if (iconRender && typeof iconRender === "function") {
      vnodes.push(iconRender(h))
    } else if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
