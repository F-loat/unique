<template lang="pug">
#aboutUs.view
  header.bar.bar-nav
    a.icon.icon-left.pull-left(v-link="{ path: '/person' }")
    h1.title 关于我们
  .content
    p
      | lll
</template>

<script>
</script>

<style lang="stylus">
#aboutUs
  .content
    background-color #fdfefe
    text-indent 2em
</style>