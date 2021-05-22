<template>
  <div class="app-container">
    <Table
      id="out-table"
      ref="tabele"
      :tableData="list"
      :Option="tableOption"
      :labelData="labelData"
      :listLoading="listLoading"
      @handleButton="handleButton"
    >

      <el-input
        slot="top"
        class="search"
        v-model="searchKey"
        placeholder="输入人员编号或姓名搜索"
        prefix-icon="el-icon-search"
      ></el-input>
  <el-button
      class="export_btn"
        slot="top"
        size="mini"
        type="primary"
        @click="handleExport()"
      >导出</el-button>
<div class="top_select" slot="top">
      <span class="top_text" >时间段</span>
    <el-date-picker
    size="mini"
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

</div>
<div class="top_select" slot="top">
      <span class="top_text" >开门方式</span>
        <el-select  slot="top" size="mini"  v-model="open_type" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

</div>

<div class="top_select" slot="top">
      <span class="top_text" >角色</span>
        <el-select  slot="top" size="mini"  v-model="role" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

</div>



    </Table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :page_num.sync="listQuery.page_num"
      @pagination="getList"
    />
    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="89px"
        style="width: 460px; margin-left:21px;"
      >
        <el-form-item
          v-for="(label,index) in labelDataDialog"
          :key="index"
          :label="label.name"
          :prop="label.value"
        >
          <template v-if="label.type=='string'">
            <el-input
              v-model.trim="temp[`${label.value}`]"
              :placeholder="label.placeholder"
              :disabled="label.isEdit&&textMap[dialogStatus]==='编辑'"
            />
          </template>
          <template v-if="label.type=='radio'">
            <el-radio-group v-model="temp[`${label.value}`]">
              <el-radio
                v-for="(child,index) in label.childrens"
                :key="index"
                :label="child.value"
              >{{child.name}}</el-radio>
            </el-radio-group>
          </template>
          <template v-if="label.type=='select'">
            <el-select v-model="temp[`${label.value}`]" :placeholder="label.placeholder">
              <el-option
                v-for="(child,index) in label.childrens"
                :key="index"
                :label="child.name||''"
                :value="child.department_id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'? createData() : updateData()"
        >确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import {
  stafftList,
  stafftSearchList,
} from "@/api/record";
import checkPermission from "@/utils/permission"; // 权限判断函数
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";

