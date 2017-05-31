<template lang="pug">
#manageOrder.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/admin/orderManage")
    h1.title 我的订单
  .content
    .content-inner
        .od-wares
          h2.od-title
            span 订单状态
            span.pull-right(v-if="order.state === 1") 未分配
            span.pull-right(v-if="order.state === 1.1") 已分配
            span.pull-right(v-if="order.state === 2") 已完成
          ul
            li(v-for="ware in order.wares")
              p
                span {{ware.info.name}}
                span.pull-right x1 ￥{{ware.info.price[0].val}}
              p.od-weight {{ware.weight}}磅
          p
            span 配送费
            span.pull-right ￥0
          p(style="text-align: right") 合计 ￥{{order.fee}}
        .od-infos
          table
            tr
              td 订单号：
              td {{order.order_no}}
            tr
              td 下单时间
              td {{$moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}}
          table(style="border-top: 1px solid #bbb; border-bottom: 1px solid #bbb")
            tr
              td 送货时间
              td {{$moment(order.receive).format('YYYY-MM-DD HH:mm:ss')}}
            tr
              td 收货人
              td {{order.address.receiver}}
            tr
              td 联系电话
              td {{order.address.phone}}
            tr
              td 收货地址
              td {{order.address.site}}
            tr
              td 订单留言
              td {{order.msg || '无'}}
          table
            tr
              td 支付方式
              td(v-if="order.payway === 0") 微信支付
              td(v-else) 支付宝支付
            tr
              td 支付状态
              td 已支付
        .content-block
          .button.button-fill(v-if="order.state === 1", @click="assigned") 标记已分配
          .button.button-fill(v-if="order.state === 1.1", @click="complete") 标记已完成
</template>

<script>
import $ from 'zepto'

export default {
  name: 'order-detail',
  activated () {
    this.$nextTick(() => {
      this.getOrder()
    })
  },
  data () {
    return {
      order: {
        address: {}
      }
    }
  },
  methods: {
    getOrder () {
      $.ajax({
        type: 'get',
        url: '/request/order/one?_id=' + this.$route.params.oid,
        dataType: 'json',
        success: data => {
          if (data) {
            this.order = data.order
          }
        },
        error: () => $.toast('订单信息获取失败')
      })
    },
    assigned () {
      $.ajax({
        type: 'get',
        url: '/request/order/assigned?_id=' + this.$route.params.oid,
        dataType: 'json',
        success: data => {
          if (data.state === 1) {
            $.toast('操作成功')
            this.getOrder()
          } else {
            $.toast('操作失败')
          }
        },
        error: () => $.toast('操作失败')
      })
    },
    complete () {
      $.ajax({
        type: 'get',
        url: '/request/order/complete?_id=' + this.$route.params.oid,
        dataType: 'json',
        success: data => {
          if (data.state === 1) {
            $.toast('操作成功')
            this.getOrder()
          } else {
            $.toast('操作失败')
          }
        },
        error: () => $.toast('操作失败')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../themes/'

#manageOrder
  .content
    background-color #f2f2f2
  .od-infos table
    width 100%
    td:first-child
      width 30%

.od-title
  margin 8px 0

.od-wares
  text-align left
  background-color #f2f2f2
  padding 16px
  p
    margin 0
    line-height 1.8

.od-weight
  color #ccc
  border-bottom 1px solid #ccc
  line-height 22px
  
.od-infos
  color #222
  background-color #e4e4e4
  padding 16px
  width 100%
  text-align left
  font-size 14px
  tr
    line-height 28px
  
.o-wait
  font-size 18px
  text-align center
  margin 0

.o-state
  font-size 28px
  text-align center
  border-radius 50%
</style>