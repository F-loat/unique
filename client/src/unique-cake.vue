<template>
  <div class="unique-wrapper">
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
    <router-view name="reset"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'unique-cake',
  mounted() {
    this.$nextTick(() => {
      this.getUser();
    });
  },
  methods: {
    ...mapActions([
      'getUser',
    ]),
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'assets/iconfont/iconfont.css';
@import '~styles/reset.less';
</style>
