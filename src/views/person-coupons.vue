<template lang="pug">
#myCoupons.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(:to="{ path: '/person' }")
    a.icon.icon-refresh.pull-right
    h1.title 我的优惠券
  .content
    #no-coupon
      p 暂无可用优惠券
      p
        a 查看过期优惠券
</template>

<script>
</script>

<style lang="stylus">
#no-coupon
  text-align center
  margin-top 8rem
  a
    color inherit
    font-family inherit
    font-size 0.7rem
</style>