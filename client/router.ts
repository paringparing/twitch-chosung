import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/custom',
    name: 'Custom',
    component: () => import('./views/CustomSettings.vue'),
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('./views/Play.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
