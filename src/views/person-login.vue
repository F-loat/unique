<template lang="pug">
#loginPage.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    h1.title 登录
  .content
    .content-inner
      ul
        li.address.list-block
          .item-inner
            .item-title.label 手机号：
            .item-input
              input#log-phone.input(type='number', placeholder='输入您的手机号')
        li.address.list-block
          .item-inner
            .item-title.label 密码：
            .item-input
              input#log-password.input(type='password', placeholder='输入登录密码')
      #login-now(v-on:click='login') 登录
      router-link.signin-turn.pull-right(to="/person/regist") 还没有账号？去注册~
</template>

<script>
import $ from 'zepto'
import md5 from 'md5'
import { mapActions } from 'vuex'

export default {
  name: 'person-login',
  methods: {
    ...mapActions([
      'userInfo'
    ]),
    login () {
      var phone = $('#log-phone').val()
      var password = $('#log-password').val()
      if (phone.length !== 11) {
        $.toast('请输入正确的手机号')
      } else if (!password) {
        $.toast('请输入密码')
      } else {
        $.ajax({
          type: 'post',
          url: '/request/user/login',
          dataType: 'json',
          data: {
            phone: phone,
            password: md5(password)
          },
          success: (data) => {
            if (data.state === 1) {
              $.toast('登录成功，正在为您跳转')
              this.userInfo()
              setTimeout(() => {
                this.$router.push('/person')
              }, 1000)
            } else {
              $.toast(data.err)
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

#loginPage
  .content
    background-color bc_light
  .address
    margin .4rem 1.4rem
    height 2.4rem
    .label
      width 28% !important
  .input
    font-size .8rem !important
    line-height 2.15rem !important
  .signin-turn
    font-size .75rem
    color #ccc
    margin .6rem

#login-now
  text-align center
  background-color fc_light
  margin 1.2rem auto 0
  height 1.8rem
  line-height 1.8rem
</style>