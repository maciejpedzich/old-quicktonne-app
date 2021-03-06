import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import authGuard from '@/guards/auth';

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
    component: () => import('../views/rooms/Browse.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/rooms/create',
    name: 'CreateRoom',
    component: () => import('../views/rooms/Create.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/rooms/:roomId',
    name: 'Room',
    component: () => import('../views/rooms/Room.vue'),
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
