import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Chatbox from '../views/Chatbox'
import About from '../views/About'
import Login from '../views/Login'
import Register from '../views/Register'
import Profile from '../views/Profile'

Vue.use(VueRouter)

function secureAccess(to, from, next) {
  let isAuthenticated;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next()
  } else {
    next('/sign-in')
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
]

const router = new VueRouter({
  history: true,
  mode: 'history',
  routes
})

export default router
