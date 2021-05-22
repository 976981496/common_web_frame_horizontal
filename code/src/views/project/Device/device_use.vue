<template>
  <div class="app-container">
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="系统信息及网络" name="first">
<network-info/>
</el-tab-pane>
    <el-tab-pane label="开门条件" name="second">
<OpenDoor/>
</el-tab-pane>
    <el-tab-pane label="提示音和显示" name="third">
      <Parameter/>
    </el-tab-pane>
    <el-tab-pane label="系统参数配置" name="fourth">
      <Sound/>

</el-tab-pane>  <el-tab-pane label="系统时间" name="fifth">
  <SystemTime/>
</el-tab-pane>

  </el-tabs>
  </div>
</template>

<script>
import NetworkInfo from "./device_use_item/network_info";
import OpenDoor from "./device_use_item/open_door";
import Parameter from "./device_use_item/parameter";
import Sound from "./device_use_item/sound";
import SystemTime from "./device_use_item/system_time";
export default {
  data() {
    return {
        activeName: 'first'
    }
  },
   components:{
        NetworkInfo,
        OpenDoor,
        Parameter,
        Sound,
        SystemTime,
    },
  created() {
  },
   methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 85px);

}
</style>
