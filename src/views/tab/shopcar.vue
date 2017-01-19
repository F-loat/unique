<template>
  <div>
    <x-header :left-options="{showBack: false}">购物车</x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: '',
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
