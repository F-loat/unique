<template>
  <div class="unique">
    <x-header>我的订单</x-header>
    <div class="x-content">

    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: 'order-list',
  components: {
    XHeader,
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
