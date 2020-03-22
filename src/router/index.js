import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Chatbox from '../views/Chatbox'
import About from '../views/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/chat',
    name: 'Chatbox',
    component: Chatbox
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
