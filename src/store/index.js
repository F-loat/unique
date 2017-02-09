import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    USER(state, user = {}) {
      state.user = user;
    },
  },
  actions: {

  },
  getters: {

  },
});

export default store;
