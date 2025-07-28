import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AddRecordView from '../views/AddRecordView.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashboardView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/add-record',
      name: 'Add Record',
      component: AddRecordView,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
