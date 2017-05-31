import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      alive: resolve => require(['../components/nav-bottom'], resolve)
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        components: {
          alive: resolve => require(['views/index-main'], resolve)
        }
      },
      {
        path: 'ware',
        components: {
          alive: resolve => require(['views/index-ware'], resolve)
        }
      },
      // {
      //   path: 'picture',
      //     component (resolve) {
      //       require(['../views/index-picture'], resolve)
      //     }
      // },
      {
        path: 'shopcar',
        components: {
          alive: resolve => require(['views/index-shopcar'], resolve)
        }
      },
      {
        path: 'person',
        components: {
          alive: resolve => require(['views/index-person'], resolve)
        }
      }
    ]
  },
  {
    path: '/ware/:wareId',
    components: {
      reset: resolve => require(['views/ware-detail'], resolve)
    }
  },
  {
    path: '/order',
    components: {
      reset: resolve => require(['views/ware-order'], resolve)
    }
  },
  {
    path: '/order/:wareId',
    components: {
      reset: resolve => require(['views/ware-order'], resolve)
    }
  },
  {
    path: '/person/fastLogin',
    components: {
      alive: resolve => require(['views/fast-login'], resolve)
    }
  },
  {
    path: '/person/regist',
    components: {
      alive: resolve => require(['views/person-regist'], resolve)
    }
  },
  {
    path: '/person/login',
    components: {
      alive: resolve => require(['views/person-login'], resolve)
    }
  },
  {
    path: '/person/orders',
    components: {
      alive: resolve => require(['views/person-orders'], resolve)
    }
  },
  {
    path: '/person/orders/:oid',
    components: {
      reset: resolve => require(['views/order-detail'], resolve)
    }
  },
  {
    path: '/person/addresses',
    components: {
      alive: resolve => require(['views/person-addresses'], resolve)
    }
  },
  {
    path: '/person/addresses/new',
    components: {
      alive: resolve => require(['views/new-address'], resolve)
    }
  },
  // {
  //   path: '/person/coupons',
  //   component (resolve) {
  //     require(['../views/person-coupons'], resolve)
  //   }
  // },
  {
    path: '/fedBack',
    components: {
      alive: resolve => require(['views/fed-back'], resolve)
    }
  },
  {
    path: '/aboutUs',
    components: {
      alive: resolve => require(['views/about-us'], resolve)
    }
  },
  {
    path: '/userAgreement',
    components: {
      alive: resolve => require(['views/user-agreement'], resolve)
    }
  },
  {
    path: '/admin/orderManage',
    components: {
      alive: resolve => require(['views/admin/order-manage'], resolve)
    }
  },
  {
    path: '/admin/orderManage/:oid',
    components: {
      alive: resolve => require(['views/admin/order-detail'], resolve)
    }
  },
  {
    path: '*',
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
