import { createRouter, createWebHistory } from 'vue-router'
import api from '@/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../pages/test.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/RegisterPage.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        try {
          ;(await api.get('/logout', { withCredentials: true }), (window.location.href = '/'))
        } catch (err) {
          console.error(err)
          next('/')
        }
      },
    },
    {
      path: '/hometest',
      name: 'hometest',
      component: () => import('../pages/HomePageTest.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/AdminPage.vue'),
    },
  ],
})

export default router
