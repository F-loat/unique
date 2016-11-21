<template lang="pug">
#manageOrder.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/admin/orderManage")
    h1.title 我的订单
  .content
    .content-inner
        .od-wares
          h2.od-title
            span 2222222
            span.pull-right 未分配
          ul
            li(v-for="ware in order.wares")
              p
                span {{ware.info.name}}
                span.pull-right x1 ￥{{ware.info.price}}
              p.od-weight {{ware.weight}}磅
          p
            span 配送费
            span.pull-right ￥22
          p
            span 优惠券
            span.pull-right -￥222
          p(style="text-align: right") 合计 ￥{{order.fee}}
        .od-infos
          table
            tr
              td 订单号：
              td 45154654651516151648
            tr
              td 下单时间
              td {{order.orderDate}}
          table(style="border-top: 1px solid #bbb; border-bottom: 1px solid #bbb")
            tr
              td 送货时间
              td {{order.receive}}
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
              td {{order.msg}}
          table
            tr
              td 支付方式
              td 支付宝
            tr
              td 支付状态
              td 已支付
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'order-detail',
  activated () {
    this.$nextTick(() => {
      this.order = this.user.orders[this.$route.query.index]
    })
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
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