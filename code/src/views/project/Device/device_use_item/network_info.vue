<template>
  <div class="app-container">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="设备信息">
    <template>
    <el-input v-model="form.name"></el-input>
    
</template>
  </el-form-item>
  <el-form-item label="版本信息">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="硬件信息">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="网络信息">
   
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  computed: {
  },
  created() {
  },
  methods:{
      onSubmit() {
        console.log('submit!');
      }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 85px);

}
</style>
