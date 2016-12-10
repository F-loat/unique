<template lang="pug">
#tab4.tab
  .content
    header.bar.bar-nav
      h1.title 购物车
    .content
      transition(name="fade")
        #no-ware(v-if='!user.shopcar.length')
          span.icon.iconfont.icon-cart
          h4 购物车空空如也
      transition(name="fade")
          #shopcar-list.content(data-type='js')
            .content-inner
              transition-group(name="fade", tag="ul").order-list.list-block.media-list
                li(v-for='(ware, index) in user.shopcar', :data-shopcar-id='index', :key='index')
                  label.label-checkbox.item-content
                    .item-media
                      i.icon.icon-form-checkbox(:class="{'button-checked': ware.state}", @click='check')
                    .item-media
                      img(:src="'/upload/img/' + ware.info.img")
                    .item-inner
                      .item-title {{ware.info.nameEn}}
                      .item-subtitle {{ware.info.name}}
                      .item-subtitle 规格：{{ware.weight}}
                      .item-text.pull-left ￥{{ware.info.price[0].val *ware.weight *ware.sum}}
                      .pull-right(:data-shopcar-id='index')
                        span.icon.iconfont.icon-zititubiaojianshaofangxinglunkuo(@click='sumChange(+1,$event)')
                        |  {{ware.sum}}
                        span.icon.iconfont.icon-tianjia(@click='sumChange(-1,$event)')
  #buy-now(v-if='user.shopcar.length', transition='fade')
    .list-block.media-list.pull-left
      label.label-checkbox.item-content
        .item-media
          i.icon.icon-form-checkbox(:class="{'button-checked': isAll}", @click='checkAll')
        .item-inner
          .item-title.pull-left 全选
          .pull-right ￥ {{price}}
    .order(v-on:click='shopcarBuy') 购买
</template>

<script>
import $ from 'zepto'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'index-shopcar',
  computed: {
    ...mapGetters({
      user: 'getUserInfo',
      order: 'getOrderInfo'
    }),
    price () {
      var price = 0
      for (let ware of this.user.shopcar) {
        if (ware.state === 1) {
          price += ware.info.price[0].val * ware.weight * ware.sum
        }
      }
      return price.toFixed(2)
    },
    isAll () {
      for (let ware of this.user.shopcar) {
        if (ware.state === 0) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    ...mapActions([
      'orderInit'
    ]),
    sumChange (amphoteric, e) {
      var shopcarId = $(e.target).parent().data('shopcarId')
      this.user.shopcar[shopcarId].sum -= amphoteric
      if (this.user.shopcar[shopcarId].sum === 0) {
        $.confirm('删除该订单？',
          () => {
            this.syncShopcarSum(shopcarId)
            this.user.shopcar.splice(shopcarId, 1)
            setTimeout(function () { $('#shopcar-list').scroller('refresh') }, 300)
          },
          () => {
            this.user.shopcar[shopcarId].sum = 1
          }
        )
      } else {
        this.syncShopcarSum(shopcarId)
      }
    },
    syncShopcarSum (shopcarId) {
      $.ajax({
        type: 'post',
        url: '/request/ware/shopcar/sum',
        dataType: 'json',
        data: {
          wareId: this.user.shopcar[shopcarId]._id,
          sum: this.user.shopcar[shopcarId].sum
        },
        success: (data) => {
          if (data.state === 0) {
            $.toast('数据同步出错')
          }
        }
      })
    },
    check (e) {
      var shopcarId = $(e.target).parent().parent().parent().data('shopcarId')
      this.user.shopcar[shopcarId].state = this.user.shopcar[shopcarId].state === 1 ? 0 : 1
    },
    checkAll () {
      for (let ware of this.user.shopcar) {
        ware.state = ware.state === 1 ? 0 : 1
      }
    },
    shopcarBuy () {
      this.orderInit()
      for (let ware of this.user.shopcar) {
        if (ware.state === 1) {
          this.order.wares.push(ware)
        }
      }
      if (this.order.wares.length) {
        this.$router.push('/order')
      } else {
        return $.toast('请选择要购买的商品')
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../themes/'

/*购物车界面样式*/
#tab4
  & > .content
    bottom 2.5rem
    padding-bottom 2.5rem
  .content-inner
    padding-bottom 2.9rem

.order-list
  margin .4rem 0

#no-ware
  color mc
  text-align center
  margin-top 8rem
  span
    font-size 1.8rem
  h4
    margin 0
    font-weight normal

.button-checked
  border none !important
  background-color mc !important
  &:after
    position absolute !important
    top .2rem !important
    left .3rem !important
    width 100% !important
    height 100% !important
    box-shadow 0px 0px 4px 2px rgba(255, 255, 255, 0.3) !important
    background no-repeat center !important
    background-size .6rem .45rem !important
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20x%3D'0px'%20y%3D'0px'%20viewBox%3D'0%200%2012%209'%20xml%3Aspace%3D'preserve'%3E%3Cpolygon%20fill%3D'%23ffffff'%20points%3D'12%2C0.7%2011.3%2C0%203.9%2C7.4%200.7%2C4.2%200%2C4.9%203.9%2C8.8%203.9%2C8.8%203.9%2C8.8%20'%2F%3E%3C%2Fsvg%3E") !important

#buy-now
  width 100%
  height 2.5rem
  position absolute
  bottom 2.5rem
  left 0
  line-height 2.5rem
  .list-block
    margin 0
    width 70%
    background-color mc
    color fc_dark
    .item-inner
      &:after
        background-color fc_light
  .item-inner
    padding 0 .6rem 0 0
    box-sizing border-box
</style>