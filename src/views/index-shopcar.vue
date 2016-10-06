<template lang="pug">
#tab4.tab.view
  .content
    header.bar.bar-nav
      h1.title 购物车
    .content
      #no-ware(v-if='!user.shopcar.length', transition='fade')
        span.icon.icon-cart
        h4 购物车空空如也
      div(v-else='', transition='fade')
        header.bar.bar-nav.bar-sec
          span.col-50
            span.icon.icon-app
            |  方形蜡烛
            span.icon.icon-check
          span.col-50
            span.icon.icon-computer
            |  餐具套餐
            span.icon.icon-check
        #shopcar-list.content(data-type='js')
          .content-inner
            ul.order-list.list-block.media-list
              li(v-for='ware in user.shopcar', data-shopcar-id='{{$index}}', transition='fade')
                label.label-checkbox.item-content
                  .item-media
                    i.icon.icon-form-checkbox(v-bind:class="{'button-checked': ware.state}", v-on:click='check')
                  .item-media
                    img(v-bind:src='ware.info.img')
                  .item-inner
                    .item-title {{ware.info.nameEn}}
                    .item-subtitle {{ware.info.name}}
                    .item-subtitle 重量：{{ware.weight}}磅
                    .item-text.pull-left ￥{{ware.info.price*ware.sum*ware.weight}}
                    .pull-right(data-shopcar-id='{{$index}}')
                      span.icon.icon-down(v-on:click='sumChange(+1,$event)')
                      |  {{ware.sum}}
                      span.icon.icon-up(v-on:click='sumChange(-1,$event)')
  #buy-now(v-if='user.shopcar.length', transition='fade')
    .list-block.media-list.pull-left
      label.label-checkbox.item-content
        .item-media(v-on:click='checkAll')
          i.icon.icon-form-checkbox
        .item-inner
          .item-title.pull-left 全选
          .pull-right ￥198
    .order(v-on:click='shopcarBuy') 购买
</template>

<script>
</script>

<style lang="stylus">
/*购物车界面样式*/
#tab4
  & > .content
    bottom 2.5rem
    padding-bottom 2.5rem
  .bar-sec
    .col-50
      text-align center
      line-height 2.2rem
      color #222
      float left
      width 50%
    .icon
      color #fdfefe

#no-ware
  color #1c72c1
  text-align center
  margin-top 8rem
  span
    font-size 1.8rem
  h4
    margin 0
    font-weight normal

.button-checked
  border none !important
  background-color #1975c8 !important
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
    background-color #1a7ace
    color #222
    .item-inner
      &:after
        background-color #1a7ace
  .item-inner
    padding 0 .6rem 0 0
    box-sizing border-box
</style>