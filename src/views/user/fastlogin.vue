<template>
  <div class="unique">
    <x-header>快速登录</x-header>
    <div class="x-content">
      <group>
        <x-input name="phone" ref="phone" v-model="phone" title="手机号码：" placeholder="请输入手机号码" keyboard="number" required is-type="china-mobile"></x-input>
        <x-input name="identify" ref="identify" v-model="identify" title="验证码：" placeholder="请输入验证码" keyboard="number" required :min="5" :max="6" class="weui_vcode">
          <x-button slot="right" type="primary" class="get-identify" :disabled="inCountdown" @click.native="getIdentify">{{inCountdown ? `${time}秒后重试` : '发送验证码'}}</x-button>
        </x-input>
      </group>
      <x-button style="margin-top: 15px;" @click.native="fastLogin">登录</x-button>
      <router-link class="user-turn" to="/user/login">账号密码登录</router-link>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, XButton } from 'vux';
import { mapActions } from 'vuex';

export default {
  name: 'user-fastlogin',
  components: {
    XHeader,
    XInput,
    Group,
    XButton,
  },
  data() {
    return {
      time: 60,
      phone: '',
      identify: '',
      inCountdown: false,
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
    fastLogin() {
      if (!this.$refs.phone.valid || !this.$refs.identify.valid) {
        this.toast(this.$refs.phone.valid ? '请输入正确的验证码' : '请输入正确的手机号');
        return;
      }
      this.$http
        .post('/request/user/fastLogin')
        .send({
          phone: this.phone,
          identify: this.identify,
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
    getIdentify() {
      if (!this.$refs.phone.valid) {
        this.toast('请输入正确的手机号');
        return;
      }
      this.inCountdown = true;
      this.countdown();
      this.$http
        .post('/request/user/fastLogin/identify')
        .send({
          phone: this.phone,
        })
        .then((res) => {
          if (res.body.state === 1) {
            this.$vux.toast.show('验证码发送成功');
          } else {
            this.toast(res.body.err);
            this.inCountdown = false;
          }
        })
        .catch(err => this.toast(`出错了：${err.status}`));
    },
    countdown() {
      if (this.time > 1 && this.inCountdown === true) {
        this.time -= 1;
        setTimeout(this.countdown, 1000);
      } else {
        this.inCountdown = false;
        this.time = 60;
      }
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
