import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Design1View from '../views/Design1View.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterView from '../views/RegisterView.vue'
import Design2View from '../views/Design2View.vue'
import DesignServer from '../views/DesignServer.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'
import PageList from '../components/admin/PageList.vue'
import PageEditor from '../components/admin/PageEditor.vue'
import NavbarEditor from '../components/admin/NavbarEditor.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/admin',
    component: AdminDashboard,
    redirect: '/admin/pages',
    children: [
      {
        path: 'pages',
        name: 'admin-pages',
        component: PageList,
      },
      {
        path: 'pages/:id',
        name: 'admin-page-edit',
        component: PageEditor,
      },
      {
        path: 'navbar',
        name: 'admin-navbar',
        component: NavbarEditor,
      },
    ],
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
    path: '/register',
    name: 'register',
    component: RegisterView,
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