export default {
  components: { Pagination, Table },
  data() {
    return {
      open_type:'',
      role:'',
      time:'',
      options:[{
        label:'角色',
        value:'1'

      },{
        label:'角色',
        value:'2'

      },{
        label:'角色',
        value:'3'

      },{
        label:'角色',
        value:'4'

      },],
      searchKey: "",
      headers: {
        token: getToken()
      },
      uploadData: {
        "Content-Type": "multipart/form-data"
      },
      filename: "",
      fileList: [],
      labelData: [
        {
          name:  '姓名',
          type: "string",
          value: "name"
        },
        {
          name:  '角色',
          type: "string",
          value: "name_pinyin"
        },
        {
          name:  '设备名称',
          type: "string",
          value: "identifier"
        },

        {
          name: '抓拍照片',
          type: "image",
          value: "avatar",
          width: 200
        },
        {
          name:  '开门时间',
          type: "string",
          value: "genderName"
        },
        {
          name:  '开门方式',
          type: "string",
          value: "phone"
        }
      ],

      labelDataDialog: [
        {
          name:  '姓名',
          type: "string",
          value: "name",
          width: 120,
          isEdit: false,
          placeholder: "请输入姓名"
        },
        {
          name:  '姓名',
          type: "string",
          value: "name_pinyin",
          width: 120,
          isEdit: false,
          placeholder: "请输入姓名拼音"
        },
        {
          name:  '姓名',
          type: "string",
          value: "identifier",
          width: 120,
          isEdit: true,
          placeholder: "请输入人员编号"
        },
        {
          name:  '姓名',
          type: "radio",
          value: "gender",
          width: 80,
          childrens: [
            {
              name: "男",
              value: 0
            },
            {
              name: "女",
              value: 1
            }
          ]
        },
        {
          name:  '姓名',
          type: "string",
          value: "phone",
          width: 120,
          isEdit: false,
          placeholder: "请输入手机号码"
        },
        {
          name:  '姓名',
          type: "select",
          value: "department_id",
          width: 120,
          placeholder: "请选择上级部门"
        },
        {
          name:  '姓名',
          type: "image",
          value: "avatar",
          width: 200
        }
      ],
      tableOption: {
        name:  '操作',
        type: "string",
        value: "actions",
        options: [
          {
            label: '姓名',
            type: "text",
            size: "mini",
            auth: this.update,
            methods: "editRechange"
          },
          {
            label:  '姓名',
            type: "text",
            size: "medium",
            auth: this.authDelete,
            textcolor: "textcolor",
            methods: "delectRechange"
          }
        ]
      },
      dialogFormVisible: false,
      dialogImportVisible: false,
      dialogStatus: "",
      textMap: {
        update:  '编辑',
        create:  '新增'
      },
      imageUrl: "",
      loadingStatus: false,
      list: null,
      canUpload: true,
      departList: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_num: 20
      },
      temp: {
        avatar: "",
        name: "",
        name_pinyin: "",
        identifier: "",
        gender: 0,
        phone: "",
        department_id: 0
      },
      rules: {
        // name: [
        //   { required: true, message: "请填写人员名称！", trigger: "change" },
        //   { validator: validateName, trigger: "blur" }, // 'blur'是鼠标失去焦点的时候会触发验证
        //   { min: 1, max: 64, message: "长度在 1 到 64 个字符内" }
        // ],
        // name_pinyin: [
        //   { required: true, message: "请填写人员名称拼音", trigger: "change" },
        //   { validator: validatePingying, trigger: "blur" }
        // ],
        // identifier: [
        //   { required: true, message: "请填写人员编号！", trigger: "change" },
        //   { validator: validateIdentifier, trigger: "blur" }, // 'blur'是鼠标失去焦点的时候会触发验证
        //   { min: 1, max: 64, message: "长度在 1 到 64 个字符内" }
        // ],
        // gender: [
        //   { required: true, message: "选择人员性别！", trigger: "change" }
        // ],
        // phone: [
        //   { required: true, message: "请填写手机号码！", trigger: "change" },
        //   { validator: validatePhone, trigger: "blur" }
        // ],
        // department_id: [
        //   { required: true, message: "选择上级部门！", trigger: "change" }
        // ]
      },
      xlsxSize:1024*1024*5,
      zipSize:1024*1024*500,
    };
  },
  created() {
    // this.getList();
    // this.getdepartList();
  },

  computed: {
    // ...mapGetters(["control", "update", "read", "authDelete"])
  },

  watch: {
    // searchKey(newV, oldV) {
    //   if (newV) {
    //     this.listQuery.page = 1;
    //     this.getStaffSearchList();
    //   } else {
    //     this.getList();
    //   }
    // },
    // fileList: {
    //   handler(newVal, oldVal) {
    //     console.log("fileList", newVal);
    //     if (newVal.length < 1) {
    //       this.canUpload = true;
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {


    handleExport() {
      console.log("导出数据");
      let data = { key_word: "" };
      exportStafft(data)
        .then(response => {
          if (response.status_code === 1000) {
            this.$notify({
              title: "导出任务已提交成功！",
              message: "请到任务管理页面查看任务进度！并下载相关文件",
              type: "success"
            });
          }
        })
        .catch(() => {
          this.loadingStatus = false;
        });
    },
    // 子组件调用的button的方法
    handleButton(val) {
      if (val.method == "editRechange") {
        this.handleUpdate(val.row);
      } else {
        this.handleDelete(val.row);
      }
    },
    getList() {
      this.listLoading = true;
      if (this.total < (this.listQuery.page - 1) * this.listQuery.page_num) {
        this.listQuery.page = 1;
      }
      stafftList(this.listQuery).then(response => {
        this.total = response.total_num;
        // 向数组里每一个对象添加.genderName的属性
        this.list = response.staffs.map(item => {
          if (item.gender === 0) {
            item.genderName = "男";
          } else {
            item.genderName = "女";
          }
          return item;
        });
        setTimeout(() => {
          this.listLoading = false;
        }, 0 * 1000);
      });
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.imageUrl = row.avatar;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData(newValue) {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          delete tempData.genderName;
          this.loadingStatus = true;
          editStafft(tempData)
            .then(() => {
              this.loadingStatus = false;
              for (const v of this.list) {
                if (v.staff_id === this.temp.staff_id) {
                  let staffNow = [];
                  // 编辑时候的上级部门id   转换成上级部门name替换到列表里面
                  staffNow = this.departList.filter(item => {
                    return item.department_id === this.temp.department_id;
                  });
                  this.temp.department_name = staffNow[0].name;
                  if (tempData.gender === 0) {
                    this.temp.genderName = "男";
                  } else {
                    this.temp.genderName = "女";
                  }
                  const index = this.list.indexOf(v);
                  this.list.splice(index, 1, this.temp);
                  break;
                }
              }
              this.dialogFormVisible = false;
              this.imageUrl = "";
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            })
            .catch(() => {
              this.loadingStatus = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  overflow: auto;
  .top_text{
    line-height: 40px;
    margin-left: 30px;
    // float: right;
  }
  .export_btn{
    float: right;
    margin-left: 20px;
  }
   .top_select{
    line-height: 40px;
    float: right;
    /deep/ .el-range-separator{
      width: 6%;
    }
  }
  .create_btn{
    margin-left: 20px;
  }
  .search {
    width: 200px;
    float: left;
    margin-bottom: 20px;
  }

  /deep/ .el-dialog {
    width: 540px;
    padding-bottom: 19px;
    margin-bottom: 30px;
    .uplode_ico {
      width: 19px;
      height: 19px;
      margin-top: 43px;
    }
    .uplode_lable {
      font-size: 14px;
      margin-top: 20px;
      line-height: 15px;
    }
    .avatar-uploader-view {
      color: #808080;
      width: 176px;
      height: 126px;
      line-height: 126px;
      text-align: center;
      background-color: rgba(238, 238, 238, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 2px solid #bfbfbf;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    /deep/ .el-dialog__header {
      height: 77px;
      line-height: 77px;
      padding: 0 40px;
      font-size: 18px;
      font-weight: bold;
      color: #2b2b2b;
      border-bottom: 1px solid #e5e5e5;
      /deep/ .el-dialog__headerbtn {
        position: absolute;
        top: 27px;
        right: 46px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .el-dialog__body {
      padding: 37px 21px 0px 20px;
    }

    .el-dialog__footer {
      padding-top: 0px;
    }
    /deep/ .el-form-item__label {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 52px;
      height: 52px;
      color: #808080;
      font-weight: normal;
    }

    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-input__inner {
      line-height: 52px;
      height: 52px;
      font-size: 14px;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
      /deep/ .el-button {
        width: 216px;
        height: 52px;
        font-size: 16px;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #777777;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 176px;
    height: 126px;
    line-height: 126px;
    text-align: center;
    border: 1px dashed #777777;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

