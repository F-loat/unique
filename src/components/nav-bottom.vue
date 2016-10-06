<template lang="pug">
div
  transition(name="fade")
    keep-alive
      router-view
  nav.bar.bar-tab
    router-link.tab-item(:to="{ path: '/index' }")
      span.icon.icon-home
      span.tab-label 首页
    router-link.tab-item(:to="{ path: '/ware' }")
      span.icon.icon-gift
      span.tab-label 分类列表
    //- router-link.tab-item.tab-link(:to="{ path: '/picture' }")
    //-   span.icon.icon-picture
    //-   span.tab-label 照片蛋糕
    router-link.tab-item(:to="{ path: '/shopcar' }")
      span.icon.icon-cart
      span.tab-label 购物车
    router-link.tab-item(:to="{ path: '/person' }")
      span.icon.icon-me
      span.tab-label 我
</template>

<style lang="stylus">
/*底部导航颜色*/
nav.bar 
  background-color: #444a5a

.bar-tab .tab-item.router-link-active
  color: #1777cb

.bar-tab .tab-item 
  color: #fdfefe

.bar-tab:before
  background-color: #444a5a
</style>