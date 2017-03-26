<template>
  <div class="unique">
    <tab :line-width=2 active-color='#444a5a' v-model="index">
      <tab-item v-for="title of titles">{{title}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false" :height="height">
      <swiper-item class="wares-item" v-for="list of lists">
        <flexbox :gutter="0" wrap="wrap" align="flex-start">
          <flexbox-item v-for="ware of list" class="ware-item" :span="1/2">
            <router-link :to="`/ware/${ware._id}`">
              <div class="ware-item-content">
                <img class="ware-thumbnail" :src="`/upload/img/${ware.img}`">
                <div>{{ware.name}}</div>
              </div>
            </router-link>
          </flexbox-item>
        </flexbox>
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
      titles: ['甜点', '方形蛋糕', '圆形蛋糕', '鲜花'],
      lists: {
        mousse: [],
        cakeF: [],
        cakeY: [],
        flower: [],
      },
      height: `${document.body.clientHeight - 99}px`,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getWares();
    });
  },
  methods: {
    async getWares() {
      const wares = await this.$http
        .get('/request/ware')
        .then(res => res.body.wares);
      wares.forEach((ware) => {
        switch (ware.type) {
          case 0:
            this.lists.cakeF.push(ware);
            break;
          case 1:
            this.lists.cakeY.push(ware);
            break;
          case 2:
            this.lists.mousse.push(ware);
            break;
          case 3:
            this.lists.flower.push(ware);
            break;
          default:
        }
      });
    },
  },
};
</script>

<style lang="less">
.wares-item {
  overflow: auto;
  a {
    color: #000;
  }
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
