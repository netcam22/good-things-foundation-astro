import HomeView from '../views/HomeView.vue';

export const useRouterStore = (function () {
  const state = {
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/what-to-do',
        name: 'what-to-do',
        component: () => import('../views/WhatToDoView.vue')
      },
      {
        path: '/the-digital-divide',
        name: 'the-digital-divide',
        component: () => import('../views/TheDigitalDivide.vue')
      },
      {
        path: '/get-involved',
        name: 'get-involved',
        component: () => import('../views/GetInvolved.vue')
      },
      {
        path: '/our-network',
        name: 'our-network',
        component: () => import('../views/OurNetwork.vue')
      },
      {
        path: '/insights',
        name: 'insights',
        component: () => import('../views/Insights.vue')
      }
    ]};
  return {
    getRoutes: () => state.routes
  }
})();