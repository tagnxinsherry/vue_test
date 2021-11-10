<template>
    <div>
        <h1>{{ msg }}</h1>
        <el-form ref="form" :model="form" label-width="80px" class="form_style" >
            <el-form-item label="员工姓名" >
            <el-input v-model="form.empname" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
            <el-input v-model="form.bsaralry" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.hiredate" style="width: 40% ;float: left;"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item label="所属部门">
            <el-select v-model="form.depid"  style="float: left;" placeholder="请选择所属部门">
            <el-option 
             v-for="item in depart"
             :key="item.depid"
             :label="item.depname"
             :value="item.depid">
             </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="家庭住址">
            <el-input type="textarea" v-model="form.address" style="width: 40% ;float: left;"></el-input>
        </el-form-item>
        <el-form-item style="margin-right:500px;">
            <el-button type="primary"  @click="onSubmit">修改员工</el-button>
            <el-button >重置员工</el-button>
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
           msg:"修改员工信息" ,
            form: {
                empname: '',
                bsaralry: '',
                hiredate: '',
                address: '',
                depid:''
            },
            depart:[],
            
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
         getData() {
             const empid=this.$route.query.id
             axios.get("api/pre_update/"+empid).then(res=>{
                 this.form = res.data.employee; //完成数据回显
                 this.depart=res.data.departList;
                });
      },
      onSubmit() {
            axios.put('api/updateEmp',this.form).then(successResponse => {
             console.log("糖心",successResponse)
            if (successResponse.status === 200) {
              this.$message({
                type: "success",
                message: "修改成功!"//修改成功后提示新增成功
              });
              setTimeout(() => {
                this.$router.push({ path: "/" })
              }, 3000);//1s后跳到这个路由
            }
          })
          .catch(failResponse => {
          })
        console.log('submit!', this.form);
        // axios.post('api/create').then(res => {
        //   this.$router.push('/')
        // })
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
