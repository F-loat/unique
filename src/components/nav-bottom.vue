<template lang="pug">
div.view
  keep-alive
    router-view
  nav.bar.bar-tab
    router-link.tab-item(to="/index")
      span.icon.icon-home
      span.tab-label 首页
    router-link.tab-item(to="/ware")
      span.icon.icon-gift
      span.tab-label 分类列表
    //- router-link.tab-item.tab-link(:to="{ path: '/picture' }")
    //-   span.icon.icon-picture
    //-   span.tab-label 照片蛋糕
    router-link.tab-item(to="/shopcar")
      span.icon.icon-cart
      span.tab-label 购物车
      transition(name="fade")
        span.badge(v-if="user.shopcar.length") {{user.shopcar.length}}
    router-link.tab-item(to="/person")
      span.icon.icon-me
      span.tab-label 我
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'nav-bottom',
  computed: {
    ...mapGetters({
      user: 'getUserInfo'
    })
  }
}
</script>

<style lang="stylus">
@import '../themes/'

/*底部导航颜色*/
nav.bar 
  background-color: bc_dark

.bar-tab .tab-item.router-link-active
  color: mc

.bar-tab .tab-item 
  color: bc_light

.bar-tab:before
  background-color: #444a5a
</style>