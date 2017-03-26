<template>
  <div class="unique">
    <x-header>订单确认</x-header>
    <div class="x-content">
      <swiper auto loop :show-dots="order.wares.length > 1" :aspect-ratio="5/9">
        <swiper-item v-for="ware of order.wares">
          <a>
            <div class="order-swiper-item" :style="`background-image: url(/upload/img/${ware.info.imgs[0]})`"></div>
            <p class="vux-swiper-desc">
              <span>{{ware.info.name}}</span>
              <span v-if="ware.sum !== '1'"> x {{ware.sum}}</span>
              <span v-if="order.wares.length !== 1" class="pull-right">￥{{ware.info.price[0].val * ware.sum * ware.weight}}</span>
            </p>
          </a>
        </swiper-item>
      </swiper>
      <group title="基础信息">
        <x-input title="收货地址" disabled  class="order-address" :placeholder="address.site" @click.native="$router.push('/address')"></x-input>
        <calendar title="送达时间" disable-past v-model="order.receive"></calendar>
      </group>
      <group title="留言备注">
        <x-textarea :max="256"></x-textarea>
      </group>
    </div>
    <div class="order-bottom-bar clearfix">
      <div class="order-price" :class="{ 'show-price': price }">共￥{{price}}</div>
      <div class="order-buy" @click="choosePayway">下单</div>
    </div>
  </div>
</template>

<script>
import { XHeader, Swiper, SwiperItem, XInput, Calendar, XTextarea, Group } from 'vux';
import { mapState } from 'vuex';
import pingpp from 'pingpp-js';

export default {
  name: 'ware-order',
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    XInput,
    Calendar,
    XTextarea,
    Group,
  },
  data() {
    return {
      order: {
        msg: '',
        receive: 'TODAY',
        wares: [],
      },
      isPay: false,
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
    price() {
      const wares = this.order.wares;
      if (!wares.length) {
        return false;
      }
      let price = 0;
      wares.forEach((ware) => {
        const sum = ware.sum;
        const weight = ware.weight;
        const univalent = ware.info.price[0].val;
        price += sum * weight * univalent;
      });
      return price;
    },
    address() {
      if (!this.user.addresses) {
        return false;
      }
      return this.user.addresses.filter(address => address.state === 1)[0];
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.id) {
        this.getOrderFromWare();
      } else {
        this.getOrderFromShopcar();
      }
    });
  },
  methods: {
    getOrderFromWare() {
      this.$http
        .get(`/request/ware/${this.$route.params.id}`)
        .then((res) => {
          this.order.wares = [{
            sum: this.$route.query.sum,
            weight: this.$route.query.weight,
            info: res.body.ware,
          }];
        })
        .catch(err => this.toast(`出错了：${err.status}`));
    },
    getOrderFromShopcar() {
    },
    choosePayway() {
      this.$vux.confirm.show({
        title: '请选择支付方式',
        confirmText: '微信支付',
        cancelText: '支付宝',
        onConfirm: () => this.pay(0),
        onCancel: () => this.pay(1),
        hideOnBlur: true,
      });
    },
    pay(payway) {
      const wares = [];
      this.$http
        .post('/request/ware/pay')
        .send({
          wares,
          msg: this.order.msg,
          addressId: this.address._id,
          receive: this.order.receive,
          payway,
        })
        .then((res) => {
          if (res.body.state === 1) {
            pingpp.createPayment(res.body.charge, (result) => {
              if (result === 'success') {
                this.ispay = false;
                this.$router.push('/order');
              } else if (result === 'fail') {
                this.isPay = false;
                this.toast('付款失败，请稍后再试');
              } else if (result === 'cancel') {
                this.isPay = false;
                this.toast('已取消支付');
              }
            });
          } else {
            this.toast('请求失败，请重试');
          }
        })
        .catch(err => this.toast(`出错了：${err.status}`));
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
.order-swiper-item {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.order-address input {
  text-align: right;
}

.order-bottom-bar {
  height: 55px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.order-price, .order-buy {
  height: 100%;
  line-height: 55px;
  text-align: center;
}

.order-price{
  width: 70%;
  color: transparent;
  float: left;
  background-color: @main-color;
  transition: color 0.7s;
}

.show-price {
  color: #fff;
}
.order-buy {
  width: 30%;
  float: right;
  background-color: @second-color;
  a {
    display: block;
    color: #000;
  }
}
</style>
