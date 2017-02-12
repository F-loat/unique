<template>
  <div class="unique">
    <x-header>商品详情</x-header>
    <div class="x-content">
      <transition name="slide-fade">
        <div v-show="ware._id">
          <p v-for="(value, key) of ware">{{`${key}:${value}`}}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';

export default {
  name: 'ware-detail',
  components: {
    XHeader,
  },
  data() {
    return {
      ware: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getWare();
    });
  },
  methods: {
    getWare() {
      this.$http
        .get(`/request/ware/${this.$route.params.id}`)
        .then((res) => {
          this.ware = res.body.ware;
        })
        .catch(err => this.toast(`出错了：${err.status}`));
    },
  },
};
</script>

<style lang="less">
</style>
