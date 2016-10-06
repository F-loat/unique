<template lang="pug">
#fastLoginPage.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(:to="{ path: '/person' }")
    h1.title 快速登录
  .content
    .content-inner
      ul
        li.address.list-block
          .item-inner
            .item-title.label 手机号：
            .item-input
              input#fastLog-phone.input(type='number', placeholder='输入您的手机号')
        li.address.list-block
          .item-inner
            .item-title.label 验证码：
            .item-input
              input#fastLog-identify.input.pull-left(type='number', placeholder='请输入验证码')
              input#fastGet-identify.pull-right(v-on:click='fastGetIdentify', type='button', value='获取验证码')
      #fastLogin-now(v-on:click='fastLogin') 快速登录
      router-link.signin-turn.pull-right(:to="{ path: '/person/login' }") 账号密码登录
      a.signin-turn.pull-right(href=" https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3eb86a311c6b9da4&redirect_uri=http%3A%2F%2Fcakeees.top&response_type=code&scope=snsapi_userinfo&state=wxoauth#wechat_redirect") 微信登录
</template>

<script>
import $ from 'zepto'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'userInfo'
    ]),
    fastGetIdentify () {
      if ($('#fastGet-identify').val() === '获取验证码') {
        var phone = $('#fastLog-phone').val()
        if (phone.length === 11) {
          $.ajax({
            type: 'post',
            url: '/request/user/fastLogin/identify',
            data: {
              phone: phone
            },
            success: (data) => {
              if (data.state === 1) {
                $.toast('验证码已下发至您的手机，请查收')
                var t = 60
                var countdown = setInterval(function () {
                  if (t === 0) {
                    clearInterval(countdown)
                    $('#fastGet-identify').val('获取验证码')
                  } else {
                    $('#fastGet-identify').val(t + 's后重试')
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
    },
    fastLogin () {
      var phone = $('#fastLog-phone').val()
      var identify = $('#fastLog-identify').val()
      if (phone.length !== 11) {
        $.toast('请输入正确的手机号')
      } else if (!identify) {
        $.toast('请输入验证码')
      } else {
        $.ajax({
          type: 'post',
          url: '/request/user/fastLogin',
          dataType: 'json',
          data: {
            phone: phone,
            identify: identify
          },
          success: (data) => {
            if (data.state === 1) {
              $.toast('登录成功，正在为您跳转')
              this.userInfo()
              setTimeout(() => {
                this.$router.go('/person')
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
#fastLoginPage
  .content
    background-color #fdfefe
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

#fastLogin-now
  text-align center
  background-color #1a7ace
  margin 1.2rem auto 0
  height 1.8rem
  line-height 1.8rem

#fastLog-identify
  width 55%

#fastGet-identify
  width 45%
  line-height 1.5rem
  margin-top .2rem
  padding 0
  background-color #1a7ace
  border none
  transition all ease .3s
  &:active
    background-color #176ab3
</style>