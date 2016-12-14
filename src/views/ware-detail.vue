<template lang="pug">
#wareDetail.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/ware")
    h1.title {{ware.info.name}}
  .content
    .content-inner
      .swiper-container
        .swiper-wrapper
          //- .swiper-slide(v-for="img in ware.info.imgs", :key="img")
          //-   img.detail-img(:src="'/upload/img/' + img")
          .swiper-slide
            img.detail-img(:src="ware.info.imgs[0] ? '/upload/img/' + ware.info.imgs[0] : null")
      .detail-content
        h5.webFont {{ware.info.nameEn}}
        h6 {{ware.info.name}}
        p(v-for="depc in ware.info.depiction.split('/')").bewrite {{depc}}
      //- .detail-dishes(v-if='ware.info.type==9')
      //-   .dishTab(v-on:click='dishChange', :class="{'active': ware.dish==='奶油'}") 奶油
      //-   .dishTab(v-on:click='dishChange', :class="{'active': ware.dish==='抹茶'}") 抹茶
      //-   .dishTab(v-on:click='dishChange', :class="{'active': ware.dish==='巧克力'}") 巧克力
      .detail-weight(v-if="ware.info.type === 0 || ware.info.type === 1")
        .weightTab(v-on:click='weightChange', style="margin-right: 4%", :class="{'active': ware.weight===1}") 1.0磅
        .weightTab(v-on:click='weightChange', style="margin-right: 4%", :class="{'active': ware.weight===1.5}") 1.5磅
        .weightTab(v-on:click='weightChange', style="margin-right: 4%", :class="{'active': ware.weight===2}") 2.0磅
        .weightTab(v-on:click='weightChange', :class="{'active': ware.weight===2.5}") 2.5磅
      .detail-weight(v-if="ware.info.type === 2")
        .weightTab.active(style="width: 100%") 1份
      .detail-weight(v-if="ware.info.type === 3")
        .weightTab.active(style="width: 100%") 1束
      .detail-detail(v-if="ware.info.type === 0 || ware.info.type === 1")
        .size(:class="{'fsize': ware.info.type === 0, 'ysize': ware.info.type === 1}")
        div
          span.icon.iconfont.icon-chicun(v-if="ware.weight===1") 14*14cm
          span.icon.iconfont.icon-chicun(v-if="ware.weight===1.5") 16*16cm
          span.icon.iconfont.icon-chicun(v-if="ware.weight===2") 18*18cm
          span.icon.iconfont.icon-chicun(v-if="ware.weight===2.5") 20*20cm
        div
          span.icon.iconfont.icon-chidouren2(v-if="ware.weight===1") 适合1~2人分享
          span.icon.iconfont.icon-chidouren2(v-if="ware.weight===1.5") 适合2~3人分享
          span.icon.iconfont.icon-chidouren2(v-if="ware.weight===2") 适合3~4人分享
          span.icon.iconfont.icon-chidouren2(v-if="ware.weight===2.5") 适合5~6人分享
        div
          span.icon.iconfont.icon-canju(v-if="ware.weight===1") 含2套餐具
          span.icon.iconfont.icon-canju(v-if="ware.weight===1.5") 含3套餐具
          span.icon.iconfont.icon-canju(v-if="ware.weight===2") 含4套餐具
          span.icon.iconfont.icon-canju(v-if="ware.weight===2.5") 含6套餐具
        div
          span.icon.iconfont.icon-shijian 提前12小时预定
      .detail-notice
        div(v-if="ware.info.type === 0 || ware.info.type === 1 || ware.info.type === 2")
          h5
            span.icon.iconfont.icon-zhuyi2 注意事项
          p 1、对本蛋糕食材过敏者，请您选择其他款蛋糕；
          p 2、订购5磅以上蛋糕，请与客服人员联系，订购电话：15822922123
        div(v-if="ware.info.type === 3")
          h5
            span.icon.iconfont.icon-zhuyi2 养护说明
          p 1、请您打开包装后，小心地将花取出，并放入装有适量清水的花瓶中；
          p 2、每日或隔日更换一次水，防止根茎长期浸泡造成的腐烂
        h5
          span.icon.iconfont.icon-banjiapeisong
          | 配送说明
        p 目前只开通天津商业大学线上订购配送服务，超出范围暂不配送，请谅解。
    #detail-handle
      #detail-price ￥{{ware.info.price[0].val * ware.weight * ware.sum}}
      #detail-shopcar(v-on:click='addToShopcar') 加入购物车
      #detail-buy
        a(v-on:click='promptBuy') 立即购买
</template>

