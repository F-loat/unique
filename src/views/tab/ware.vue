<template>
  <div>
     <tab :line-width=2 active-color='#444a5a' v-model="index">
      <tab-item :selected="tab === item" v-for="item in list" @click="tab = item">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false" :height="height">
      <swiper-item class="wares-item" v-for="(ware, key) in wares">
        <flexbox :gutter="0" wrap="wrap" align="flex-start">
          <flexbox-item v-for="src in ware" class="ware-item" :span="1/2">
            <div class="ware-item-content">
              <img class="ware-thumbnail" :src="src">
              <div>{{key}}</div>
            </div>
          </flexbox-item>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux';

export default {
  name: 'tab-ware',
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
  },
  data() {
    return {
      index: 0,
      tab: '甜点',
      list: ['甜点', '方形蛋糕', '圆形蛋糕', '鲜花'],
      wares: {
        cakeF: [
          'http://123.206.9.219/upload/img/ae4348abce842ae6531f0478b5d225ac',
          'http://123.206.9.219/upload/img/7bbd14a5b493a1cac019afa925b783c7',
          'http://123.206.9.219/upload/img/e27d627532c7d5db45ae1556a985f9bd',
          'http://123.206.9.219/upload/img/0bf5e346f4dffd2bef115d7c0a8b74b7',
          'http://123.206.9.219/upload/img/5e6658f242e9ad623f37375722979b11',
        ],
        cakeY: [
          'http://123.206.9.219/upload/img/ae4348abce842ae6531f0478b5d225ac',
          'http://123.206.9.219/upload/img/7bbd14a5b493a1cac019afa925b783c7',
          'http://123.206.9.219/upload/img/e27d627532c7d5db45ae1556a985f9bd',
          'http://123.206.9.219/upload/img/0bf5e346f4dffd2bef115d7c0a8b74b7',
          'http://123.206.9.219/upload/img/5e6658f242e9ad623f37375722979b11',
        ],
        mousse: [
          'http://123.206.9.219/upload/img/ae4348abce842ae6531f0478b5d225ac',
          'http://123.206.9.219/upload/img/7bbd14a5b493a1cac019afa925b783c7',
          'http://123.206.9.219/upload/img/e27d627532c7d5db45ae1556a985f9bd',
          'http://123.206.9.219/upload/img/0bf5e346f4dffd2bef115d7c0a8b74b7',
          'http://123.206.9.219/upload/img/5e6658f242e9ad623f37375722979b11',
        ],
        flower: [
          'http://123.206.9.219/upload/img/ae4348abce842ae6531f0478b5d225ac',
          'http://123.206.9.219/upload/img/7bbd14a5b493a1cac019afa925b783c7',
          'http://123.206.9.219/upload/img/e27d627532c7d5db45ae1556a985f9bd',
          'http://123.206.9.219/upload/img/0bf5e346f4dffd2bef115d7c0a8b74b7',
          'http://123.206.9.219/upload/img/5e6658f242e9ad623f37375722979b11',
        ],
      },
      height: `${document.body.clientHeight - 99}px`,
    };
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
.wares-item {
  overflow: auto;
}

.ware-item-content {
  width: 94%;
}

.ware-item:nth-child(odd) .ware-item-content {
  margin: 4% 2% 0 4%;
}

.ware-item:nth-child(even) .ware-item-content {
  margin: 4% 4% 0 2%;
}

.ware-thumbnail {
  width: 100%;
}
</style>
