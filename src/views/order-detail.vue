<template lang="pug">
#Order.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person/orders")
    h1.title 我的订单
  .content
    .content-inner
        .od-wares
          .o-wait 等待制作配送
            div.o-state
              span.icon.iconfont.icon-zhifuwenti.active
              span ···
              span.icon.iconfont.icon-peisongzhong
              span ···
              span.icon.iconfont.icon-wancheng
          ul
            li(v-for="ware in order.wares")
              p
                span {{ware.info.name}}
                span.pull-right x{{ware.sum}} ￥{{ware.info.price[0].val}}
              p.od-weight {{ware.weight}}磅
          p
            span 配送费
            span.pull-right ￥0
          //- p
          //-   span 优惠券
          //-   span.pull-right -￥0
          p(style="text-align: right") 合计 ￥{{order.fee}}
        table.buy-again
          tr
            td(v-if="true", @click="cancel") 取消订单
            td(@click="buyAgain") 再次购买
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
              td 送达时间
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
</template>

<script>
import $ from 'zepto'
import pingpp from 'pingpp'
import { mapGetters } from 'vuex'

export default {
  name: 'order-detail',
  mounted () {
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
    buyAgain (e) {
      function pay (way) {
        var orderId = $(e.target).parent().data('orderId')
        $.ajax({
          type: 'post',
          url: this.$domain + '/request/ware/pay/again',
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
    cancel (e) {
      $.prompt('请输入理由', function (value) {
        $.toast('提交成功')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../themes/'

#Order
  .content
    background-color #e4e4e4
  .od-infos table
    width 100%
    td:first-child
      width 30%

.od-wares
  text-align left
  background-color #fff
  padding 16px
  p
    margin 0
    line-height 1.8
    font-size .65rem

.od-weight
  color #ccc
  border-bottom 1px solid #ccc
  line-height 22px

.buy-again
  width 100%
  font-size .7rem
  color #222
  text-align center
  background-color #f2f2f2
  line-height 50px
  
.od-infos
  color #222
  background-color #e4e4e4
  padding 16px
  width 100%
  text-align left
  font-size .65rem
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
  color #ccc
  .icon
    font-size 1.6rem
  .active
    color #222
</style>