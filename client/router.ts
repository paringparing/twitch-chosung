import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes = [
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
  {
    path: '/result',
    name: 'Result',
    component: () => import('./views/Result.vue'),
  },
  {
    path: '/suggest',
    name: 'Suggest',
    component: () => import('./views/SuggestedWordSelection.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
} as RouterOptions)
