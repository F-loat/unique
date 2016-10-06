<template lang="pug">
#wareDetail.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(v-link="{ path: '/ware' }")
    h1.title {{ware.info.name}}
  .content
    .content-inner
      .detail-img
        img(v-bind:src='ware.info.img')
        h5 {{ware.info.name}}
        h6.webFont {{ware.info.nameEn}}
        p.bewrite /独一无二的蛋糕/
        p.bewrite /献给独一无二 的你/
      .detail-dishes(v-if='ware.info.type==9')
        h6 请选择口味
        div
          .dishTab(v-on:click='dishChange', v-bind:class="{'active': ware.dish==='奶油'}") 奶油
          .dishTab(v-on:click='dishChange', v-bind:class="{'active': ware.dish==='抹茶'}") 抹茶
          .dishTab(v-on:click='dishChange', v-bind:class="{'active': ware.dish==='巧克力'}") 巧克力
      .detail-weight
        h6 请选择重量
        div
          .weightTab(v-on:click='weightChange', v-bind:class="{'active': ware.weight===1}") 1.0磅
          .weightTab(v-on:click='weightChange', v-bind:class="{'active': ware.weight===1.5}") 1.5磅
          .weightTab(v-on:click='weightChange', v-bind:class="{'active': ware.weight===2}") 2.0磅
          .weightTab(v-on:click='weightChange', v-bind:class="{'active': ware.weight===2.5}") 2.5磅
      .detail-detail
        div
          span.icon.icon-friends
          | 14*14cm
        div
          span.icon.icon-friends
          | 适合7~8人分享
        div
          span.icon.icon-friends
          | 含10套餐具
        div
          span.icon.icon-friends
          | 需提前8小时预定
      .detail-notice
        h5 保鲜条件
        p 0-4℃保藏12小时，5℃时使用最佳。
        p 蛋糕在收到后2-3小时内食用最佳。
        h5 配送说明
        p 暂且只限天津地区配送服务
      .detail-phone
        | 客服电话 15822922123
  #detail-handle
    #detail-price ￥{{ware.info.price}}/磅
    #detail-shopcar(v-on:click='addToShopcar') 加入购物车
    #detail-buy
      a(v-on:click='promptBuy') 立即购买
</template>

<script>
import $ from 'zepto'
import { wareInfo, wareInit } from '../vuex/actions'
import { getWareInfo } from '../vuex/getters'

export default {
  attached () {
    this.wareInit()
    this.wareInfo(this.$route.params.wareId)
  },
  vuex: {
    actions: {
      wareInfo,
      wareInit
    },
    getters: {
      ware: getWareInfo
    }
  },
  methods: {
    dishChange (e) {
      this.ware.dish = $(e.target).text()
    },
    weightChange (e) {
      this.ware.weight = parseFloat($(e.target).text().slice(0, 3))
    },
    addToShopcar () {
      console.log('shopcar')
    },
    promptBuy () {
      this.$route.router.go('/order/' + this.$route.params.wareId)
    }
  }
}
</script>

<style lang="stylus">
#wareDetail
  & > .content
    background-color #dbe0e4
    bottom 2.5rem
  .active
    background-color #1676ca

#wareDetail h5,
#wareDetail h6,
#wareDetail p
  margin-top 0
  margin-bottom 0

.detail-img
  background-color #fff
  margin 0 1.6rem
  padding-bottom 2%
  & > h6,h5,img,p
    width 12rem
    margin 0 auto
    display block
  & > img
    height 12rem
  & > h6
    margin-bottom .4rem
  & > p
    font-size .65rem

.detail-dishes,
.detail-weight
  margin .4rem 1.6rem

.detail-dishes>div,
.detail-weight>div
  font-size 0
  border-right 1px #ccc solid

.dishTab,
.weightTab
  display inline-block
  border 1px #ccc solid
  border-right none
  font-size .85rem
  text-align center
  background-color #fff
  line-height 1.4rem

.dishTab
  width 33.33%

.weightTab
  width 25%

.detail-detail
  padding 0 2.4rem .4rem
  font-size 0
  border-bottom 1px #ccc solid
  & > div
    display inline-block
    width 50%
    font-size .75rem

.detail-notice
  margin 0 2.4rem 2.2rem
  & > h5
    margin-top .4rem !important
  & > p
    font-size .75rem

.detail-phone
  width 100%
  text-align center
  font-size .65rem

#detail-handle
  width 100%
  height 2.5rem
  position absolute
  bottom 0rem
  left 0
  line-height 2.5rem
  text-align center
  font-size 0
  & > div
    display inline-block
    font-size .85rem

#detail-price
  width 40%
  background-color #1a7ace
  color #222

#detail-shopcar
  width 30%
  background-color #f7fbfe

#detail-buy
  width 30%
  background-color #dfba74
  a
    color #222
</style>