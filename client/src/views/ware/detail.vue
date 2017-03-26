<template>
  <div class="unique">
    <x-header>商品详情</x-header>
    <div class="x-content">
      <div class="ware-info">
        <div class="ware-swiper-wrap">
          <swiper auto loop :show-dots="ware.imgs && ware.imgs.length > 1" :aspect-ratio="5/9">
            <swiper-item v-for="img of ware.imgs">
              <div class="ware-swiper-item" :style="`background-image: url(/upload/img/${img})`"></div>
            </swiper-item>
          </swiper>
          <p class="ware-swiper-desc">{{ware.name}}</p>
        </div>
        <transition name="slide-fade">
          <div v-show="ware._id">
            <p v-for="(value, key) of ware">{{`${key}:${value}`}}</p>
          </div>
        </transition>
      </div>
    </div>
    <div class="ware-bottom-bar clearfix">
      <div class="ware-price" :class="{ 'show-price': price }">{{price}}</div>
      <div class="ware-to-shopcar" @click="addToShopcar">加入购物车</div>
      <div class="ware-buy">
        <router-link :to="`/ware/${$route.params.id}/order?sum=${sum}&weight=${weight}`">购买</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Swiper, SwiperItem } from 'vux';

export default {
  name: 'ware-detail',
  components: {
    XHeader,
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      ware: {},
      sum: 1,
      weight: 1,
    };
  },
  computed: {
    price() {
      if (!this.ware.price) {
        return false;
      }
      return `￥${this.ware.price[0].val}`;
    },
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
    addToShopcar() {

    },
    toast(text) {
      this.$vux.toast.show({
        type: 'text',
        width: '11em',
        text,
      });
    },
  },
};
</script>

<style lang="less">
.ware-info {
  padding-bottom: 55px;
}

.ware-swiper-wrap {
  position: relative;
}

.ware-swiper-item {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.ware-swiper-desc {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.4em;
  font-size: 16px;
  padding: 20px 50px 12px 13px;
  margin: 0;
  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.ware-bottom-bar {
  height: 55px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.ware-price, .ware-to-shopcar, .ware-buy {
  height: 100%;
  line-height: 55px;
  text-align: center;
}

.ware-price{
  width: 40%;
  color: transparent;
  float: left;
  background-color: @main-color;
  transition: color 0.7s;
}

.show-price {
  color: #fff;
}

.ware-to-shopcar {
  width: 30%;
  float: left;
  background-color: #eee;
}

.ware-buy {
  width: 30%;
  float: right;
  background-color: @second-color;
  a {
    display: block;
    color: #000;
  }
}
</style>
