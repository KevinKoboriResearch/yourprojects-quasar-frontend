import Home from '../pages/static/home/Home'
import About from '../pages/static/about/About'
import Services from '../pages/static/services/Services'
import Doubts from '../pages/static/doubts/Doubts'
import UserProfile from '../pages/user/UserProfile'
import UserArticles from '../pages/user/UserArticles'
import UserCategories from '../pages/user/UserCategories'
import AdminPages from '../pages/admin/AdminPages'
import ArticlesByCategory from '../pages/article/ArticlesByCategory'
import ArticleById from '../pages/article/ArticleById'
import Auth from '../pages/auth/Auth'
import Error404 from '../pages/Error404.vue'


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
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //logged out free routes
      { name: 'home', path: '', component: Home },
      { name: 'about', path: 'about', component: About },
      { name: 'services', path: 'services', component: Services },
      { name: 'doubts', path: 'doubts', component: Doubts },
      //logged in user routes
      { name: 'userProfile', path: 'user/profile', component: UserProfile },
      { name: 'userArticles', path: 'user/articles', component: UserArticles },
      { name: 'userCategories', path: 'user/categories', component: UserCategories },
      //logged in admin routes
      { name: 'adminPages', path: 'admin', component: AdminPages, meta: { requiresAdmin: true } },
      //logged in free routes
      { name: 'articlesByCategory', path: 'categories/:id/articles', component: ArticlesByCategory },
      { name: 'articleById', path: 'articles/:id', component: ArticleById },
      { name: 'auth', path: 'auth', component: Auth },
      { name: 'error', path: '*', component: Error404 }
    ]
  },
  // {
  //   // name: 'articlesByCategory',
  //   // path: '/',
  //   // component: () => import('layouts/MainLayout.vue'),
  //   // children: [
  //   //   { name: 'home', path: '', component: () => import('../components/home/Home.vue') }
  //   // ]
  //   name: 'home',
  //   path: '/',
  //   component: Home
  // },
  // {
  //   name: 'adminPages',
  //   path: '/admin',
  //   component: AdminPages,
  //   meta: { requiresAdmin: true }
  // },
  // {
  //   name: 'articlesByCategory',
  //   path: '/categories/:id/articles',
  //   component: ArticlesByCategory
  // },
  // {
  //   name: 'articleById',
  //   path: '/articles/:id',
  //   component: ArticleById
  // },
  // {
  //   name: 'auth',
  //   path: '/auth',
  //   component: Auth
  // },
  // {
  //   name: 'error',
  //   path: '*',
  //   component: Error404
  // }
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
