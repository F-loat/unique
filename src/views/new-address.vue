<template lang="pug">
#newAddress.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(@click='$router.back()')
    h1.title  添加地址 
  .content
    .content-inner
      ul
        li.address.list-block
          .item-inner
            .item-title.label 姓名：
            .item-input
              input#address-receiver.input(type='text', placeholder='收货人姓名')
        li.address.list-block
          .item-inner
            .item-title.label 手机：
            .item-input
              input#address-phone.input(type='number', placeholder='收货人手机号')
        li.address.list-block
          .item-inner
            .item-title.label 地址：
            .item-input
              input#address-site.input(type='text', placeholder='路名/小区/楼号/门牌号')
      a.add(@click='newAddress') 新增
</template>

<script>
import $ from 'zepto'
import { mapGetters } from 'vuex'

export default {
  name: 'new-address',
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  },
  methods: {
    newAddress () {
      if (!$('#address-receiver').val()) {
        $.toast('请输入收货人姓名')
      } else if (!$('#address-phone').val() || $('#address-phone').val().length !== 11) {
        $.toast('请输入正确的手机号')
      } else if (!$('#address-site').val()) {
        $.toast('请输入收货人地址')
      } else {
        var newAddress = {
          phone: $('#address-phone').val(),
          receiver: $('#address-receiver').val(),
          site: $('#address-site').val(),
          state: this.user.addresses.length === 0 ? 1 : 0
        }
        $.ajax({
          type: 'post',
          url: this.$domain + '/request/user/address/new',
          dataType: 'json',
          data: {
            addressInfo: JSON.stringify(newAddress)
          },
          success: (data) => {
            if (data.state === 0) {
              $.toast('数据同步失败，请稍后再试')
            } else {
              this.user.addresses.push(data.address)
              $.toast('地址添加成功')
              this.$router.back()
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#newAddress
  .content
    background-color bc_light
  .address
    margin .4rem 2rem
    height 2.4rem
    .label
      width 20% !important
  .input
    font-size .8rem !important
    line-height 2.15rem !importane

#newAddress .add,
#newAddress .add:active
  display block
  width 30%
  margin 0 auto
  height 2.2rem
  line-height 2.2rem
  text-align center
  background-color #dfba76
  color fc_dark
  font-size .8rem
</style>