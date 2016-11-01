<template lang="pug">
transition(name="fade")
  keep-alive
    router-view
</template>

<script>
import $ from 'zepto'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'userInfo',
      'waresInfo'
    ]),
    tryAuth () {
      setTimeout(() => {
        if (this.$route.fullPath !== '/') {
          $.ajax({
            type: 'get',
            url: '/request/user/wxoauth?code=' + this.$route.query.code,
            success: (data) => {
              if (data.turnUrl) return (window.location.href = data.turnUrl)
              if (data.state === 1) this.userInfo()
            }
          })
        } else {
          this.tryAuth()
        }
      }, 300)
    }
  },
  mounted () {
    this.$nextTick(() => {
      var ua = navigator.userAgent.toLowerCase()
      var isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin) this.tryAuth()
    })
  }
}
</script>

<style lang="stylus">
@import './themes/'

/*主体背景色*/
.page, .page-group
  background bc_light
#index > .content
  background-color bc_light
    
/*大尺寸屏幕界面优化*/
@media screen and (min-width: 614px)
  .view > .content, .view > header, .view > .tab
    box-shadow 0px 0px 10px 1px rgba(0, 0, 0, 0.3)
    width 24rem
    margin 0 auto
  .view > .tab
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    overflow auto

@media screen and (min-width: 614px)
  .ware-wrap
    width 26%
    margin 3% 0 3% 5%
  #Tel
    width 24rem
  .row
    margin-left 0
  #tab3
    .row
      width 98%

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
  background-color mc
  & ~ .content
    top 3rem

header
  &.bar
    background-color mc

header.bar .title,header .icon
  color bc_light

.dark-blue,.modal-button
  color bc_dark

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

div.item-media i.icon-form-checkbox
  background-color bc_light
  border-radius 0
  width 0.9rem
  height 0.9rem

html:not(.watch-active-state) label.label-checkbox:active, label.label-checkbox.active-state
  background-color mc

label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox:after, label.label-checkbox input[type=radio]:checked+.item-media i.icon-form-checkbox:after
  position absolute
  top .2rem
  left .3rem
  width 100%
  height 100%
  box-shadow 0px 0px 4px 2px rgba(255, 255, 255, 0.3)
  background-color mc

.order-list
  margin 0
  & > li
    background-color mc
  img
    width 6rem
    margin-left .75rem
  .item-inner
    color fc_dark
    .pull-right
      line-height 2.1rem
    span
      color bc_light
      margin 0 .3rem
  .item-text
    line-height 2.1rem
    color fc_dark

.order
  background-color bc_confirm
  text-align center
  width 30%
  float left
  
.buttons-tab .button.active
  color mc
  border-color mc

.bar-tab .tab-item.active, .bar-tab .tab-item:active
  color mc
</style>