<template>
  <div class="unique">
    <x-header>注册</x-header>
    <div class="x-content">
      <group>
        <x-input title="手机号码：" name="mobile" placeholder="请输入手机号码" keyboard="number" required is-type="china-mobile"></x-input>
        <x-input title="密码：" name="mobile" placeholder="请输入密码" type="password" required></x-input>
        <x-input title="确认密码：" name="mobile" placeholder="请再次输入密码" type="password" required></x-input>
        <x-input title="验证码：" placeholder="请输入验证码" required class="weui_vcode">
          <x-button slot="right" type="primary" class="get-identify">发送验证码</x-button>
        </x-input>
      </group>
      <x-button style="margin-top: 15px;">注册</x-button>
      <router-link class="user-turn" to="/user/login">注册好了？去登录~</router-link>
      </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, XButton } from 'vux';

export default {
  name: 'user-regist',
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
.weui_vcode button.get-identify {
  margin: 5px;
  width: 100px;
  height: 34px;
  font-size: 14px;
}

.user-turn {
  color: #aaa;
  text-align: right;
  display: block;
  margin: 8px 10px;
}
</style>
