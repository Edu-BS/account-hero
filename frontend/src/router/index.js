import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Registrer from '../views/Registrer.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/registrer',
      name: 'registrer',
      component : Registrer
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
    }
  ]
})

export default router
