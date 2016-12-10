<template lang="pug">
#wareOrder.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(@click="$router.back()")
    h1.title 订单确认
  .content
    .content-inner
      .order-list-wrap
        .content-inner
          ul.order-list.list-block.media-list
            li(v-for='ware in order.wares')
              label.label-checkbox.item-content
                .item-media
                  img(:src="'/upload/img/' + ware.info.img")
                .item-inner
                  .item-title {{ware.info.nameEn}}
                  .item-subtitle {{ware.info.name}}
                  .item-subtitle 规格：{{ware.weight}}
                  .item-subtitle 数量：{{ware.sum}}
                  .item-text.pull-left ￥{{ware.info.price[0].val}}
          .order-about.list-block
            ul
              li.item-content.item-link
                router-link.item-inner(to="/person/addresses")
                  i 收货地址
                  span
                    div(v-if='!this.address') 添加收货地址
                    #address-id(v-else, :data-address-id='address._id') {{address.site}}
              li.item-content.item-link
                .item-inner
                  i 送达时间
                  span
                    input#datetime-picker(type='text')
              //- li.item-content.item-link
              //-   .item-inner
              //-     i 优惠券
              //-     span 0张可用
              li.item-content.item-link
                .item-inner
                  i 订单留言
                  span#order-message(v-on:click='orderMessage') 请填写您对商品的特殊要求
            .distributionFee 开业初期免配送费
            div
              .pay-way-title 支付方式
                span(v-if="wx") 
                |（选择微信支付可使用相关优惠券）
              ul.pay-way
                li(v-if="wx")
                  label.label-checkbox.item-content
                    input#wxpay(type='radio', name='my-radio', :checked='wx ? true : false')
                    .item-media
                      i.icon.icon-form-checkbox
                    .item-inner
                      .item-title-row
                        .item-title 微信支付
                li
                  label.label-checkbox.item-content
                    input#alipay(type='radio', name='my-radio', :checked='wx ? false : true')
                    .item-media
                      i.icon.icon-form-checkbox
                    .item-inner
                      .item-title-row
                        .item-title 支付宝
    #order-now
      .list-block.media-list.pull-left
        label.label-checkbox.item-content
          .item-inner
            .pull-right 共￥{{order.price.toFixed(2) - (-0)}}
      #pay.order(v-on:click='pay') 下单
</template>

<script>
import $ from 'zepto'
import pingpp from 'pingpp'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ware-order',
  activated () {
    if (this.$route.params.wareId) {
      this.wareInfo(this.$route.params.wareId)
      this.orderInit()
      this.orderWares(this.ware)
    } else if (!this.order.wares.length) {
      this.$router.push('/shopcar')
    }
    for (let ware of this.order.wares) {
      this.order.price += ware.info.price[0].val * ware.sum * ware.weight
    }
    var date = new Date()
    $('#datetime-picker').datetimePicker({
      value: [date.getFullYear(), (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1), date.getDate() > 9 ? date.getDate() : '0' + date.getDate(), '11', '30']
    })
  },
  data () {
    return {
      wx: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1,
      ispay: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo',
      ware: 'getWareInfo',
      order: 'getOrderInfo'
    }),
    address () {
      for (let address of this.user.addresses) {
        if (address.state === 1) {
          return address
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'userInfo',
      'wareInfo',
      'orderInit',
      'orderWares'
    ]),
    orderMessage () {
      $.prompt('您有什么要求呢？',
        (value) => {
          if (value !== $('#order-message').text()) {
            $('#order-message').text(value)
            this.order.msg = value
          }
        },
        () => $.toast('您没有保存要求')
      )
      $('.modal-text-input').val($('#order-message').text())
    },
    pay () {
      if (this.ispay) return $.toast('调用支付中')
      if (this.user.nickname) {
        if ($('#alipay').is(':checked')) {
          this.order.payway = 1
        } else {
          this.order.payway = 0
        }
        if ($('#address-id').length) {
          this.order.addressId = $('#address-id').data('addressId')
        } else {
          return $.toast('请先添加地址')
        }
        this.ispay = true
        this.order.receivingTime = $('#datetime-picker').val()
        $.ajax({
          type: 'post',
          url: '/request/ware/pay',
          data: {
            order: JSON.stringify(this.order)
          },
          success: (data) => {
            pingpp.createPayment(data, (result, err) => {
              if (result === 'success') {
                this.ispay = false
                this.$router.push('/person/orders')
              } else if (result === 'fail') {
                this.ispay = false
                $.toast('付款失败，请稍后再试')
              } else if (result === 'cancel') {
                this.ispay = false
                $.toast('已取消支付')
              }
            })
          }
        })
      } else {
        $.toast('请先登录')
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#wareOrder
  .content
    background-color bc_light
    a
     color #222
  &:not(.watch-active-state)
    .list-block
      .item-link
        &:active
          background-color bc_light

#address-id
  color fc_dark

.picker-modal
  .bar
    .button-link
      color bc_light
    .title
      color fc_dark !important

.order-about
  margin 0
  i
    font-style normal
    padding 0 .4rem
    width 28%
    box-sizing border-box
  span
    width 72%

#order-now
  width 100%
  height 2.5rem
  position fixed
  bottom 0rem
  line-height 2.5rem
  z-index 99
  .list-block
    margin 0
    width 70%
    background-color mc
    color fc_dark
    .item-inner
      &:after
        background-color fc_light
  .item-inner
    padding 0 .6rem 0 0
    box-sizing border-box

@media screen and (min-width: 614px)
  #order-now
    width 24rem
    margin 0 auto

.distributionFee
  text-align right
  font-size .65rem
  margin .2rem 1rem

.order-list-wrap
  padding-bottom 2.9rem

.pay-way-title
  font-size .65rem
  margin .2rem 1rem

html:not(.watch-active-state) .pay-way label.label-checkbox:active,
.pay-way label.label-checkbox.active-state
  background-color bc_light
</style>