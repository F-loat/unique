import Vue from 'vue';
import fastclick from 'fastclick';
import superagent from 'superagent';
import moment from 'moment';
import store from './vuex/';
import router from './router/';
import uniqueCake from './unique-cake';

moment.locale('zh-cn');

Vue.prototype.$http = superagent;
Vue.prototype.$moment = moment;
Vue.prototype.$domain = '';

fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(uniqueCake),
}).$mount('#unique');
