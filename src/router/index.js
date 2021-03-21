import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import auth from '../middleware/auth';
const routes = [
  {
    path:'/',
    component : require('../views/Index').default,
    name:'index',
    children:[
      {
        path:'/',
        component: require('../components/Index').default,
        name:'add_post'
      },
      {
        path:'/login',
        component: require('../components/auth/Login').default,
        name:'login'
      },
      {
        path:'/register',
        component: require('../components/auth/Register').default,
        name:'register'
      },
      {
        path:'/reset_password',
        component: require('../components/auth/ResetPassword').default,
        name:'reset_password'
      },
      {
        path:'/code_check',
        component: require('../components/auth/CodeCheck').default,
        name:'code_check'
      },
      {
        path:'/new_password',
        component: require('../components/auth/NewPassword').default,
        name:'new_password'
      },
      {
        path:'/profile',
        component: require('../components/Profile').default,
        name:'profile'
      },
      {
        path:'/price_offer/form',
        component:require('../components/price_offer/form').default,
        name:'price_offer.form'
      },
      {
        path:'/price_offer',
        component:require('../components/price_offer/index').default,
        name:'price_offer.index'
      },
      {
        path:'/contract/form',
        component:require('../components/contract/form').default,
        name:'contract.form'
      },
      {
        path:'/appointment/form',
        component: require("../components/appointment/form").default,
        name:'appointment.form'
      },
      {
        path:'/moodboard/form',
        component: require("../components/moodboard/form").default,
        name:'moodboard.form'
      },
      {
        path:'/employee/form',
        component: require("../components/employee/form").default,
        name:'employee.form'
      },
      {
        path:'/employee_category/form',
        component: require("../components/employee_category/form").default,
        name:'employee.category.form'
      },
      {
        path:'/project/form',
        component: require("../components/project/form").default,
        name:'project.form'
      },
      {
        path:'/contract',
        component: require("../components/contract/index").default,
        name:'contract.index'
      },
      {
        path:'/task/form',
        component: require("../components/task/form").default,
        name:'task.form'
      },
      {
        path:'/task',
        component: require("../components/task/index").default,
        name:'task.index'
      },
      {
        path:'/project',
        component: require("../components/project/index").default,
        name:'project.index'
      },
      {
        path:'/report/index',
        component: require("../components/report/index").default,
        name:'report.index'
      },
      {
        path:'/price_offer_type/index',
        component: require("../components/price_offer_type/index").default,
        name:'price_offer_type.index'
      },
      {
        path:'/price_offer_type/form',
        component: require("../components/price_offer_type/form").default,
        name:'price_offer_type.form'
      },
      {
        path:'/customer/form',
        component: require("../components/customer/form").default,
        name:'customer.form'
      },
      {
        path:'/customer',
        component: require("../components/customer/index").default,
        name:'customer.index'
      },
      {
        path:'/job_type/form',
        component: require("../components/job_type/form").default,
        name:'job_type.form'
      },
      {
        path:'/target/form',
        component: require("../components/target/form").default,
        name:'target.form'
      },
      {
        path:'/moodboard_style/form',
        component: require("../components/moodboard_style/form").default,
        name:'moodboard_style.form'
      },
      {
        path:'/contract_type/form',
        component: require("../components/contract_type/form").default,
        name:'contract_type.form'
      },
      {
        path:'/item/form',
        component: require("../components/item/form").default,
        name:'item.form'
      },
      {
        path:'/item/index',
        component: require("../components/item/index").default,
        name:'item.index'
      },
      {
        path:'/employee',
        component: require("../components/employee/index").default,
        name:'employee.index'
      },
      {
        path:'/statistics',
        component: require("../components/statistics/index").default,
        name:'statistics.index'
      },
      {
        path:'/payment',
        component: require("../components/payment/index").default,
        name:'payment.index'
      },
      {
        path:'/employee_stat/show',
        component: require("../components/employee_stat/show").default,
        name:'employee_stat.show'
      },
      {
        path:'/moodboard',
        component: require("../components/moodboard/index").default,
        name:'moodboard.index'
      },
      {
        path:'/moodboard/show',
        component: require("../components/moodboard/show").default,
        name:'moodboard.show'
      },
      {
        path:'/task/show',
        component: require("../components/task/show").default,
        name:'task.show'
      },
      {
        path:'/project/show',
        component: require("../components/project/show").default,
        name:'project.show'
      },
      {
        path:'/price_offer/show',
        component: require("../components/price_offer/show").default,
        name:'price_offer.show'
      },
      {
        path:'/contract/show',
        component: require("../components/contract/show").default,
        name:'contract.show'
      },
    ]
  },

];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeResolve(auth);
export default router
