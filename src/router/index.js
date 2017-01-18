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
          alive: requireViewsAsync('tab/main'),
        },
      },
      {
        path: 'ware',
        components: {
          alive: requireViewsAsync('tab/wares'),
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
    path: '/order/:wareId?',
    components: {
      reset: requireViewsAsync('ware/order'),
    },
  },
  {
    path: '/person/fastLogin',
    components: {
      alive: requireViewsAsync('user/fast-login'),
    },
  },
  {
    path: '/person/regist',
    components: {
      alive: requireViewsAsync('user/regist'),
    },
  },
  {
    path: '/person/login',
    components: {
      alive: requireViewsAsync('user/login'),
    },
  },
  {
    path: '/person/orders',
    components: {
      alive: requireViewsAsync('order/list'),
    },
  },
  {
    path: '/person/orders/:oid',
    components: {
      reset: requireViewsAsync('order/detail'),
    },
  },
  {
    path: '/person/addresses',
    components: {
      alive: requireViewsAsync('address/list'),
    },
  },
  {
    path: '/person/addresses/new',
    components: {
      alive: requireViewsAsync('address/new'),
    },
  },
  {
    path: '/fedBack',
    components: {
      alive: requireViewsAsync('other/fed-back'),
    },
  },
  {
    path: '/aboutUs',
    components: {
      alive: requireViewsAsync('other/about-us'),
    },
  },
  {
    path: '/userAgreement',
    components: {
      alive: requireViewsAsync('other/user-agreement'),
    },
  },
  {
    path: '/admin/orderManage',
    components: {
      alive: requireViewsAsync('admin/order/list'),
    },
  },
  {
    path: '/admin/orderManage/:oid',
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
