<template lang="pug">
#tab2.tab
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
            transition-group.clearfix(
              name="fade",
              tag="ul",
              @before-enter="beforeEnter",
              @enter="enter",
              @leave="leave")
              li.ware-wrap(v-for='(ware, index) in wares.c', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  div
                    img(v-bind:src='ware.img')
                .ware-detail
                  div
                    h5 {{ware.name}}
                    p.webFont {{ware.nameEn}}
                  .ware-buy
                    span.icon.icon-cart.pull-right
                    p ￥{{ware.price}}/磅
      #mTab2.tab.active
        #cake-f-list.content
          .content-inner
            transition-group.clearfix(
              name="fade",
              tag="ul",
              @before-enter="beforeEnter",
              @enter="enter",
              @leave="leave")
              li.ware-wrap(v-for='(ware, index) in wares.a', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  div
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
            transition-group.clearfix(
              name="fade",
              tag="ul",
              @before-enter="beforeEnter",
              @enter="enter",
              @leave="leave")
              li.ware-wrap(v-for='(ware, index) in wares.b', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  div
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
            transition-group.clearfix(
              name="fade",
              tag="ul",
              @before-enter="beforeEnter",
              @enter="enter",
              @leave="leave")
              li.ware-wrap(v-for='(ware, index) in wares.d', :key='ware._id', :data-index='index')
                router-link(:to="'/ware/' + ware._id", :data-id='index')
                  div
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
    ]),
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      setTimeout(function () {
        el.style.opacity = 1
      }, el.dataset.index * 100)
    },
    leave (el, done) {
      setTimeout(function () {
        el.style.opacity = 0
        el.remove()
      }, el.dataset.index * 100)
    }
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
  color fc_light
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
      box-shadow 0px 0px 16px 1px rgba(0, 0, 0, 0.2)
      font-size 0
      padding-bottom 100%
      overflow hidden
      & > img
        width 100%
        position absolute

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