import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/product_list/:categoryName',
    name: 'ProductList',
    component: () => import('@/pages/ProductList.vue'),
    props: true
  },
  {
    path: '/product/:productName',
    name: 'ProductInfo',
    component: () => import('@/pages/ProductInfo.vue'),
    props: true
  },
  {
    path: '/seller/:seller',
    name: 'SellerInfo',
    component: () => import('@/pages/SellerInfo.vue'),
    props: true
  },
]

let router = createRouter({
  history: createWebHistory('/hub_marketplace'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

export default router
