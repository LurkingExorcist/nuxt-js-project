import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7b2ef892 = () => interopDefault(import('../pages/admins.vue' /* webpackChunkName: "pages/admins" */))
const _140e8b9c = () => interopDefault(import('../pages/lk.vue' /* webpackChunkName: "pages/lk" */))
const _4bcaca06 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _27d3dd8b = () => interopDefault(import('../pages/students.vue' /* webpackChunkName: "pages/students" */))
const _fbb9b222 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admins",
    component: _7b2ef892,
    name: "admins"
  }, {
    path: "/lk",
    component: _140e8b9c,
    name: "lk"
  }, {
    path: "/login",
    component: _4bcaca06,
    name: "login"
  }, {
    path: "/students",
    component: _27d3dd8b,
    name: "students"
  }, {
    path: "/",
    component: _fbb9b222,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
