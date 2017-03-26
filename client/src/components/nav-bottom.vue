<template>
  <div class="main-tabbar">
    <div class="tabbar-content">
      <keep-alive>
        <router-view name="alive"></router-view>
      </keep-alive>
    </div>
    <tabbar>
      <tabbar-item @on-item-click="handleClick('/index')" :selected="$route.path === '/index'">
        <span slot="icon" class="iconfont icon-zhuye"></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleClick('/ware')" :selected="$route.path === '/ware'">
        <span slot="icon" class="iconfont icon-shangcheng"></span>
        <span slot="label">分类列表</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleClick('/shopcar')" :selected="$route.path === '/shopcar'" :badge="null">
        <span slot="icon" class="iconfont icon-cart"></span>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item @on-item-click="handleClick('/person')" :selected="$route.path === '/person'">
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
  methods: {
    handleClick(link) {
      this.$router.replace(link);
    },
  },
};
</script>

<style lang="less">
.main-tabbar {
  width: 100%;
  height: 100%;
}

.main-tabbar .weui_tabbar {
  background-color: @tabbar-background-color;
  .weui_tabbar_item, .weui_tabbar_label {
    color: @tabbar-text-color;
    transition: color .5s;
  }
  .weui_tabbar_icon {
    text-align: center;
    .iconfont {
      font-size: 19px;
    }
  }
  .weui_tabbar_label {
    font-size: 12px;
  }
  .weui_bar_item_on {
    color: @tabbar-text-active-color;
  }
}

.tabbar-content {
  position: absolute;
  top: 0;
  bottom: 55px;
  left: 0;
  right: 0;
  overflow: auto;
  @media screen and (min-width: 540px) {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .3);
    width: 540px;
    margin: 0 auto;
  }
}
</style>
