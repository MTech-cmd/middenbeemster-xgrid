import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Design1View from '../views/Design1View.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterView from '../views/RegisterView.vue'
import Design2View from '../views/Design2View.vue'
import DesignServer from '../views/DesignServer.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/design1',
    name: 'design1',
    component: Design1View,
  },
  {
    path: '/design2',
    name: 'design2',
    component: Design2View,
  },
  {
    path: '/server',
    name: 'server',
    component: DesignServer,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
