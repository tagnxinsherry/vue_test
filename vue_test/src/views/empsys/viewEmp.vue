<template>
    <div>
        <h1>{{ msg }}</h1>
        <el-form ref="form" :model="form" label-width="80px" class="form_style" disabled="true"   >
            <el-form-item label="员工姓名" >
            <el-input v-model="form.empname" class="form_input" ></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
            <el-input v-model="form.bsaralry" class="form_input" ></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.hiredate" style="width: 40% ;float: left;" ></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item label="所属部门">
            <el-select v-model="form.depname"  style="float: left;"  ></el-select>
        </el-form-item>
        <el-form-item label="家庭住址">
            <el-input type="textarea" v-model="form.address" style="width: 40% ;float: left;" ></el-input>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8086"
export default {
    data(){
        return{
          show: false,
           msg:"员工详细信息" ,
            form: {
                empname: '',
                bsaralry: '',
                hiredate: '',
                address: '',
                depname:''
            }
        }
    },
    created() {
      // const type = this.$route.query.type
      // console.log('type',type)
      // if (type ==1) {
      //   this.show = true
      // } else {
      //   this.show =false
      // }

      this.getData()
    },
     methods: { 
      getData(){
           const empid=this.$route.query.id
             axios.get("api/viewEmp/"+empid).then(res=>{
                 this.form = res.data.EmployeeVo; //完成数据回显
                });
         }
    }  
}
</script>
<style scoped>
.form_style{
 margin-left:500px;
 margin-top: 6px;
}
.form_input{
   width: 30%;
   float: left;
}
</style>
