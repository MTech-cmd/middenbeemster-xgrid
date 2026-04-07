import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Design1View from '../views/Design1View.vue'

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
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
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
