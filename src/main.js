import Vue from 'vue';
import fastclick from 'fastclick';
import VueSuperagent from 'vue-superagent';
import moment from 'moment';
import { ToastPlugin } from 'vux';
import store from './store/';
import router from './router/';
import uniqueCake from './unique-cake';

moment.locale('zh-cn');
Vue.prototype.$moment = moment;

Vue.use(ToastPlugin);
Vue.use(VueSuperagent);
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#unique',
  router,
  store,
  render: h => h(uniqueCake),
});
