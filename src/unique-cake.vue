<template>
<div id="unique">
  <keep-alive>
    <router-view name="alive"></router-view>
  </keep-alive>
  <router-view name="reset"></router-view>
</div>
</template>

<script>
export default {
  name: 'unique-cake',
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'assets/iconfont/iconfont.css';
</style>