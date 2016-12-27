<template lang="pug">
#manageOrders.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    a.icon.icon-refresh.pull-right(@click='getOrders()')
    h1.title 订单管理
  .content
    .content-inner
      .buttons-tab
        a.tab-link.active.button(href='#aoTab1') 未分配
        a.tab-link.button(href='#aoTab2') 已分配
        a.tab-link.button(href='#aoTab3') 已完成
      .content-block
        .tabs
          #aoTab1.tab.active
            .content-block
              ul.o-order-wrap
                li(v-for='(order, index) in orders', v-if='order.state === 1')
                  router-link(:to='"/admin/orderManage/" + order._id + "?index=" + index')
                    .o-order
                      p.o-show-detail
                        span {{$moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}}
                        span.pull-right(style="margin-left: 6px") 未分配>
                      p
                        span {{order.wares[0].info.name}}
                        span.pull-right x1
                      p.o-weight {{order.wares[0].weight}}磅
                      div
                        span 收货人：{{order.address.receiver}}
                        span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
          #aoTab2.tab
            .content-block
              ul.o-order-wrap
                li(v-for='(order, index) in orders', v-if='order.state === 1.1')
                  router-link(:to='"/admin/orderManage/" + order._id + "?index=" + index')
                    .o-order
                      p.o-show-detail
                        span {{$moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}}
                        span.pull-right(style="margin-left: 6px") 已分配>
                      p
                        span {{order.wares[0].info.name}}
                        span.pull-right x1
                      p.o-weight {{order.wares[0].weight}}磅
                      div
                        span 收货人：{{order.address.receiver}}
                        span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
          #aoTab3.tab
            .content-block
              ul.o-order-wrap
                li(v-for='(order, index) in orders',  v-if='order.state === 2')
                  router-link(:to='"/admin/orderManage/" + order._id + "?index=" + index')
                    .o-order
                      p.o-show-detail
                        span {{$moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}}
                        span.pull-right(style="margin-left: 6px") 已分配>
                      p
                        span {{order.wares[0].info.name}}
                        span.pull-right x1
                      p.o-weight {{order.wares[0].weight}}磅
                      div
                        span 收货人：{{order.address.receiver}}
                        span.pull-right 共{{order.wares.length}}件 ￥{{order.fee}}
</template>

<script>
import $ from 'zepto'

export default {
  name: 'person-orders',
  activated () {
    this.getOrders()
  },
  data () {
    return {
      orders: []
    }
  },
  methods: {
    getOrders () {
      $.ajax({
        type: 'get',
        url: '/request/order/all',
        dataType: 'json',
        success: data => {
          if (data) {
            console.log(data)
            this.orders = data.orders
          }
        },
        error: () => $.toast('订单信息获取失败')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../themes/'

#manageOrders
  .content
    background-color #e4e4e4
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
    background-color #dfba76
    color #fff
    line-height 2.4rem
    margin 0 auto

.o-order-wrap
  padding 12px
  li
    margin-bottom 12px
  a
    display block
    color #222

.o-order
  padding 6px 12px
  background-color #fff
  margin-top 6px
  border-top 3px solid #dfba76

.o-show-detail
  font-size .65rem

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
</style>