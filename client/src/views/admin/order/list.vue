<template>
  <div class="unique">
    <x-header>订单管理后台</x-header>
    <div class="x-content">
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: 'admin-order-list',
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
