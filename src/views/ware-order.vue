<template lang="pug">
#wareOrder.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(v-link="{ path: '/ware/' + this.$route.params.wareId }")
    h1.title 订单确认
  .content
    .content-inner
      header.address.bar.bar-nav.bar-sec.row
        div
          a(v-link="{ path: '/person/addresses' }", v-if='user.addresses.length===0') 选择收货地址
          a#address-id(v-link="{ path: '/person/addresses' }", v-else, v-for='address in user.addresses', data-address-id='{{address._id}}', v-if='address.state===1') {{address.site}}
      .order-list-wrap
        .content-inner
          ul.order-list.list-block.media-list
            li(v-for='ware in order.wares')
              label.label-checkbox.item-content
                .item-media
                  img(v-bind:src='ware.info.img')
                .item-inner
                  .item-title {{ware.info.nameEn}}
                  .item-subtitle {{ware.info.name}}
                  .item-subtitle 规格：{{ware.weight}}
                  .item-text.pull-left ￥{{ware.info.price}}/磅
          .order-about.list-block
            ul
              li.item-content.item-link
                .item-inner
                  i 送货时间
                  span
                    input#datetime-picker(type='text')
              li.item-content.item-link
                .item-inner
                  i 优惠券
                  span 0张可用
              li.item-content.item-link
                .item-inner
                  i 订单留言
                  span#order-message(v-on:click='orderMessage') 请填写您对商品的特殊要求
            .distributionFee 配送费￥10.00
            div
              .pay-way-title 支付方式
              ul.pay-way
                li
                  label.label-checkbox.item-content
                    input#alipay(type='radio', name='my-radio', checked='checked')
                    .item-media
                      i.icon.icon-form-checkbox
                    .item-inner
                      .item-title-row
                        .item-title 支付宝
                li
                  label.label-checkbox.item-content
                    input(type='radio', name='my-radio')
                    .item-media
                      i.icon.icon-form-checkbox
                    .item-inner
                      .item-title-row
                        .item-title 微信支付
    #order-now
      .list-block.media-list.pull-left
        label.label-checkbox.item-content
          .item-inner
            .pull-right 共￥{{order.price}}
      #pay.order(v-on:click='pay') 下单
</template>

<script>
import $ from 'zepto'
import pingpp from 'pingpp'
import { wareInfo, orderWares, orderInit } from '../vuex/actions'
import { getUserInfo, getWareInfo, getOrderInfo } from '../vuex/getters'

export default {
  attached () {
    this.wareInfo(this.$route.params.wareId)
    this.orderInit()
    this.orderWares(this.ware)
    this.order.price = 5
    var date = new Date()
    $('#datetime-picker').datetimePicker({
      value: [date.getFullYear(), (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1), date.getDate() > 9 ? date.getDate() : '0' + date.getDate(), '11', '30']
    })
  },
  vuex: {
    actions: {
      wareInfo,
      orderInit,
      orderWares
    },
    getters: {
      user: getUserInfo,
      ware: getWareInfo,
      order: getOrderInfo
    }
  },
  methods: {
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
        $.ajax({
          type: 'post',
          url: '/request/ware/pay',
          data: {
            order: JSON.stringify(this.order)
          },
          success: (data) => {
            pingpp.createPayment(data, (result, err) => {
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
      } else {
        $.toast('请先登录')
      }
    }
  }
}
</script>

<style lang="stylus">
#wareOrder
  .content
    background-color #fdfefe
  header
    a
      color #222
  .address
    text-align center
    line-height 2.2rem
  &:not(.watch-active-state)
    .list-block
      .item-link
        &:active
          background-color #fcfcfc

.picker-modal
  .bar
    .button-link
      color #fff
    .title
      color #222 !important

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
  position absolute
  bottom 0rem
  left 0
  line-height 2.5rem
  .list-block
    margin 0
    width 70%
    background-color #1a7ace
    color #222
    .item-inner
      &:after
        background-color #1a7ace
  .item-inner
    padding 0 .6rem 0 0
    box-sizing border-box

.distributionFee
  text-align right
  font-size .65rem
  margin .2rem 1rem

.order-list-wrap
  margin-top 3rem
  padding-bottom 2.9rem

.pay-way-title
  font-size .65rem
  margin .2rem 1rem

html:not(.watch-active-state) .pay-way label.label-checkbox:active,
.pay-way label.label-checkbox.active-state
  background-color #fcfcfc
</style>