<template>
  <div class="unique">
    <x-header>添加地址</x-header>
    <div class="x-content">
      <group>
        <x-input name="name" ref="name" v-model="name" title="姓名：" placeholder="收货人姓名" required is-type="china-name"></x-input>
        <x-input name="phone" ref="phone" v-model="phone" title="手机：" placeholder="收货人手机号" required is-type="china-mobile" keyboard="number"></x-input>
        <x-input name="address" ref="address" v-model="address" title="地址：" placeholder="收货地址" required></x-input>
      </group>
      <x-button style="margin-top: 15px;" @click.native="addAddress">添加</x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, XInput, XButton } from 'vux';
import { mapState } from 'vuex';

export default {
  name: 'address-new',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
  },
  data() {
    return {
      name: '',
      phone: '',
      address: '',
    };
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
    addAddress() {
      if (!this.$refs.name.valid) {
        this.toast('请正确输入收货人');
        return;
      }
      if (!this.$refs.phone.valid) {
        this.toast('请输入正确的手机号');
        return;
      }
      if (!this.$refs.address.valid) {
        this.toast('请输入收货地址');
        return;
      }
      this.$http
        .post('/request/user/address/new')
        .send({
          addressInfo: {
            receiver: this.name,
            phone: this.phone,
            site: this.address,
            state: this.user.addresses.length === 0 ? 1 : 0,
          },
        })
        .then((res) => {
          if (res.body.state === 1) {
            const addresses = this.user.addresses.concat([res.body.address]);
            this.$store.commit('ADDRESS', addresses);
            this.toast('添加成功');
            this.$router.go(-1);
          } else {
            this.toast(res.body.err);
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
</style>
