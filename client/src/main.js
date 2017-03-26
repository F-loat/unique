import Vue from 'vue';
import fastclick from 'fastclick';
import VueSuperagent from 'vue-superagent';
import { ToastPlugin, ConfirmPlugin } from 'vux';
import store from './store/';
import router from './router/';
import uniqueCake from './unique-cake';

Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(VueSuperagent);
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#unique',
  router,
  store,
  render: h => h(uniqueCake),
});
