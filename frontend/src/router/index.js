import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
// import auth from '../middleware/auth'

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
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component : Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group/:id',
      name : 'group',
      component : ()=>import('../views/ViewGroup.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group/create',
      name : 'create-group',
      component : ()=>import('../views/CreateGroup.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path : '/expense/:id',
      name: 'expense',
      component : ()=>import('../views/Expense.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path : '/group/:idGroup/expense/create',
      name: 'create-expense',
      component : ()=>import('../views/CreateExpense.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path : '/prueba',
      name: 'prueba',
      component : ()=>import('../views/Prueba.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  // requiresAuth: true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth')) {
      const auth = JSON.parse(localStorage.getItem('auth'))
      if (auth.token && auth.token !== null) {
        next()
      }
    } else {
      next('/login')
    }
  // requiresAuth: false
  } else if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth')) {
      const auth = JSON.parse(localStorage.getItem('auth'))
      if (auth.token && auth.token !== null) {
        next('/dashboard')
      }
    }
  }
  
  next()
})

export default router