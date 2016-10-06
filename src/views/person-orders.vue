<template lang="pug">
#myOrders.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(:to="{ path: '/person' }")
    a.icon.icon-refresh.pull-right
    h1.title 我的订单
  .content
    .content-inner
      .buttons-tab
        a.tab-link.active.button(href='#oTab1') 待付款
        a.tab-link.button(href='#oTab2') 待收货
        a.tab-link.button(href='#oTab3') 已完成
      .content-block
        .tabs
          #oTab1.tab.active
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(v-on:click='goShopping') 去逛逛~
              div(v-else='')
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state==0')
                    .o-wait 等待支付
                    div
                      img(:src='order.wares[0].info.img')
                      .o-order-info
                        p 下单时间：{{order.orderDate}}
                        p 总价：￥{{order.fee}}
                        .button.button-warning(v-on:click='payAgain', :data-order-id='order._id') 去支付
          #oTab2.tab
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(v-on:click='goShopping') 去逛逛~
              div(v-else='')
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state==1')
                    .o-wait 等待配送
                    div
                      img(:src='order.wares[0].info.img')
                      .o-order-info
                        p 下单时间：{{order.orderDate}}
                        p 总价：￥{{order.fee}}
                        .button.button-dark 查看详情
          #oTab3.tab
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(v-on:click='goShopping') 去逛逛~
              div
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state==2')
                    div 订单已完成
                    div
                      img(:src='order.wares[0].info.img')
                      .o-order-info
                        p 下单时间：{{order.orderDate}}
                        p 总价：￥{{order.fee}}
                        .button.button-dark 去评价
</template>

<script>
import $ from 'zepto'
import pingpp from 'pingpp'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  },
  methods: {
    payAgain: function (e) {
      var orderId = $(e.target).data('orderId')
      $.ajax({
        type: 'post',
        url: '/request/ware/pay/again',
        data: {
          orderId: orderId
        },
        success: function (data) {
          pingpp.createPayment(data, function (result, err) {
            if (result === 'success') {
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
            } else if (result === 'fail') {
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result === 'cancel') {
              // 微信公众账号支付取消支付
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
#myOrders
  .content
    background-color #f8fafc
  .content-block
    margin 0
    padding 0

.no-order
  text-align center
  margin-top 8rem
  a
    display block
    width 4.8rem
    height 2.4rem
    background-color #1975c8
    color #000
    line-height 2.4rem
    margin 0 auto

.o-order
  background-color #fff
  margin .6rem 0 0
  padding .4rem .6rem 0
  img
    width 30%
  .button
    width 40%
    margin-left 60%

.o-order-info
  width 70%
  float right
  padding-left .6rem
  margin-top -1.4rem
  p
    margin .6rem 0
    font-size .7rem

.o-wait
  color #ff6600
</style>