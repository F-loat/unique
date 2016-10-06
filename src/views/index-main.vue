<template lang="pug">
#tab1.tab.view
  .content.webFont
    router-link#tab1-turn1(:to="{ path: '/ware' }")
      span 鲜花
    router-link#tab1-turn2(:to="{ path: '/ware' }")
      span 定制
    router-link#tab1-turn3(:to="{ path: '/ware' }")
      span 甜点
    router-link#tab1-turn4(:to="{ path: '/ware' }")
      span 蛋糕
</template>

<style lang="stylus">
/*主页面*/
#tab1
  & > .content
    background url("../assets/img/hBg.jpg") no-repeat top center
    background-size contain
    bottom 2.5rem
  a
    color #2d2d2d
    display block
    width 3.4rem
    height 5rem
    padding 1rem 1rem
    margin 0
    position absolute
    transform skew(139deg)
    span
      font-size 1rem
      transform skew(41deg)
      display block

#tab1-turn1
  background-color rgba(178,235,173,0.67)
  bottom 7rem
  left 12rem

#tab1-turn2
  background-color rgba(173,235,235,0.67)
  bottom 4rem
  left 7.4rem

#tab1-turn3
  background-color rgba(239,168,146,0.67)
  bottom 2.5rem
  left 8.8rem

#tab1-turn4
  background-color rgba(25,117,200,0.67)
  bottom 0
  left 3.6rem
</style>