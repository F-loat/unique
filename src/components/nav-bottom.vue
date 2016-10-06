<template lang="pug">
div
  router-view(keep-alive transition="fade")
  nav.bar.bar-tab
    .tab-item.tab-link(v-link="{ path: '/index' }")
      span.icon.icon-home
      span.tab-label 首页
    .tab-item.tab-link(v-link="{ path: '/ware' }")
      span.icon.icon-gift
      span.tab-label 分类列表
    //- .tab-item.tab-link(v-link="{ path: '/picture' }")
    //-   span.icon.icon-picture
    //-   span.tab-label 照片蛋糕
    .tab-item.tab-link(v-link="{ path: '/shopcar' }")
      span.icon.icon-cart
      span.tab-label 购物车
    .tab-item.tab-link(v-link="{ path: '/person' }")
      span.icon.icon-me
      span.tab-label 我
</template>

<style lang="stylus">
/*底部导航颜色*/
nav.bar 
  background-color: #444a5a

.bar-tab .tab-item.v-link-active
  color: #1777cb

.bar-tab .tab-item 
  color: #fdfefe

.bar-tab:before
  background-color: #444a5a
</style>