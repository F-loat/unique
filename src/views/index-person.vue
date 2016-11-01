<template lang="pug">
#tab5.tab
  header.bar.bar-nav
    img(:src='headimgurl')
    .webFont(v-if='!user.nickname')
      router-link(to="/person/fastLogin") 登录/注册
    div(v-else)
      | {{user.nickname}}
      span#logout(v-on:click='logout') [注销]
  .content
    .list-block
      ul
        li.item-content.item-link
          router-link(to="/person/orders")
            .item-inner
              .item-title
                i.icon.icon-edit
                i 我的订单
        li.item-content.item-link
          router-link(to="/person/addresses")
            .item-inner
              .item-title
                i.icon.icon-card
                i 收货地址
        li.item-content.item-link
          router-link(to="/person/coupons")
            .item-inner
              .item-title
                i.icon.icon-code
                i 我的优惠券
        li.item-content.item-link
          router-link(to="/fedBack")
            .item-inner
              .item-title
                i.icon.icon-emoji
                i 意见反馈
        li.item-content.item-link
          router-link(to="/aboutUs")
            .item-inner
              .item-title
                i.icon.icon-friends
                i 关于我们
        li.item-content.item-link
          router-link(to="/userAgreement")
            .item-inner
              .item-title
                i.icon.icon-app
                i 用户使用协议
        li.item-content.item-link(v-if='user.type===9')
          a.external(href='admin.html')
            .item-inner
              .item-title
                i.icon.icon-settings
                i 后台管理
      #Tel
        a.call(href='tel:15822922123')
          span.icon.icon-phone
          span 客服电话
          span 15822922123
</template>

<script>
import $ from 'zepto'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'index-person',
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    }),
    headimgurl () {
      return this.user.headimgurl || 'http://cakeees.top/upload/img/head.jpg'
    }
  },
  methods: {
    ...mapActions([
      'userInit'
    ]),
    logout () {
      $.confirm('确认注销？', () => {
        $.ajax({
          type: 'get',
          url: '/request/user/logout',
          success: (data) => {
            if (data.state === 1) {
              $.toast('注销成功')
              this.userInit()
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

/*个人中心样式*/
#tab5
  & > .content
    bottom 2.5rem
  .list-block
    margin 0
    .item-content
      padding 0 0.75rem
  .bar
    height 7rem
    color bc_light
    text-align center
    padding-top .85rem
    img
      width 4rem
      height 4rem
      border-radius 2rem
    a
      color bc_light
  .bar-nav
    & ~ .content
      top 7rem
  .item-title
    & > i
      font-style normal
      margin 0 0.2rem
  .content
    a
      display block
      width 100%
      color fc_gray

#Tel
  width 100%
  height 2.2rem
  text-align center
  background-color bc_light
  margin-top 1rem
  border 1px solid #f7f7f7
  span
    font-size .85rem
    line-height 2.2rem
    margin 0 0.3rem
    color fc_dark
</style>