import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component (resolve) {
      require(['../components/nav-bottom'], resolve)
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        component (resolve) {
          require(['../views/index-main'], resolve)
        }
      },
      {
        path: 'ware',
        component (resolve) {
          require(['../views/index-ware'], resolve)
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
        component (resolve) {
          require(['../views/index-shopcar'], resolve)
        }
      },
      {
        path: 'person',
        component (resolve) {
          require(['../views/index-person'], resolve)
        }
      }
    ]
  },
  {
    path: '/ware/:wareId',
    component (resolve) {
      require(['../views/ware-detail'], resolve)
    }
  },
  {
    path: '/order',
    component (resolve) {
      require(['../views/ware-order'], resolve)
    }
  },
  {
    path: '/order/:wareId',
    component (resolve) {
      require(['../views/ware-order'], resolve)
    }
  },
  {
    path: '/person/fastLogin',
    component (resolve) {
      require(['../views/fast-login'], resolve)
    }
  },
  {
    path: '/person/regist',
    component (resolve) {
      require(['../views/person-regist'], resolve)
    }
  },
  {
    path: '/person/login',
    component (resolve) {
      require(['../views/person-login'], resolve)
    }
  },
  {
    path: '/person/orders',
    component (resolve) {
      require(['../views/person-orders'], resolve)
    }
  },
  {
    path: '/person/addresses',
    component (resolve) {
      require(['../views/person-addresses'], resolve)
    }
  },
  {
    path: '/person/addresses/new',
    component (resolve) {
      require(['../views/new-address'], resolve)
    }
  },
  {
    path: '/person/coupons',
    component (resolve) {
      require(['../views/person-coupons'], resolve)
    }
  },
  {
    path: '/fedBack',
    component (resolve) {
      require(['../views/fed-back'], resolve)
    }
  },
  {
    path: '/aboutUs',
    component (resolve) {
      require(['../views/about-us'], resolve)
    }
  },
  {
    path: '/userAgreement',
    component (resolve) {
      require(['../views/user-agreement'], resolve)
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
