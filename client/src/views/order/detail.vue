<template>
  <div class="unique">
    <x-header>订单详情</x-header>
    <div class="x-content">
      <transition name="slide-fade">
        <div class="order-detail" v-show="order._id">
          <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
              <label class="weui-form-preview__label">付款金额</label>
              <em class="weui-form-preview__value">¥{{order.fee}}</em>
            </div>
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item" v-for="ware of order.wares">
                <label class="weui-form-preview__label">商品</label>
                <span class="weui-form-preview__value" @click="turnTo(`/ware/${ware.info._id}`)">{{ware.info.name}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">订单备注</label>
                <span class="weui-form-preview__value">{{order.msg || '无'}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">收货时间</label>
                <span class="weui-form-preview__value">{{dateFormat(order.receive)}}</span>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_default">取消订单</a>
              <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_default">再次购买</a>
            </div>
          </div>
          <div>
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">订单编号</label>
                <span class="weui-form-preview__value">{{order.order_no}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">下单时间</label>
                <span class="weui-form-preview__value">{{dateFormat(order.orderDate)}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">支付方式</label>
                <span class="weui-form-preview__value">{{order.payway === 1 ? '支付宝' : '微信支付'}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">订单状态</label>
                <span class="weui-form-preview__value">{{order.state === 1 ? '已完成' : '未完成'}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">收货人</label>
                <span class="weui-form-preview__value">{{order.address && order.address.receiver}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">联系方式</label>
                <span class="weui-form-preview__value">{{order.address && order.address.phone}}</span>
              </div>
              <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">收货地址</label>
                <span class="weui-form-preview__value">{{order.address && order.address.site}}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { XHeader, FormPreview, dateFormat } from 'vux';

export default {
  name: 'order-detail',
  components: {
    XHeader,
    FormPreview,
    dateFormat,
  },
  data() {
    return {
      order: {},
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.$http
        .get(`/request/order/${this.$route.params.id}`)
        .then((res) => {
          this.order = res.body.order;
        })
        .catch(err => this.toast(`出错了：${err.status}`));
    },
    turnTo(url) {
      this.$router.push(url);
    },
    dateFormat(date) {
      return dateFormat(new Date(date), 'YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>

<style lang="less">
.order-detail {
  overflow: hidden;
}
</style>
