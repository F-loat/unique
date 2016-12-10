import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import store from './vuex/'
import router from './router/'
import uniqueCake from './unique-cake'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/upload/error.png',
  loading: '/upload/loading.gif',
  attempt: 3,
  listenEvents: ['click', 'scroll', 'touchstart', 'touchmove']
})

new Vue({
  router,
  store,
  ...uniqueCake
}).$mount('#unique')
