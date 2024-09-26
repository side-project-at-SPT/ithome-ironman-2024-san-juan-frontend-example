import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/lobby',
      name: 'Lobby',
      component: () => import('../views/LobbyView.vue')
    },
    {
      path: '/rooms',
      name: 'Room List',
      component: () => import('../views/RoomsView.vue')
    },
    {
      path: '/rooms/new',
      name: 'New Room',
      component: () => import('../views/NewRoomView.vue')
    },
    {
      path: '/rooms/:id',
      name: 'Room',
      component: () => import('../views/RoomView.vue')
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('../views/PageNotFoundView.vue')
    },
    {
      path: '/r',
      name: 'push back',
      redirect: ({ query: { path } }) => {
        return path || '/';
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFoundView.vue')
    }
  ]
});

export default router;
