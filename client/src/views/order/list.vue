<template>
  <div class="unique">
    <x-header>我的订单</x-header>
    <div class="x-content">
      <tab :line-width=2 active-color='#444a5a' v-model="index">
        <tab-item v-for="title of titles">{{title}}</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" :height="height">
        <swiper-item class="orders-item" v-for="list of lists">
          <load-more v-if="!(list && list.length)" class="no-data" :show-loading="false" tip="暂无数据"></load-more>
          <div v-else class="weui-form-preview order-item" v-for="order of list">
            <router-link :to="`/order/${order._id}`" class="order-turn">
              <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">付款金额</label>
                <em class="weui-form-preview__value">¥{{order.fee}}</em>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item" v-for="ware of order.wares">
                  <label class="weui-form-preview__label">商品</label>
                  <span class="weui-form-preview__value">{{ware.info.name}}</span>
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
            </router-link>
            <div class="weui-form-preview__ft">
              <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_default">取消订单</a>
              <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_default">再次购买</a>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem, Swiper, SwiperItem, FormPreview, LoadMore, dateFormat } from 'vux';
import { mapState } from 'vuex';

export default {
  name: 'order-list',
  components: {
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    FormPreview,
    LoadMore,
    dateFormat,
  },
  data() {
    return {
      index: 0,
      titles: ['未完成', '已完成', '全部'],
      height: `${document.body.clientHeight - 90}px`,
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
    lists() {
      const allOrders = this.user.orders || [];
      const unfinishedOrders = allOrders.filter(order => order.state === 0);
      const finishedOrders = allOrders.filter(order => order.state === 1);
      return [unfinishedOrders, finishedOrders, allOrders];
    },
  },
  methods: {
    dateFormat(date) {
      return dateFormat(new Date(date), 'YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>

<style lang="less">
.order-item {
  margin-top: 20px;
}

.order-turn {
  display: block;
  em.weui-form-preview__value {
    color: #000;
  }
}
</style>
