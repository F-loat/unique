<template lang="pug">
#myOrders.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    a.icon.icon-refresh.pull-right(@click='userInfo()')
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
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state===0')
                    .o-wait 等待支付
                    div
                      img(:src='order.wares[0].info.img')
                      .o-order-info
                        p 下单时间：{{order.orderDate}}
                        p 总价：￥{{order.fee}}
                        .buttons.clearfix(:data-order-id='order._id')
                          .button.button-warning.pull-right(@click='payAgain') 去支付
                          .button.button-light.icon.icon-remove.pull-right(@click='deleteOrder') 删除
          #oTab2.tab
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state===1')
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
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul
                  li.o-order(v-for='order in user.orders', v-if='order.state===2')
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'person-orders',
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  },
  activated () {
    this.userInfo()
  },
  methods: {
    ...mapActions([
      'userInfo'
    ]),
    payAgain (e) {
      function pay (way) {
        var orderId = $(e.target).parent().data('orderId')
        $.ajax({
          type: 'post',
          url: '/request/ware/pay/again',
          data: {
            payway: way,
            orderId: orderId
          },
          success: (data) => {
            pingpp.createPayment(data, function (result, err) {
              if (result === 'success') {
                this.userInfo()
              } else if (result === 'fail') {
                $.toast('付款失败，请稍后再试')
              } else if (result === 'cancel') {
                $.toast('已取消支付')
              }
            })
          }
        })
      }
      var ua = navigator.userAgent.toLowerCase()
      var isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin) {
        $.modal({
          title: '使用何种方式支付？',
          buttons: [
            {
              text: '支付宝',
              onClick: () => pay('1')
            },
            {
              text: '微信支付',
              onClick: () => pay('0')
            },
            {
              text: '取消'
            }
          ]
        })
      } else pay('1')
    },
    deleteOrder (e) {
      var orderId = $(e.target).parent().data('orderId')
      $.confirm('确认删除？', () => {
        $.ajax({
          type: 'post',
          url: '/request/user/order/delete',
          dataType: 'json',
          data: {
            orderId: orderId
          },
          success: (data) => {
            if (data.state === 0) {
              return $.toast('数据同步失败，请重新登录尝试')
            }
            this.userInfo()
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#myOrders
  .content
    background-color bc_light
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
    background-color mc
    color fc_dark
    line-height 2.4rem
    margin 0 auto

.o-order
  background-color bc_light
  margin .6rem 0 0
  padding .4rem .6rem 0
  img
    width 30%
  .button-warning
    width 40%
  .button-light
    color #ccc
    margin-right 12px

.o-order-info
  width 70%
  float right
  padding-left .6rem
  margin-top -.4rem
  p
    margin .6rem 0
    font-size .7rem

.o-wait
  color #ff6600
</style>