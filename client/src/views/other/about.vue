<template>
  <div class="unique">
    <x-header>关于我们</x-header>
    <div class="x-content">
      <p>优力克蛋糕</p>
    </div>
  </div>
</template>

<script>
import { XHeader, ViewBox } from 'vux';

export default {
  name: 'about',
  components: {
    XHeader,
    ViewBox,
  },
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>

<style lang="less">
</style>
