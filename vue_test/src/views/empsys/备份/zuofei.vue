<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="addlink" class="btn-add" type="primary">添加员工</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="部门名称">
        <el-select v-model="formInline.depid" placeholder="请选择部门名称">
         <el-option 
             v-for="item in depart"
             :key="item.depid"
             :label="item.depname"
             :value="item.depid">
             </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input v-model="formInline.address" placeholder="请输入家庭地址"></el-input>
      </el-form-item>
      <el-form-item label="基本工资" >
        <el-col :span="11">
          <el-form-item prop="salsry1">
            <el-input v-model="formInline.min_bsaralay" placeholder="请输入范围" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">到</el-col>
        <el-col :span="11">
          <el-form-item prop="salsry2">
           <el-input v-model="formInline.max_bsaralay" placeholder="请输入范围" style="width: 100%;"></el-input>
          </el-form-item>
      </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询员工</el-button>
      </el-form-item>
    </el-form>
    <template>
    <el-table
      :data="tableData"
      border 
      style="width: 70%" class="table">
      <el-table-column prop="empid" label="工号" width="120" text-align="center"></el-table-column>
      <el-table-column prop="empname" label="姓名" width="120" text-align="center"></el-table-column>
      <el-table-column prop="bsaralry" label="基本工资" width="120" text-align="center"></el-table-column>
      <el-table-column prop="hiredate" label="入职日期" width="120" text-align="center"></el-table-column>
      <el-table-column prop="address" label="家庭地址" width="120" text-align="center"></el-table-column>
      <el-table-column prop="depname" label="所属部门" width="120" text-align="center"></el-table-column>
      <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="btn(scope.$index, scope.row)">详情</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="btnEdit(scope.$index, scope.row)">修改</el-button>        
                        <el-button
                                size="mini"
                                type="danger"
                                @click="btnDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
    </el-table>
     <div>
        <el-pagination
            :hide-on-single-page="value"
            @current-change="handleCurrentChange" 
            :current-page="pageConf.pageNum" 
            :page-size="pageConf.pageSize" 
            layout="total, prev, pager, next, jumper"
            :page-count="pageConf.totalpage">
        </el-pagination>
      </div>
  </template>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8086"
export default {
  data () {
    return {
      msg: '员工信息列表',
      tableData:{},
      value: false,
      formInline: {
          depid: '',
          address: '',
          min_bsaralay:'',
          max_bsaralay:''
        },
        depart:[],
        pageConf:{
          pageNum: 1, //当前页
          pageSize: 10, //每页显示的记录数
          totalpage: 13, //总记录数
          handleCurrentChange: function () {
            console.log("页码改变了");
            }
        }
        
    }
  },
  created(){
    /*axios.get("api/list").then(res =>{
      this.tableData  =res.data
    });*/
    this.getStuList(this.pageConf.pageNum,this.pageConf.pageSize);
     /* axios.get("api/pre_add").then(res =>{
            console.log('data', res.data)
            this.depart  =res.data.departList
         }    )*/
  },
  
  watch: {
  },
  methods: {
        getStuList(pageNum,pageSize){
        // 要请求的地址
        axios.get("api/pageList",{params:{pageNum:pageNum,pageSize:pageSize}}).then(res=>{
          // 把学生信息赋值给tableData
          console.log("糖心");
          this.tableData=res.data.pageInfo.list;
          this.pageConf.totalpage=res.data.pageInfo.pages;
          this.depart  =res.data.departList
        })
      },
        //当前页改变时触发的函数
        handleCurrentChange(val) {
            this.getStuList(val, this.pageConf.pageSize);
            console.log("糖心改版")
        },
    onSubmit() {
        console.log('submit!');
      },
    addlink(){
      this.$router.push('/add.html')
    },
    btnEdit(index, row) {
            console.log(index, row)
           this.$router.push({
            path:'/update',
            query:{
               id:row.empid
            }
          } )
            /*this.editRowIndex = index
            this.dialogFormVisible = true
            //将内容显示在表单上
            this.productForm.date = row.date
            this.productForm.name = row.name
            this.productForm.address = row.address*/
            },
     btnDelete(index, row) {
                 console.log(index, row);
                 
                this.$confirm(`确认是否删除工号为${row.empid}的记录？`, '删除', {
                    confirmButtonText: '确定',   
                }).then(() => {
                  var parm={empid:row.empid}
                    axios.delete("api/deleteEmp",{params:parm}).then(res =>{
                
                    })
                    let res = this.tableData.splice(index, 1)
                    let msg = `删除成功`
                    if (!res) {
                        msg = `删除失败`
                    }
                    this.$message({
                        type: 'info',
                        message: msg
                    });
                })
            },
            btn(index, row){
               console.log(index, row)
           this.$router.push({
            path:'/viewEmp',
            query:{
               id:row.empid
            }
          } )

            }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  margin: auto;
}
.btn-add {
    position:relative;
	   right:-535px;
     top:-20px;
}
</style>
