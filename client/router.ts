import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
