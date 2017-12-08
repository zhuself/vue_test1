
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import IndexMessage from '@/pages/Hello'
import Login from '@/components/Login'  //引入根目录下的Hello.vue组件
// import iView from 'iview'
import * as R from '@/router/router-types'
Vue.use(Router)  //Vue全局使用Router
// vue.use(iView)
 
export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: R.kLogin ,         //链接路径
      name: 'Login',     //路由名称，
      component: Login,
      meta: {
        auth: true
      }
 //对应的组件模板
    }, {
      path: R.kIndexMessage ,         //链接路径
      name: 'IndexMessage',     //路由名称，
      component: IndexMessage,
      meta: {
        auth: true      
      }
    }   
  ]
})