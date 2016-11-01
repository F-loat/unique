<template lang="pug">
#fedBack.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    h1.title 用户反馈
  .content
    .item-content
      .item-inner
        .item-input
          textarea(placeholder='请留下您对商品货品或平台的建议或意见，我们会努力改进')
    #fed-submit
      p
        a 提交
</template>

<script>
export default {
  name: 'fed-back'
}
</script>

<style lang="stylus">
@import '../themes/'

.content
  background-color bc_light

.content-block
  margin 0
  padding 0
  margin 0
  padding 0
  margin 0
  padding 0

.item-input
  textarea
    width 90%
    height 8rem
    margin 1rem 5% 0 5%
    background-color bc_light
    border none
    box-shadow none
    transition all ease .3s
    &:focus
      box-shadow 0px 0px 10px 1px rgba(0, 0, 0, 0.2)
#fed-submit
  text-align center
  a
    display block
    width 4.8rem
    height 2.4rem
    background-color mc
    color fc_dark
    line-height 2.4rem
    margin 0 auto
</style>