import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Chatbox from '../views/Chatbox'
import About from '../views/About'
import Login from '../views/Login'
import Register from '../views/Register'
import Profile from '../views/Profile'
import Unknown from '../views/404'

Vue.use(VueRouter)

function secureAccess(to, from, next) {
  let isAuthenticated = localStorage.getItem('token');
  if (isAuthenticated) {
    next()
  } else {
    next({
      path: '/sign-in',
      query: { redirect: to }
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: secureAccess
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
    component: Chatbox,
    beforeEnter: secureAccess
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: Register
  },
  {
    path: '/:username/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: secureAccess
  },
  {
    path: '/404',
    name: '404',
    component: Unknown
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  history: true,
  mode: 'hash',
  routes
})

export default router
