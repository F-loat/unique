<template lang="pug">
#tab2.tab
  header.buttons-tab
    a.button.tab-link.active(href='#mTab1') 甜点
    a.button.tab-link(href='#mTab2') 方形蛋糕
    a.button.tab-link(href='#mTab3') 圆形蛋糕
    a.button.tab-link(href='#mTab4') 鲜花
  .content
    .tabs
      #mTab1.tab.active
        #mousse-list.content
          .content-inner
            ul.clearfix#mousse_wrap
              li.ware-wrap(v-for='(ware, index) in wares.c', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  .ware-item(v-lazy:background-image.mousse_wrap="'/upload/img/' + ware.img")
                div(v-if="ware.stock !== 0")
                  .ware-stock 库存：{{ware.stock}}个
                  .ware-detail
                    div
                      h5.webFont {{ware.nameEn}}
                      p {{ware.name}}
                    .ware-buy
                      span.icon.iconfont.icon-cart.pull-right
                      p(style="opacity: .6") ￥{{ware.price[0].val}}
                .ware-stock-none(v-else) 已售罄
      #mTab2.tab
        #cake-f-list.content
          .content-inner
            ul.clearfix#cakef_wrap
              li.ware-wrap(v-for='(ware, index) in wares.a', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  .ware-item(v-lazy:background-image.cakef_wrap="'/upload/img/' + ware.img")
                .ware-detail
                  div
                    h5.webFont {{ware.nameEn}}
                    p {{ware.name}}
                  .ware-buy
                    span.icon.iconfont.icon-cart.pull-right
                    p(style="opacity: .6") ￥{{ware.price[0].val}}
      #mTab3.tab
        #cake-y-list.content
          .content-inner
            ul.clearfix#cakey_wrap
              li.ware-wrap(v-for='(ware, index) in wares.b', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  .ware-item(v-lazy:background-image.cakey_wrap="'/upload/img/' + ware.img")
                .ware-detail
                  div
                    h5.webFont {{ware.nameEn}}
                    p {{ware.name}}
                  .ware-buy
                    span.icon.iconfont.icon-cart.pull-right
                    p(style="opacity: .6") ￥{{ware.price[0].val}}
      #mTab4.tab
        #flower-list.content
          .content-inner
            ul.clearfix#flower_wrap
              li.ware-wrap(v-for='(ware, index) in wares.d', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  .ware-item(v-lazy:background-image.flower_wrap="'/upload/img/' + ware.img")
                .ware-detail
                  div
                    h5.webFont {{ware.nameEn}}
                    p {{ware.name}}
                  .ware-buy
                    span.icon.iconfont.icon-cart.pull-right
                    p(style="opacity: .6") ￥{{ware.price[0].val}}
</template>

<script>
import $ from 'zepto'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'index-ware',
  computed: {
    ...mapGetters({
      wares: 'getWaresInfo'
    })
  },
  methods: {
    ...mapActions([
      'waresInfo'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      $.init()
      this.waresInfo()
    })
  }
}
</script>

<style lang="stylus">
@import '../themes/'

@keyframes fadeIn
  from
    opacity 0
  to
    opacity 1
    
@-webkit-keyframes fadeIn
  from
    opacity 0
  to
    opacity 1

.ware-item[lazy=loaded]
  animation-duration 1s
  animation-fill-mode both
  animation-name fadeIn
  -webkit-animation-duration 1s
  -webkit-animation-fill-mode both
  -webkit-animation-name fadeIn

/*分类蛋糕页面*/
#tab2
  & > .content
    bottom 2.5rem
  header
    & ~ .content
      top 2rem
  .buttons-tab
    .button
      border-bottom 3px solid transparent
      &.active
        border-color #5cecec
  .webFont
    font-weight bold

#tab2 .buttons-tab .button
  color rgba(255, 255, 255, .5)
  background-color mc
#tab2 .buttons-tab .button.active
  color #fff
  background-color mc

.ware-wrap
  float left
  width 38%
  margin 3% 0 3% 8%
  box-sizing border-box
  position relative
  & > a
    display block
    & > div
      width 100%
      box-shadow 0px 0px 6px 1px rgba(0, 0, 0, 0.2)
      padding-bottom 100%
      background-size cover
      background-position center center
      & > img
        height 38vw

.ware-stock
  position absolute
  top 0
  right 0
  font-size .65rem
  background-color rgba(255, 255, 255, .4)
  padding 2px 4px

.ware-stock-none
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  color #fff
  text-align center
  font-size 1rem
  background-color rgba(0, 0, 0, .4)

.ware-detail
  background-color rgba(32,32,32,0.45)
  position absolute
  bottom 0
  left 0
  right 0
  color fc_light
  padding 0.2rem
  & > div
    max-width 66%
  h5
    margin 0
    font-size 0.6rem
    line-height 1.6
    color #fff
  p
    margin 0
    font-size 0.5rem
    line-height 1.3
    font-weight bold
    color #fff
  span
    font-size 0.8rem
    line-height 1.3
    margin-right 0.3rem

.ware-buy
  position absolute
  right 0.2rem
  top 10%
</style>