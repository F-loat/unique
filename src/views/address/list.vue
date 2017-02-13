<template>
  <div class="unique">
    <x-header>收货地址</x-header>
    <div class="x-content">
      <transition-group name="slide-fade" tag="ul">
        <li class="clearfix ready-address" :class="{ active: address.state }" v-for="(address, index) of user.addresses" :key="address._id" @click="defaultAddress(index)">
          <span class="pull-left address-detail">
            <p>{{`${address.phone}（${address.receiver}）`}}</p>
            <p class="address-site">{{address.site}}</p>
          </span>
          <div class="pull-right address-operation" @click.stop="delAddress(index)">
            <span class="address-delete iconfont icon-huishouzhan1"></span>
          </div>
        </li>
      </transition-group>
      <router-link class="address-turn" to="/address/new">
        <x-button style="margin-top: 15px;">新增</x-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux';
import { mapState } from 'vuex';

export default {
  name: 'address-list',
  components: {
    XHeader,
    XButton,
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
    defaultAddress(index) {
      const addresses = this.user.addresses;
      this.$http
        .post('/request/user/address/default')
        .send({
          addressId: addresses[index]._id,
        })
        .then((res) => {
          if (res.body.state === 0) {
            this.toast('数据同步失败');
            return;
          }
          const newAddresses = addresses.map(this.undefault);
          newAddresses[index].state = 1;
          this.$store.commit('ADDRESS', newAddresses);
        })
        .catch(err => this.toast(`出错了：${err.status}`));
    },
    delAddress(index) {
      const addresses = this.user.addresses;
      if (addresses[index].state === 1) {
        this.toast('默认地址不可删除');
        return;
      }
      this.$vux.confirm.show({
        title: '确认删除？',
        onConfirm: () => {
          this.$http
            .post('/request/user/address/delete')
            .send({
              addressId: this.user.addresses[index]._id,
            })
            .then((res) => {
              if (res.body.state === 0) {
                this.toast('数据同步失败');
                return;
              }
              addresses.splice(index, 1);
              this.$store.commit('ADDRESS', addresses);
            })
            .catch(err => this.toast(`出错了：${err.status}`));
        },
      });
    },
    undefault(address) {
      const newAddress = address;
      newAddress.state = 0;
      return newAddress;
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
  color: @second-color;
}
</style>
