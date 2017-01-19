<template>
  <div>
    <x-header>登录</x-header>
    <group>
      <x-input title="手机号码：" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      <x-input title="密码：" name="mobile" placeholder="请输入密码" type="password"></x-input>
    </group>
    <x-button style="margin-top: 15px;">登录</x-button>
    <router-link class="user-turn" to="/user/regist">还没有账号？去注册~</router-link>
  </div>
</template>

<script>
import { XHeader, XInput, Group, XButton } from 'vux';

export default {
  name: '',
  components: {
    XHeader,
    XInput,
    Group,
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
.user-turn {
  color: #aaa;
  text-align: right;
  display: block;
  margin: 8px 10px;
}
</style>
