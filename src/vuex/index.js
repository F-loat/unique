import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: {},
  wares: [{}],
  ware: {},
  order: {},
};

const mutations = {
};

const actions = {
};

const getters = {
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
