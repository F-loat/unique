import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true
})

router.map({
  '/': {
    component (resolve) {
      require(['../components/nav-bottom'], resolve)
    },
    subRoutes: {
      '/index': {
        component (resolve) {
          require(['../views/index-main'], resolve)
        }
      },
      '/ware': {
        component (resolve) {
          require(['../views/index-list'], resolve)
        }
      },
      // '/picture': {
      //   component (resolve) {
      //     require(['../views/index-picture'], resolve)
      //   }
      // },
      '/shopcar': {
        component (resolve) {
          require(['../views/index-shopcar'], resolve)
        }
      },
      '/person': {
        component (resolve) {
          require(['../views/index-person'], resolve)
        }
      }
    }
  },
  '/ware/:wareId': {
    component (resolve) {
      require(['../views/ware-detail'], resolve)
    }
  },
  '/order/:wareId': {
    component (resolve) {
      require(['../views/ware-order'], resolve)
    }
  },
  '/person/fastLogin': {
    component (resolve) {
      require(['../views/fast-login'], resolve)
    }
  },
  '/person/regist': {
    component (resolve) {
      require(['../views/person-regist'], resolve)
    }
  },
  '/person/login': {
    component (resolve) {
      require(['../views/person-login'], resolve)
    }
  },
  '/person/orders': {
    component (resolve) {
      require(['../views/person-orders'], resolve)
    }
  },
  '/person/addresses': {
    component (resolve) {
      require(['../views/person-addresses'], resolve)
    }
  },
  '/person/addresses/new': {
    component (resolve) {
      require(['../views/new-address'], resolve)
    }
  },
  '/person/coupons': {
    component (resolve) {
      require(['../views/person-coupons'], resolve)
    }
  },
  '/fedBack': {
    component (resolve) {
      require(['../views/fed-back'], resolve)
    }
  },
  '/aboutUs': {
    component (resolve) {
      require(['../views/about-us'], resolve)
    }
  },
  '/userAgreement': {
    component (resolve) {
      require(['../views/user-agreement'], resolve)
    }
  }
})

router.redirect({
  '*': '/index'
})

router.alias({
  '/': '/index'
})

export default router
