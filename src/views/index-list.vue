<template lang="pug">
#tab2.tab.view
  .content
    header.buttons-tab
      a.button.tab-link(href='#mTab1') 甜点
      a.button.tab-link.active(href='#mTab2') 方形蛋糕
      a.button.tab-link(href='#mTab3') 圆形蛋糕
      a.button.tab-link(href='#mTab4') 鲜花
    .content
      .tabs
        #mTab1.tab
          #mousse-list.content
            .content-inner
              ul.clearfix
                li.ware-wrap(v-for='(ware, index) in wares.a')
                  router-link(:to="{ path: '/ware/' + ware._id }", :data-id='index')
                    img(v-bind:src='ware.img')
                  .ware-detail
                    div
                      h5 {{ware.name}}
                      p.webFont {{ware.nameEn}}
                    .ware-buy
                      span.icon.icon-cart.pull-right
                      p ￥{{ware.price}}/磅
        #mTab2.tab.active
          #cake-f-list.content(data-type='js')
            .content-inner
              ul.clearfix
                li.ware-wrap(v-for='(ware, index) in wares.b')
                  router-link(:to="{ path: '/ware/' + ware._id }", :data-id='index')
                    img(v-bind:src='ware.img')
                  .ware-detail
                    div
                      h5 {{ware.name}}
                      p.webFont {{ware.nameEn}}
                    .ware-buy
                      span.icon.icon-cart.pull-right
                      p ￥{{ware.price}}/磅
        #mTab3.tab
          #cake-y-list.content
            .content-inner
              ul.clearfix
                li.ware-wrap(v-for='(ware, index) in wares.c')
                  router-link(:to="{ path: '/ware/' + ware._id }", :data-id='index')
                    img(v-bind:src='ware.img')
                  .ware-detail
                    div
                      h5 {{ware.name}}
                      p.webFont {{ware.nameEn}}
                    .ware-buy
                      span.icon.icon-cart.pull-right
                      p ￥{{ware.price}}/磅
        #mTab4.tab
          #flower-list.content
            .content-inner
              ul.clearfix
                li.ware-wrap(v-for='(ware, index) in wares.d')
                  router-link(:to="{ path: '/ware/' + ware._id }", :data-id='index')
                    img(v-bind:src='ware.img')
                  .ware-detail
                    div
                      h5 {{ware.name}}
                      p.webFont {{ware.nameEn}}
                    .ware-buy
                      span.icon.icon-cart.pull-right
                      p ￥{{ware.price}}/磅
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      wares: 'getWaresInfo'
    })
  }
}
</script>

<style lang="stylus">
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

#tab2 .buttons-tab .button,
#tab2 .buttons-tab .button.active
  color #f7f7f7
  background-color #1777cb

.ware-wrap
  float left
  width 38%
  margin 3% 0 3% 8%
  box-sizing border-box
  position relative
  & > a
    display block
    & > img
      width 100%
      box-shadow 0px 0px 16px 1px rgba(0, 0, 0, 0.2)

.ware-detail
  background-color rgba(32,32,32,0.45)
  position absolute
  bottom 0.36rem
  left 0
  right 0
  color #fff
  padding 0.2rem
  & > div
    max-width 66%
  h5
    margin 0
    font-size 0.6rem
    line-height 1.6
  p
    margin 0
    font-size 0.5rem
    line-height 1.3
  span
    font-size 0.8rem
    line-height 1.3
    margin-right 0.5rem

.ware-buy
  position absolute
  right 0.2rem
  top 10%
</style>