<template>
  <div class="unique">
    <x-header>收货地址</x-header>
    <div class="x-content">
      <transition-group name="fade" tag="ul">
        <li class="clearfix ready-address active" key="1">
          <span class="pull-left address-detail">
            <p>13116016522(柴茂源)</p>
            <p class="address-site">山西省大同市</p>
          </span>
          <div class="pull-right address-operation">
            <span class="address-delete iconfont icon-huishouzhan1"></span>
          </div>
        </li>
      </transition-group>
      <x-button style="margin-top: 15px;">
        <router-link class="address-turn" to="/address/new">新增</router-link>
      </x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux';

export default {
  name: 'address-list',
  components: {
    XHeader,
    XButton,
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
.ready-address {
  margin: 12px 0;
  padding: 12px 24px;
  background-color: #eee;
  &.active {
    border-left: 4px solid #dfba76;
  }
}

.address-site {
  font-size: 12px;
}

.address-delete {
  font-size: 20px;
  line-height: 44px;
}

.address-detail{
  width: 64%;
}

.address-turn {
  display: block;
  color: #454545;
}
</style>
