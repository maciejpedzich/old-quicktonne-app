import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
// import authGuard from '@/guards/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/rooms',
    name: 'BrowseRooms',
    component: () => import('../views/rooms/Browse.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
