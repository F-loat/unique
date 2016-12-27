<template lang="pug">
#registPage.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person/login")
    h1.title 注册
  .content
    .content-inner
      ul
        li.address.list-block
          .item-inner
            .item-title.label 手机号：
            .item-input
              input#reg-phone.input(type='number', placeholder='请输入您的手机号')
        li.address.list-block
          .item-inner
            .item-title.label 密码：
            .item-input
              input#reg-password.input(type='password', placeholder='请输入密码')
        li.address.list-block
          .item-inner
            .item-title.label 确认密码：
            .item-input
              input#reg-pswagain.input(type='password', placeholder='请再次输入密码')
        li.address.list-block
          .item-inner
            .item-title.label 验证码：
            .item-input
              input#reg-identify.input.pull-left(type='number', placeholder='请输入验证码')
              input#get-identify.pull-right(v-on:click='getIdentify', type='button', value='获取验证码')
      #regist-now(v-on:click='regist') 注册 
      router-link.signin-turn.pull-right(to="/person/login") 已有账号？去登陆~
</template>

<script>
import $ from 'zepto'
import { mapActions } from 'vuex'

export default {
  name: 'person-regist',
  methods: {
    ...mapActions([
      'userInfo'
    ]),
    regist () {
      var phone = $('#reg-phone').val()
      var password = $('#reg-password').val()
      var pswagain = $('#reg-pswagain').val()
      var identify = $('#reg-identify').val()
      if (phone.length !== 11) {
        $.toast('请输入正确的手机号')
      } else if (!password) {
        $.toast('请输入密码')
      } else if (password !== pswagain) {
        $.toast('两次密码输入不一致')
      } else if (!identify) {
        $.toast('请输入验证码')
      } else {
        $.ajax({
          type: 'post',
          url: this.$domain + '/request/user/regist',
          dataType: 'json',
          data: {
            phone: phone,
            password: password,
            identify: identify
          },
          success: (data) => {
            if (data.state === 1) {
              $.toast('注册成功，正在为您登录')
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
    },
    getIdentify () {
      if ($('#get-identify').val() === '获取验证码') {
        let phone = $('#reg-phone').val()
        if (phone.length === 11) {
          $.ajax({
            type: 'post',
            url: this.$domain + '/request/user/regist/identify',
            data: {
              phone: phone
            },
            success: (data) => {
              if (data.state === 1) {
                $.toast('验证码已下发至您的手机，请查收')
                let t = 60
                let countdown = setInterval(() => {
                  if (t === 0) {
                    clearInterval(countdown)
                    $('#get-identify').val('获取验证码')
                  } else {
                    $('#get-identify').val(t + 's后重试')
                    t--
                  }
                }, 1000)
              } else {
                $.toast('验证码发送失败，请检查号码或稍后再试')
              }
            }
          })
        } else {
          $.toast('请输入正确的手机号')
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#registPage
  .content
    background-color bc_light
  .list-block
    .item-inner
      padding-right 0
  .address
    margin .4rem 1.4rem
    height 2.4rem
    .label
      width 28% !important
  .input
    font-size .8rem !important
    line-height 2.15rem !importane
  .signin-turn
    font-size .75rem
    color #ccc
    margin .6rem

#regist-now
  text-align center
  background-color mc
  margin 1.2rem auto 0
  height 1.8rem
  line-height 1.8rem

#reg-identify
  width 55%

#get-identify
  width 45%
  line-height 1.5rem
  margin-top .2rem
  padding 0
  background-color mc
  border none
  transition all ease .3s
  &:active
    background-color #176ab3
</style>