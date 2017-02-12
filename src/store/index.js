import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    USER(state, user) {
      state.user = user;
    },
    ADDRESS(state, addresses) {
      state.user.addresses = addresses;
    },
  },
  actions: {
    getUser({ commit }) {
      Vue.superagent
        .get('/request/user')
        .then((res) => {
          if (res.body.state === 1) {
            commit('USER', res.body.user);
          }
        })
        .catch((err) => {
          Vue.$vux.toast.show({
            type: 'text',
            width: '11em',
            text: err.status,
          });
        });
    },
  },
  getters: {

  },
});

export default store;
