<template>
  <div>
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
    <tabbar>
      <tabbar-item selected>
        <span slot="icon" class="iconfont icon-zhuye"></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="icon" class="iconfont icon-shangcheng"></span>
        <span slot="label">分类列表</span>
      </tabbar-item>
      <tabbar-item link="/component/demo" :badge="null">
        <span slot="icon" class="iconfont icon-cart"></span>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="icon" class="iconfont icon-icon_gerenzhongxin"></span>
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';

export default {
  name: 'nav-bottom',
  components: {
    Tabbar,
    TabbarItem,
  },
  mounted() {
  },
  computed: {
  },
};
</script>

<style lang="less">
/*底部导航颜色*/
div.weui_tabbar {
  background-color: #444a5a;
  .weui_tabbar_item {
    color: rgba(255, 255, 255, .35);
    transition: color .5s;
  }
  .weui_tabbar_icon {
    text-align: center;
    .iconfont {
      font-size: 1.2rem;
    }
  }
  .weui_tabbar_label {
    font-size: 0.45rem;
  }
  .weui_bar_item_on, .weui_bar_item_on .weui_tabbar_label {
    color: #fff;
  }
}
</style>