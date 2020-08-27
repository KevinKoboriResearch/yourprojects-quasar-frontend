import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'


const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { name: 'home', path: '', component: () => import('components/home/Home.vue') },
  //     { name: 'adminPages', path: 'admin', component: () => import('components/admin/AdminPages.vue') },
  //     { name: 'articlesByCategory', path: 'categories/:id/articles', component: () => import('components/article/ArticlesByCategory.vue') },
  //     { name: 'articleById', path: 'articles/:id', component: () => import('components/article/ArticleById.vue') },
  //     { name: 'auth', path: 'auth', component: () => import('components/auth/Auth.vue') }
  //   ]
  // },
  {
    // name: 'articlesByCategory',
    // path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { name: 'home', path: '', component: () => import('../components/home/Home.vue') }
    // ]
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
  },
  {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
  },
  {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth
  },
  {
    name: 'error',
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

// import Home from '../components/home/Home'
// import AdminPages from '../components/admin/AdminPages'
// import ArticlesByCategory from '../components/article/ArticlesByCategory'
// import ArticleById from '../components/article/ArticleById'
// import Auth from '../components/auth/Auth'
//
// import { userKey } from '../global'
// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)
//
// const route = [{
//   name: 'home',
//   path: '/',
//   component: Home
// }, {
//   name: 'adminPages',
//   path: '/admin',
//   component: AdminPages,
//   meta: { requiresAdmin: true }
// }, {
//   name: 'articlesByCategory',
//   path: '/categories/:id/articles',
//   component: ArticlesByCategory
// }, {
//   name: 'articleById',
//   path: '/articles/:id',
//   component: ArticleById
// }, {
//   name: 'auth',
//   path: '/auth',
//   component: Auth
// }]

// const routes = new VueRouter({
//   mode: 'history',
//   route
// })

// routes.beforeEach((to, from, next) => {
//   const json = localStorage.getItem(userKey)

//   if(to.matched.some(record => record.meta.requiresAdmin)) {
//       const user = JSON.parse(json)
//       user && user.admin ? next() : next({ path: '/' })
//   } else {
//       next()
//   }
// })

export default routes
