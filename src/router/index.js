import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login/index.vue'
import Index from '@/views/Index/index.vue'
import IndexPage from '@/components/pages/index'
import Withdraw from '@/components/pages/withdraw'




Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/',
          name:'IndexPage',
          component:IndexPage
        },
        {
          path:'withdraw',
          name:'Withdraw',
          component:Withdraw
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  if(to.path === '/login') {
    return next()
  }

  const token = localStorage.getItem('token')

  if(token) {
        next()
  }else {
    alert("您还未登录，点击确定跳转至登录")
    next('/login')
  }
})

export default router