<template>
  <div class="app-container">
    <el-container>
      <el-aside width="250px">
        <h3>设备总览</h3>
        <div class="aside_item">
          <div>累计人脸识别（次)</div>
          <h1>123</h1>
        </div>
        <div class="aside_item">
          <div>累计注册人脸（次）</div>
          <h1>9999</h1>
        </div>
          <div class="aside_item">
            <h4>运行状态概览</h4>

            <div class="aside_item_text">开机时间：2020/3/10 20:13</div>

            <div class="aside_item_text">CPU： 70%；内存：60%</div>

            <div class="aside_item_text">存储空间：6G/8G</div>
          </div>

          <div class="aside_item">
            <h4>设备基本信息</h4>

            <div class="aside_item_text">IP地址：10.10.10.105</div>

            <div class="aside_item_text">MAC地址：dedd12de3</div>

            <div class="aside_item_text">SN：1234567890</div>
            <div class="aside_item_text">软件版本：ver1.1.3</div>
            <div class="aside_item_text">固件版本：ver1.2.3</div>
            <div class="aside_item_text">服务器地址：www.xx.com</div>



        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import {  fetchList} from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>
<style   lang="scss" scoped>
.app-container{
  padding: 0;
  height: calc(100vh - 110px);
    .aside_item {
    border-top: 1px solid #ccc;
    padding: 10px;
  }

  .aside_item_text {
    text-align: left
  }
}

</style>
