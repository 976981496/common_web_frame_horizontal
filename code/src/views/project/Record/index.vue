<template>
<el-container>
  <el-aside width="200px">
     <Navigation :navList='navList'></Navigation>
  </el-aside>
  <el-main>
      <router-view/>
  </el-main>
</el-container>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
    name: 'App',
    components:{
        Navigation
    },
      data() {
    return {
      navList: [
        { name: "/record/opendoor", navItem: "开门记录" },
        { name: "/record/snap", navItem: "抓拍记录" },
        { name: "/record/devicelog", navItem: "设备日志" },
      ]
    };
  },
}
</script>
<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 110px);

}
</style>
