import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '../views/Films.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    name: 'films',
    component: Films,
    children:[
      {
        path:'nowPlaying',
        component:()=>import('../views/NowPlaying.vue')
      },
      {
        path:'ComingSoon',
        component:()=>import('../views/ComingSoon.vue')
      },
    ],
  },
  {
    path: '/film',
    name: 'film',  
    component: () => import('../views/Film.vue')
  },
  {
    path: '/city',
    name: 'city',  
    component: () => import('../views/City.vue')
  },
  {
    path:'/',
    redirect:"/films/nowPlaying"
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
