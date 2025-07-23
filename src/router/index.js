/**
 * 路由懒加载
 * 好处：提高页面加载速度，减少页面体积
 * 坏处：如果路由地址很长，会导致页面加载速度变慢
 * 原理：
 * 1. 当路由被访问时，才会加载对应的组件
 * 2. 当路由地址很长时，会导致页面加载速度变慢
 * 3. 当路由地址很短时，会导致页面加载速度变快
 * 4. 当路由地址很长时，会导致页面加载速度变慢
 * 5. 当路由地址很短时，会导致页面加载速度变快
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/layout/home.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/layout/category.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/layout/cart.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/layout/user.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/searchlist',
    name: 'SearchList',
    component: () => import('../views/search/list.vue')
  },
  {
    path: '/productDetils/:id',
    name: 'ProductDetils',
    component: () => import('../views/productDetils/index.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/pay/index.vue')
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    component: () => import('../views/myOrder/index.vue')
  }
]

const router = new VueRouter({
  routes
})
// 全局前置导航守卫,访问任何路由地址都会经过这个处理
// to 到哪里去
// from 从哪里来
// next()不写参数就是放行，写参数就是拦截之后到哪个地址

// 需要权限才能访问的页面
const authUrls = ['/pay', '/myOrder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!authUrls.includes(to.path)) {
    // 不需要权限
    next()
    return
  }
  // 需要权限
  // 判断是否登录
  const token = store.getters.token
  if (!token) {
    next({ path: '/login' })
  } else {
    next()
  }
})
export default router
