import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login/index'
import add from '@/views/empsys/add'
import update from '@/views/empsys/update'
import viewEmp from '@/views/empsys/viewEmp'
import employee from '@/views/empsys/employee'

Vue.use(Router)
/*export const constantRouterMap = [
  {
     path: '/employee',
     component: Layout,
     redirect: '/employee',
     name: 'employee',
     meta: { title: '员工管理' },
     children: [
       {
         path: 'add',
         name: '员工新增',
         component: () => import('@/views/empsys/employee'),
         meta: { title: '添加员工信息' }
       },
       {
         path: 'edit/:id',// : 用来传递参数的
         name: '员工修改',
         component: () => import('@/views/empsys/employee'),
         meta: { title: '修改员工信息' },
         hidden:true   //不显示
       }
     ]
   },
  ]*/
export default new Router({
  routes: [
    {  
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login.html',
      name:'login',
      component:login
    },
    {
      path:'/add.html',
      name:'add',
      component:add
    },
    /*{
      path:'/update',
      name:'update',
      component:() => import("@/views/empsys/add")
    },*/
    {
      path:'/update',
      name:'update',
      component:update
    },
    /*{
      path:'/viewEmp1',
      name:'viewEmp',
      component:() => import("@/views/empsys/add"),
    },*/
    {
      path:'/viewEmp',
      name:'viewEmp',
      component:viewEmp,
    }
  ]
})
