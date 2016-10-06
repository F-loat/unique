<template lang="pug">
#myAddresses.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(:href="backurl")
    h1.title 收货地址
  .content
    .content-inner
      ul
        li.clearfix.ready-address(v-on:click='defaultAddress', v-for='(address, index) in user.addresses', :data-address-id='index', transition='fade')
          span.pull-left.address-detail
            h4 {{address.phone}}（{{address.receiver}}）
            p {{address.site}}
          .pull-right.address-operation
            span.address-edit.icon.icon-edit(v-on:click='editAddress') 编辑
            span.address-delete.icon.icon-remove(v-on:click='deleteAddress') 删除
          span.badge.pull-right(v-if='address.state==1') 默认
      router-link.add(:to="{ path: '/person/addresses/new' }") 新增
</template>

<script>
import $ from 'zepto'
import { mapGetters } from 'vuex'

export default {
  mounted () {
    this.$nextTick(function () {
      this.backurl = this.$route.query.backurl || this.backurl
    })
  },
  data () {
    return {
      backurl: {
        path: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
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
          url: '/request/user/address/default',
          dataType: 'json',
          data: {
            addressId: this.user.addresses[addressId]._id
          },
          success: (data) => {
            if (data.state === 0) {
              $.toast('数据同步失败，请稍后再试')
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
            url: '/request/user/address/delete',
            dataType: 'json',
            data: {
              addressId: this.user.addresses[addressId]._id
            },
            success: (data) => {
              if (data.state === 0) {
                return $.toast('数据同步失败，请稍后再试')
              }
              this.user.addresses.splice(addressId, 1)
            }
          })
        })
      }
    },
    editAddress () {
      console.log('lalala')
    }
  }
}
</script>

<style lang="stylus">
#myAddresses
  .content
    background-color #fdfefe
  .content-block
    margin 0
    padding 0
  .ready-address
    margin .6rem 1.2rem
    height 2.4rem
    p
      font-size .65rem
    .label
      width 20% !important
    .icon
      font-size .7rem
  .input
    font-size .8rem !important
    line-height 2.15rem !important
  .badge
    margin .2rem

#myAddresses .ready-address h4,
#myAddresses .ready-address p
  margin 0
  font-weight normal

#myAddresses .add,
#myAddresses .add:active
  display block
  width 100%
  height 2.2rem
  line-height 2.2rem
  text-align center
  background-color #1975c8
  color #000
  font-size .8rem
  margin-top .4rem

.address-detail
  width 64%
</style>