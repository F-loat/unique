<template>
  <div class="unique">
    <x-header :left-options="{showBack: false}">购物车</x-header>
    <div class="x-content">
      <div v-if="user.shopcar && user.shopcar.length" class="shopcar-list">
      </div>
      <load-more v-else class="no-data" :show-loading="false" tip="暂无数据"></load-more>
    </div>
    <div v-if="user.shopcar && user.shopcar.length" class="shopcar-bottom-bar clearfix">
      <div class="shopcar-info"></div>
      <div class="shopcar-buy">购买</div>
    </div>
  </div>
</template>

<script>
import { XHeader, LoadMore } from 'vux';
import { mapState } from 'vuex';

export default {
  name: 'tab-shopcar',
  components: {
    XHeader,
    LoadMore,
  },
  computed: {
    ...mapState([
      'user',
    ]),
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
.shopcar-list {
  padding-bottom: 55px;
}

.shopcar-bottom-bar {
  height: 55px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.shopcar-info, .shopcar-buy {
  height: 100%;
  line-height: 55px;
  text-align: center;
}

.shopcar-info{
  width: 70%;
  float: left;
  background-color: #eee;
}

.shopcar-buy {
  width: 30%;
  float: right;
  background-color: @second-color;
}
</style>
