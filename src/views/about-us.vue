<template lang="pug">
#aboutUs.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(:to="{ path: '/person' }")
    h1.title 关于我们
  .content
    p lll
</template>

<script>
</script>

<style lang="stylus">
#aboutUs
  .content
    background-color #fdfefe
    text-indent 2em
</style>