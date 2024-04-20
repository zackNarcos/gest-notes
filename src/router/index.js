import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/annees',
      name: 'annees',
      component: () => import('../views/annees/index.vue')
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('../views/classes/index.vue')
    },
    {
      path: '/matieres',
      name: 'matieres',
      component: () => import('../views/matieres/index.vue')
    },
    {
      path: '/etudiants',
      name: 'etudiants',
      component: () => import('../views/students/index.vue')
    }
  ]
})

export default router
