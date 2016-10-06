<template lang="pug">
transition(name="fade")
  keep-alive
    router-view
</template>

<script>
import $ from 'zepto'
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted () {
    this.$nextTick(function () {
      this.waresInfo()
      var ua = navigator.userAgent.toLowerCase()
      var isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin && this.$route.query.state === 'wxoauth') {
        this.wxoauth(this.$route.query.code)
      } else {
        this.userInfo()
      }
    })
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  },
  methods: {
    ...mapActions([
      'userInfo',
      'waresInfo'
    ]),
    wxoauth (code) {
      $.ajax({
        type: 'get',
        url: '/request/user/wxoauth?code=' + code,
        success: (data) => {
          if (data.state === 1) {
            this.userInfo()
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus">
main-color = red

/*主体背景色*/
#index
  & > .content
    background-color #fdfefe
    
/*大尺寸屏幕界面优化*/
@media screen and (min-width: 614px)
  .view>.content,.view>header
    box-shadow 0px 0px 10px 1px rgba(0, 0, 0, 0.3)
    width 24rem
    margin 0 auto

@media screen and (min-width: 614px)
  .ware-wrap
    width 26% !important
    margin 3% 0 3% 5% !important
  #Tel
    width 24rem !important
  .row
    margin-left 0 !important
  #tab3
    .row
      width 98% !important

/*动画样式*/
.fade-enter-active, .fade-leave-active
  transition opacity .2s linear
  opacity 1

.fade-enter, .fade-leave-active
  opacity 0
  
/*通用样式*/
ul,
li
  list-style none
  margin 0
  padding 0

.bar-sec
  margin-top 0.4rem
  background-color #1a7ace
  & ~ .content
    top 3rem

header
  &.bar
    background-color #1a7ace

header.bar .title,header .icon
  color #fdfefe !important

.dark-blue,.modal-button
  color #1975c8 !important

@font-face
  font-family 'webFont'
  src url('./assets/fonts/webFont.eot')
  src url('./assets/fonts/webFont.eot?#iefix') format('embedded-opentype'),
            url('./assets/fonts/webFont.woff') format('woff'),
            url('./assets/fonts/webFont.ttf') format('truetype'), 
            url('./assets/fonts/webFont.svg') format('svg'),
            url('./assets/fonts/webFont.otf') format('otf')
  font-weight normal
  font-style normal

.webFont
  font-family 'webFont'

.icon-form-checkbox
  background-color #fdfefe !important
  border-radius 0 !important
  width 0.9rem !important
  height 0.9rem !important

html:not(.watch-active-state) label.label-checkbox:active, label.label-checkbox.active-state
  background-color #176ab3

label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox:after, label.label-checkbox input[type=radio]:checked+.item-media i.icon-form-checkbox:after
  position absolute
  top .2rem
  left .3rem
  width 100%
  height 100%
  box-shadow 0px 0px 4px 2px rgba(255, 255, 255, 0.3)
  background-color #1975c8

.order-list
  margin 0
  & > li
    background-color #1975c8
  img
    width 6rem
    margin-left .75rem
  .item-inner
    color #222
    .pull-right
      line-height 2.1rem
    span
      color #fdfefe
      margin 0 .3rem
  .item-text
    line-height 2.1rem
    color #222

.order
  background-color #dfba76
  text-align center
  width 30%
  float left
</style>