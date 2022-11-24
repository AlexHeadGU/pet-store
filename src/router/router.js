import { createWebHistory, createRouter } from "vue-router";
import vCatalog from '@/components/catalog/v-catalog';
import vCart from '@/components/cart/v-cart';
import vMainPage from '@/components/main-page/v-main-page';
import vProductPage from '@/components/catalog/v-product-page';

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: vMainPage
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: vCatalog
  },
  {
    path: '/product',
    name: 'product',
    component: vProductPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: vCart, 
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router};