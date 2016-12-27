<template lang="pug">
#myAddresses.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(@click='$router.back()')
    h1.title 收货地址
  .content
    .content-inner
      transition-group(name="fade", tag="ul")
        li.clearfix.ready-address(v-on:click='defaultAddress', v-for='(address, index) in user.addresses', :data-address-id='index',
         key='index', :class="{ active: (address.state == 1) }")
          span.pull-left.address-detail
            h4 {{address.phone}}（{{address.receiver}}）
            p {{address.site}}
          .pull-right.address-operation
            span.address-delete.icon.iconfont.icon-huishouzhan1(v-on:click='deleteAddress')
      router-link.add(to="/person/addresses/new") 新增
</template>

<script>
import $ from 'zepto'
import { mapGetters } from 'vuex'

export default {
  name: 'person-addresses',
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  },
  activated () {
    if (!this.user.addresses.length) this.$router.replace('/person/addresses/new')
  },
  methods: {
    defaultAddress (e) {
      if (e.target.tagName !== 'SPAN') {
        var addressId = $(e.currentTarget).data('addressId')
        for (var i = this.user.addresses.length - 1; i >= 0; i--) {
          this.user.addresses[i].state = 0
        }
        this.user.addresses[addressId].state = 1
        $.ajax({
          type: 'post',
          url: this.$domain + '/request/user/address/default',
          dataType: 'json',
          data: {
            addressId: this.user.addresses[addressId]._id
          },
          success: (data) => {
            if (data.state === 0) {
              $.toast('数据同步失败，请重新登录尝试')
            }
          }
        })
      }
    },
    deleteAddress (e) {
      var addressId = $(e.target).parent().parent().data('addressId')
      if (this.user.addresses[addressId].state === 1) {
        $.toast('当前地址为默认地址，不可删除')
      } else {
        $.confirm('确认删除？', () => {
          $.ajax({
            type: 'post',
            url: this.$domain + '/request/user/address/delete',
            dataType: 'json',
            data: {
              addressId: this.user.addresses[addressId]._id
            },
            success: (data) => {
              if (data.state === 0) {
                return $.toast('数据同步失败，请重新登录尝试')
              }
              this.user.addresses.splice(addressId, 1)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#myAddresses
  .content
    background-color bc_light
  .content-block
    margin 0
    padding 0
  .ready-address
    margin .4rem 0
    padding .6rem 1.2rem
    background-color #eee
    p
      font-size .65rem
    .label
      width 20% !important
  .ready-address.active
    border-left 4px solid #dfba76
  .input
    font-size .8rem !important
    line-height 2.15rem !important
  .badge
    margin .2rem
  .address-delete
    font-size 1rem
    line-height 2rem

  .ready-address h4, .ready-address p
    margin 0
    font-weight normal

  .add, .add:active
    display block
    width 30%
    margin 0 auto
    height 2.2rem
    line-height 2.2rem
    text-align center
    background-color #dfba76
    color fc_dark
    font-size .8rem
    margin-top .4rem

  .address-detail
    width 64%
</style>