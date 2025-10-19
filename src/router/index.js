import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import GroupsView from '../views/GroupsView.vue'
import RecordingsView from '../views/RecordingsView.vue'
import RecordingDetailView from '../views/RecordingDetailView.vue'
import { isAuthenticated } from '../utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: GroupsView,
    meta: { requiresAuth: true }
  },
  { path: '/recordings',
    name: 'Recordings',
    component: RecordingsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recordings/:id',
    name: 'RecordingDetail',
    component: RecordingDetailView,
    meta: { requiresAuth: true },
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = isAuthenticated()

  // если маршрут защищён и нет токена — кидаем на логин
  if (to.meta.requiresAuth && !auth) {
    return next('/login')
  }

  // если пытаются зайти на логин/регистрацию, но уже авторизованы — на дашборд
  if ((to.path === '/login' || to.path === '/register') && auth) {
    return next('/dashboard')
  }

  next()
})

export default router
