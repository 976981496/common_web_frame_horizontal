<template>
  <div class="navigation">
    <el-menu
      :default-active="this.$route.path"
      mode="vertical"
      background-color="#ccc"
      router
      @select="handleSelect"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    navList: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      // navList: [
      //   { name: "/", navItem: "实时" },
      //   { name: "/device_manager", navItem: "设备管理" },
      //   { name: "/authority_manager", navItem: "权限管理" },
      //   { name: "/records_manager", navItem: "记录管理" },
      //   { name: "/diagnose_tools", navItem: "诊断工具" }
      // ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-item:hover {
  outline: 0 !important;
  color: #ccc !important;
  background: #ccc;
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #ccc !important;
}
</style>
