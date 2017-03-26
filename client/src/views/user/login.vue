<template>
  <div class="unique">
    <x-header>登录</x-header>
    <div class="x-content">
      <group>
        <x-input name="phone" ref="phone" v-model="phone" title="手机号码：" placeholder="请输入手机号码" keyboard="number" required is-type="china-mobile"></x-input>
        <x-input name="password" ref="password" v-model="password" title="密码：" placeholder="请输入密码" type="password" required></x-input>
      </group>
      <x-button style="margin-top: 15px;" @click.native="login">登录</x-button>
      <router-link class="user-turn" to="/user/regist">还没有账号？去注册~</router-link>
      </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, XButton } from 'vux';
import { mapActions } from 'vuex';

export default {
  name: 'user-login',
  components: {
    XHeader,
    XInput,
    Group,
    XButton,
  },
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  methods: {
    ...mapActions([
      'getUser',
    ]),
    login() {
      if (!this.$refs.phone.valid || !this.$refs.password.valid) {
        this.toast(this.$refs.phone.valid ? '请输入密码' : '请输入正确的手机号');
        return;
      }
      this.$http
        .post('/request/user/login')
        .send({
          phone: this.phone,
          password: this.password,
        })
        .then((res) => {
          if (res.body.state === 1) {
            this.getUser();
            this.toast('登录成功，正在跳转');
            setTimeout(() => this.$router.push('/person'), 500);
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
.user-turn {
  color: #aaa;
  text-align: right;
  display: block;
  margin: 8px 10px;
}
</style>
