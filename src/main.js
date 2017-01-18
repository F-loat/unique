import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';
import moment from 'moment';
import store from './vuex/';
import router from './router/';
import uniqueCake from './unique-cake';

moment.locale('zh-cn');

Vue.prototype.$moment = moment;
Vue.prototype.$domain = '';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/upload/error.png',
  loading: '/upload/loading.gif',
  attempt: 3,
  listenEvents: ['click', 'scroll', 'touchstart', 'touchmove'],
});

FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(uniqueCake),
}).$mount('#unique');
