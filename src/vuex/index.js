import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'zepto'

Vue.use(Vuex)

class Ware {
  constructor () {
    this.info = {}
    this.weight = 1
    this.dish = ''
    this.sum = 1
  }
}

class Wares {
  constructor () {
    this.a = []
    this.b = []
    this.c = []
    this.d = []
  }
}

class User {
  constructor () {
    this.nickname = ''
    this.headimgurl = ''
    this.type = 1
    this.orders = []
    this.shopcar = []
    this.addresses = []
    this.coupons = []
    this.openid = ''
  }
}

class Order {
  constructor () {
    this.wares = []
    this.msg = ''
    this.addressId = ''
    this.receivingTime = ''
    this.payway = 0
    this.price = 0
  }
}

// 创建一个对象来保存应用启动时的初始状态
const state = {
  user: new User(),
  wares: new Wares(),
  ware: new Ware(),
  order: new Order()
}

const mutations = {
  USERINIT (state) {
    state.user = new User()
  },
  USERINFO (state) {
    $.ajax({
      type: 'get',
      url: '/request/user',
      dataType: 'json',
      success: data => {
        if (data) {
          for (let order of data.orders) {
            order.orderDate = new Date(order.orderDate).toLocaleString()
            order.receive = new Date(order.receive).toLocaleString()
          }
          state.user = data
        }
      },
      error: () => $.toast('用户信息获取失败')
    })
  },
  WARESINFO (state) {
    $.ajax({
      type: 'get',
      url: '/request/ware',
      success: data => {
        var temp = new Wares()
        data.forEach((ware) => {
          if (ware.type === 0) {
            temp.a.push(ware)
          } else if (ware.type === 1) {
            temp.b.push(ware)
          } else if (ware.type === 2) {
            temp.c.push(ware)
          } else if (ware.type === 3) {
            temp.d.push(ware)
          }
        })
        state.wares = temp
      },
      error: () => $.toast('商品信息获取失败')
    })
  },
  WAREINIT (state) {
    state.ware = new Ware()
  },
  WAREINFO (state, wareId) {
    $.ajax({
      type: 'get',
      url: '/request/ware/' + wareId,
      success: data => { state.ware.info = data },
      error: () => $.toast('商品信息获取失败')
    })
  },
  ORDERINIT (state) {
    state.order = new Order()
  },
  ORDERWARES (state, ware) {
    state.order.wares.push(ware)
  }
}

const actions = {
  userInit ({ commit }) {
    commit('USERINIT')
  },
  userInfo ({ commit }) {
    commit('USERINFO')
  },
  waresInfo ({ commit }) {
    commit('WARESINFO')
  },
  wareInit ({ commit }) {
    commit('WAREINIT')
  },
  wareInfo ({ commit }, wareId) {
    commit('WAREINFO', wareId)
  },
  orderInit ({ commit }) {
    commit('ORDERINIT')
  },
  orderWares ({ commit }, ware) {
    commit('ORDERWARES', ware)
  }
}

const getters = {
  getUserInfo: state => {
    return state.user
  },
  getWaresInfo: state => {
    return state.wares
  },
  getWareInfo: state => {
    return state.ware
  },
  getOrderInfo: state => {
    return state.order
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
