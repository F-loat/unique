<template>
  <div class="unique">
    <blur :blur-amount="40" :url="user.headimgurl || defaultHeadimg">
      <div class="person-headimg">
        <p><img :src="user.headimgurl || defaultHeadimg"></p>
        <p v-if="user._id" @click="confirmLogout">{{user.nickname}}</p>
        <p v-else><router-link to="/user/fastlogin">登录/注册</router-link></p>
      </div>
    </blur>
    <group class="person-function-list">
      <cell title="我的订单" link="/order" is-link>
        <i slot="icon" class="iconfont icon-quanbudingdan-01"></i>
      </cell>
      <cell title="收货地址" link="/address" is-link>
        <i slot="icon" class="iconfont icon-gerenziliao"></i>
      </cell>
      <cell title="意见反馈" link="/fedback" is-link>
        <i slot="icon" class="iconfont icon-quanbudingdan-01"></i>
      </cell>
      <cell title="关于我们" link="/about" is-link>
        <i slot="icon" class="iconfont icon-quanzi"></i>
      </cell>
    </group>
    <group class="call">
      <a href="tel:15822922123">
        <span class="iconfont icon-kefu--"></span>
        <span>客服电话</span>
        <span>15822922123</span>
      </a>
    </group>
  </div>
</template>

<script>
import { Blur, Cell, Group } from 'vux';
import { mapState } from 'vuex';

export default {
  name: 'tab-person',
  components: {
    Blur,
    Cell,
    Group,
  },
  data() {
    return {
      defaultHeadimg: 'http://123.206.9.219/static/img/logo.b8e1e82.png',
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
    confirmLogout() {
      this.$vux.confirm.show({
        title: '确认注销？',
        onConfirm: this.logout,
      });
    },
    logout() {
      this.$http
        .get('/request/user/logout')
        .then((res) => {
          if (res.body.state === 1) {
            this.toast('注销成功');
            this.$store.commit('USER', {});
          } else {
            this.toast('注销失败，请重试');
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
.person-headimg {
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  padding-top: 36px;
  color: #fff;
  font-size: 16px;
}

.person-headimg img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ececec;
}

.person-function-list {
  .weui_cells {
    margin-top: 0;
  }
  .weui_cell_hd {
    width: 20px;
  }
}

.call {
  margin-top: 20px;
  text-align: center;
  a {
    display: block;
  }
  span {
    line-height: 48px;
    color: #aaa;
  }
  .iconfont {
    font-size: 18px;
  }
}
</style>
