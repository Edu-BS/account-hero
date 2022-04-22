import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component : Register
    },
    {
      path : '/dashboard',
      name: 'dashboard',
      component : Dashboard
    },
    {
      path: '/group/:id',
      name : 'group',
      component : ()=>import('../views/ListGroup.vue')
    },
    {
      path : '/expense/:id',
      name: 'expense',
      component : ()=>import('../views/Expense.vue')
    },

    {
      path : '/prueba',
      name: 'prueba',
      component : ()=>import('../views/Prueba.vue')
    }
  ]
})

export default router