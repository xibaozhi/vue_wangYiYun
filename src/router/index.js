import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Search from '../views/search.vue'
import Listpage from '../views/listpage.vue'
import Singerpage from '../views/singerpage.vue'
import Mv from '../views/mvpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive: true // 需要被缓存
    }
  },
  {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        keepAlive: true // 需要被缓存
      }
  },
  {
    path: '/listpage',
    name: 'Listpage',
    component: Listpage,
  },
  {
    path: '/singerpage',
    name: 'Singerpage',
    component: Singerpage,
  },
  {
    path: '/mv',
    name: 'Mv',
    component: Mv
  }
  // {
  //   path: '/search',
  //   component: () => import('@/views/search.vue')
  // }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (to) {

      return VueRouterPush.call(this, to).catch(err => err)

}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
