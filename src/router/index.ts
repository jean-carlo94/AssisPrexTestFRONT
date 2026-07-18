import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/products',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