<script>
import $ from 'zepto'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ware-detail',
  mounted () {
    $.showPreloader()
    this.wareInit()
    this.wareInfo(this.$route.params.wareId)
    setTimeout(() => $('.swiper-container').swiper({
      autoplay: '3000',
      loop: false
    }), 300)
  },
  computed: {
    ...mapGetters({
      ware: 'getWareInfo',
      user: 'getUserInfo'
    })
  },
  methods: {
    ...mapActions([
      'wareInfo',
      'wareInit'
    ]),
    dishChange (e) {
      this.ware.dish = $(e.target).text()
    },
    weightChange (e) {
      var weight = parseFloat($(e.target).text().slice(0, 3))
      this.ware.weight = weight
      if (weight === 1) return $('.size').css('background-size', '80%')
      if (weight === 1.5) return $('.size').css('background-size', '90%')
      if (weight === 2) return $('.size').css('background-size', '100%')
      if (weight === 2.5) return $('.size').css('background-size', '110%')
    },
    addToShopcar () {
      if (this.user.nickname) {
        if (this.ware.info._id || this.ware.dish) {
          var ware = {
            weight: this.ware.weight
          }
          if (this.ware.info.type === 9) {
            ware.img = this.ware.info.img
            ware.dish = this.ware.dish
          } else {
            ware.wareId = this.ware.info._id
          }
          $.ajax({
            type: 'post',
            url: '/request/ware/shopcar/add ',
            dataType: 'json',
            data: {
              ware: JSON.stringify(ware)
            },
            success: (data) => {
              if (data.state === 1) {
                this.user.shopcar = data.shopcar
                $.toast('商品已添加至购物车')
              } else {
                $.toast('数据同步出错')
              }
            }
          })
        } else {
          $.toast('请重新进入该界面')
        }
      } else {
        $.toast('请先登录')
      }
    },
    promptBuy () {
      this.$router.push('/order/' + this.$route.params.wareId)
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

#wareDetail
  & > .content
    background-color #dbe0e4
    padding-bottom 2.5rem

#wareDetail h5,
#wareDetail h6,
#wareDetail p
  margin-top 0
  margin-bottom 0

.detail-img
  width 100%
  object-fit cover
  
.swiper-container
  min-height 12rem
  padding 0

.detail-content
  margin .6rem 1.5rem
  & > h5
    font-size 1.3rem
  & > h6
    font-size .65rem
    font-weight bold
    margin-bottom .4rem
  & > p
    font-size .65rem
    opacity .7

.detail-dishes,
.detail-weight
  margin .4rem 1.5rem

.detail-dishes,
.detail-weight
  font-size 0
  border-right 1px #ccc solid

.dishTab,
.weightTab
  font-size .65rem
  text-align center
  background-color rgba(255, 255, 255, .5)
  line-height 1.6rem
  color rgba(0, 0, 0, .3)
  transition background-color .3s

.dishTab
  width 33.33%

.weightTab
  width 22%
  box-sizing border-box
  position relative
  display inline-block

.weightTab.active
  background-color #fff
  border 1px solid #996600
  color #996600

.weightTab.active::before
  content ''
  width 0
  height 0
  border-width 6px
  border-style solid
  border-color #996600 transparent transparent #996600
  position absolute
  left 0
  top 0

.detail-detail
  padding 1rem 2rem
  font-size 0
  border-bottom 1px #ccc solid
  background-color #f9f9f9
  margin 1rem auto
  & > div
    display inline-block
    width 50%
    font-size .65rem
  .size
    background center center no-repeat
    width 100%
    min-height 6rem
    background-size 80%
    margin-bottom .4rem
    transition background-size 0.3s ease
  .fsize
    background-image url('../assets/img/fsize.jpg')
  .ysize
    background-image url('../assets/img/ysize.jpg')

.detail-notice
  margin 0 2.4rem 2.2rem
  h5
    margin-top 1.6rem !important
    margin-bottom .6rem !important
    font-size .7rem
    span
      padding-right .2rem
  p
    font-size .65rem

#detail-handle
  width 100%
  height 2.5rem
  position fixed
  bottom 0rem
  line-height 2.5rem
  text-align center
  font-size 0
  & > div
    display inline-block
    font-size .85rem

@media screen and (min-width: 614px)
  #detail-handle
    width 24rem
    margin 0 auto

#detail-price
  width 40%
  background-color mc
  color #fff
  font-weight bold

#detail-shopcar
  width 30%
  background-color bc_light
  font-size .8rem !important

#detail-buy
  width 30%
  background-color bc_confirm
  font-size .8rem !important
  a
    color fc_dark
</style>