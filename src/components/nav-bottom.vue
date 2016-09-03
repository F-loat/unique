<template lang="pug">
nav.bar.bar-tab
  a.tab-item.tab-link.active(href='#tab1')
    span.icon.icon-home
    span.tab-label 首页
  a.tab-item.tab-link(href='#tab2')
    span.icon.icon-gift
    span.tab-label 分类列表
  a.tab-item.tab-link(href='#tab3')
    span.icon.icon-picture
    span.tab-label 照片蛋糕
  a.tab-item.tab-link(href='#tab4')
    span.icon.icon-cart
    span.tab-label 购物车
  a.tab-item.tab-link(href='#tab5')
    span.icon.icon-me
    span.tab-label 我
</template>

<script>
</script>

<style lang="stylus">
nav.bar 
  background-color: #444a5a

.bar-tab .tab-item.active,
.bar-tab .tab-item:active
  color: #1777cb

.bar-tab .tab-item 
  color: #fdfefe

.bar-tab:before
  background-color: #444a5a
</style>