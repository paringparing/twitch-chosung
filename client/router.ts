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
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./views/GlobalSettings.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
} as RouterOptions)
