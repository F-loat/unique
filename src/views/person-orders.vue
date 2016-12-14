<template lang="pug">
#myOrders.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    a.icon.icon-refresh.pull-right(@click='userInfo()')
    h1.title 我的订单
  .content
    .content-inner
      .buttons-tab
        a.tab-link.active.button(href='#oTab1') 未完成
        a.tab-link.button(href='#oTab2') 已完成
        a.tab-link.button(href='#oTab3') 全部订单
      .content-block
        .tabs
          #oTab1.tab.active
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul.o-order-wrap
                  li(v-for='(order, index) in user.orders', v-if='order.state===1')
                    router-link(:to='"/person/orders/" + order._id + "?index=" + index')
                      .o-order
                        p.o-show-detail
                          span {{$moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}}
                          span(style="margin-left: 12px;") 查看明细>
                        p.o-wait 等待制作配送
                        div.o-state
                          span.icon.iconfont.icon-zhifuwenti.active
                          span ···
                          span.icon.iconfont.icon-peisongzhong
                          span ···
                          span.icon.iconfont.icon-wancheng
                        p.fs-65
                          span {{order.wares[0].info.name}}
                          span.pull-right x{{order.wares[0].sum}}
                        p.fs-65.o-weight {{order.wares[0].weight}}磅
                        p.fs-65.o-total
                          span 等···
                          span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
                    table.buy-again
                      tr
                        td(@click="cancel(order._id)") 取消订单
                        td(@click="buyAgain(order._id)") 再次购买
          #oTab2.tab
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul.o-order-wrap
                  li(v-for='(order, index) in user.orders', v-if='order.state===2')
                    router-link(:to='"/person/orders/" + order._id + "?index=" + index')
                      .o-order
                        p
                          span.icon.icon-check
                          span 已收货
                          span.pull-right {{order.orderDate}}下单
                        p.fs-65
                          span {{order.wares[0].info.name}}
                          span.pull-right x{{order.wares[0].sum}}
                        p.fs-65.o-weight {{order.wares[0].weight}}磅
                        p.fs-65.o-total
                          span 等···
                          span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
                    .buy-again(@click="buyAgain(order._id)") 再次购买                
          #oTab3.tab
            .content-block
              .no-order(v-if='!user.orders.length')
                p 暂无相关订单
                p
                  a(@click="$router.push('/ware')") 去逛逛~
              div(v-else)
                ul.o-order-wrap
                  li(v-for='(order, index) in user.orders')
                    div(v-if='order.state===2')
                      router-link(:to='"/person/orders/" + order._id + "?index=" + index')
                        .o-order
                          p
                            span.icon.icon-check
                            span 已收货
                            span.pull-right {{order.orderDate}}下单
                          p.fs-65
                            span {{order.wares[0].info.name}}
                            span.pull-right x{{order.wares[0].sum}}
                          p.fs-65.o-weight {{order.wares[0].weight}}磅
                          p.fs-65.o-total
                            span 等···
                            span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
                      table.buy-again
                        tr
                          td(@click="buyAgain(order._id)") 再次购买
                    div(v-if='order.state===1')
                      router-link(:to='"/person/orders/" + order._id + "?index=" + index')
                        .o-order
                          p.o-show-detail
                            span {{order.orderDate}}
                            span(style="margin-left: 12px;") 查看明细>
                          p.o-wait 等待制作配送
                          div.o-state
                            span.icon.iconfont.icon-zhifuwenti.active
                            span ···
                            span.icon.iconfont.icon-peisongzhong
                            span ···
                            span.icon.iconfont.icon-wancheng
                          p.fs-65
                            span {{order.wares[0].info.name}}
                            span.pull-right x{{order.wares[0].sum}}
                          p.fs-65.o-weight {{order.wares[0].weight}}磅
                          p.fs-65.o-total
                            span 等···
                            span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
                      table.buy-again
                        tr
                          td(@click="cancel(order._id)") 取消订单
                          td(@click="buyAgain(order._id)") 再次购买
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
    buyAgain (orderId) {
      function pay (way) {
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
    cancel (orderId) {
      $.prompt('请输入理由', function (value) {
        $.toast('提交成功')
      })
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
    background-color #e4e4e4
  .content-block
    margin 0
    padding 0
  .buttons-tab .button
    color rgba(0, 0, 0, .4)
  .buttons-tab .button.active
    color #176ab3

.no-order
  text-align center
  margin-top 8rem
  a
    display block
    width 4.8rem
    height 2.4rem
    background-color #dfba76
    color #fff
    line-height 2.4rem
    margin 0 auto

.o-order-wrap
  padding 12px
  li
    margin-bottom 12px
  a
    color #222

.o-order
  padding 6px 12px
  background-color #fff
  margin-top 6px
  border-top 3px solid #dfba76

.o-show-detail
  font-size .65rem
  text-align center

.o-wait
  font-size 1rem
  text-align center
  margin 0

.o-state
  font-size 28px
  text-align center
  border-radius 50%
  color #ccc
  .icon
    font-size 1.6rem
  .active
    color #222

.o-weight
  color #aaa
  border-bottom 1px solid #eee

.o-total
  color #aaa

.o-order-info
  width 70%
  float right
  padding-left .6rem
  margin-top .4rem
  p
    margin .6rem 0
    font-size .7rem

.buy-again
  width 100%
  font-size .7rem
  color #222
  text-align center
  background-color #f2f2f2
  line-height 50px
</style>