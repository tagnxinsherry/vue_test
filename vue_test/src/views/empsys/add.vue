<template>
    <div>
        <h1>{{ msg }}</h1>
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
            <el-form-item label="员工姓名"  prop="empname">
            <el-input v-model="form.empname" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="基本工资" prop="bsaralry">
            <el-input v-model.number="form.bsaralry" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="hiredate">
        <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.hiredate" style="width: 40% ;float: left;"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item label="所属部门" prop="depid">
            <el-select v-model="form.depid"  style="float: left;" placeholder="请选择所属部门">
            <el-option 
             v-for="item in depart"
             :key="item.depid"
             :label="item.depname"
             :value="item.depid">
             </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
            <el-input type="textarea" v-model="form.address" style="width: 40% ;float: left;"></el-input>
        </el-form-item>
        <el-form-item style="margin-right:500px;">
          <dev v-if="show">
            <el-button type="primary"  @click="onSubmit('form')">添加员工</el-button>
            <el-button @click="resetForm('form')" >重置员工</el-button>
          </dev>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8086"
export default {
    data(){
           var checkbsaralry = (rule, value, callback) => {
                if (!value&&value!=0) {
                return callback(new Error('请输入基本薪资'));
               }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
            callback(new Error('请输入2位小数的数字值'));
            } else {
              if (value <= 0) {
                callback(new Error('请输入大于0小于5000的数值'));
              } else if(value >5000){
                callback(new Error('请输入大于0小于5000的数值'));
              }
               else {
                callback();
              }
            }
          }, 1000);
      }
        return{
          show: true,
           msg:"添加员工信息" ,
            form: {
                empname: '',
                bsaralry: '',
                hiredate: '',
                address: "",
                depid:''
            },
            depart:[],
            rules: {
              empname: [
                { required: true, message: '请输入员工姓名', trigger: 'blur' },
                { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
              ],
              bsaralry: [
                { required: true,validator: checkbsaralry, trigger: 'blur' },
              ],
              hiredate: [
                { type: 'date', required: true, message: '请选择入职日期', trigger: 'change' }
              ],
              depid: [
                { required: true, message: '请选择部门', trigger: 'change' }
          ]
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
         getData() {
            axios.get("api/pre_add").then(res =>{
            console.log('data', res.data)
            this.depart  =res.data.departList
         }    )
      },
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
           if (valid) {
           axios.post('api/addEmp',this.form).then(successResponse => {
             console.log("糖心",successResponse)
            if (successResponse.status === 200) {
              this.$message({
                type: "success",
                message: "新增成功!"//添加成功后提示新增成功
              });
              setTimeout(() => {
                this.$router.push({ path: "/" })
              }, 3000);//1s后跳到这个路由
            }
          })
          .catch(failResponse => {
          })
        console.log('submit!', this.form);
          } else {
            console.log('error submit!!');
            return false;
          }
        })
            
        // axios.post('api/create').then(res => {
        //   this.$router.push('/')
        // })
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }  
}
</script>
<style scoped>
.demo-ruleForm{
 margin-left:500px;
 margin-top: 6px;
 }
.form_input{
   width: 30%;
   float: left;
   }
</style>
