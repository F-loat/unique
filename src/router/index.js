import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const requireViewsAsync = name => resolve => require([`views/${name}.vue`], resolve); // eslint-disable-line
const requireComponentsAsync = name => resolve => require([`components/${name}.vue`], resolve); // eslint-disable-line

const routes = [
  {
    path: '/',
    components: {
      alive: requireComponentsAsync('nav-bottom'),
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        components: {
          alive: requireViewsAsync('tab/index'),
        },
      },
      {
        path: 'ware',
        components: {
          alive: requireViewsAsync('tab/ware'),
        },
      },
      {
        path: 'shopcar',
        components: {
          alive: requireViewsAsync('tab/shopcar'),
        },
      },
      {
        path: 'person',
        components: {
          alive: requireViewsAsync('tab/person'),
        },
      },
    ],
  },
  {
    path: '/ware/:wareId',
    components: {
      reset: requireViewsAsync('ware/detail'),
    },
  },
  {
    path: '/ware/:wareId/order',
    components: {
      reset: requireViewsAsync('ware/order'),
    },
  },
  {
    path: '/user/fastLogin',
    components: {
      alive: requireViewsAsync('user/fast-login'),
    },
  },
  {
    path: '/user/regist',
    components: {
      alive: requireViewsAsync('user/regist'),
    },
  },
  {
    path: '/user/login',
    components: {
      alive: requireViewsAsync('user/login'),
    },
  },
  {
    path: '/order',
    components: {
      alive: requireViewsAsync('order/list'),
    },
  },
  {
    path: '/order/:oid',
    components: {
      reset: requireViewsAsync('order/detail'),
    },
  },
  {
    path: '/address',
    components: {
      alive: requireViewsAsync('address/list'),
    },
  },
  {
    path: '/address/new',
    components: {
      alive: requireViewsAsync('address/new'),
    },
  },
  {
    path: '/fedback',
    components: {
      alive: requireViewsAsync('other/fed-back'),
    },
  },
  {
    path: '/about',
    components: {
      alive: requireViewsAsync('other/about-us'),
    },
  },
  {
    path: '/admin/order',
    components: {
      alive: requireViewsAsync('admin/order/list'),
    },
  },
  {
    path: '/admin/order/:oid',
    components: {
      alive: requireViewsAsync('admin/order/detail'),
    },
  },
  {
    path: '*',
    redirect: '/index',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
