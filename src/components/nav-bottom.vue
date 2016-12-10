<template lang="pug">
div.view
  keep-alive
    router-view
  nav.bar.bar-tab
    router-link.tab-item(to="/index", replace)
      span.icon.iconfont.icon-zhuye
      span.tab-label 首页
    router-link.tab-item(to="/ware", replace)
      span.icon.iconfont.icon-shangcheng
      span.tab-label 分类列表
    //- router-link.tab-item(to="/picture", replace)
    //-   span.icon.icon-picture
    //-   span.tab-label 照片蛋糕
    router-link.tab-item(to="/shopcar", replace)
      span.icon.iconfont.icon-cart
      span.tab-label 购物车
      transition(name="fade")
        span.badge(v-if="user.shopcar.length") {{user.shopcar.length}}
    router-link.tab-item(to="/person", replace)
      span.icon.iconfont.icon-icon_gerenzhongxin
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
  color #fff

.bar-tab .tab-item
  color rgba(255, 255, 255, .35)
  transition color .5s

.bar-tab:before
  background-color: #444a5a
  
.bar-tab .tab-item .icon~.tab-label
  font-size 0.45rem
  
.bar-tab .tab-item .icon
  line-height 1.1rem
</style>