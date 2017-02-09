<template>
  <div class="unique">
    <x-header :left-options="{showBack: false}">购物车</x-header>
    <div class="x-content">
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: 'tab-shopcar',
  components: {
    XHeader,
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  methods: {
  },
};
</script>

<style lang="less">
</style>
