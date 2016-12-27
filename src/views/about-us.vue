<template lang="pug">
#aboutUs.view
  header.bar.bar-nav
    router-link.icon.icon-left.pull-left(to="/person")
    h1.title 关于我们
  .content
    p 优力克
</template>

<script>
export default {
  name: 'about-us'
}
</script>

<style lang="stylus">
#aboutUs
  .content
    background-color bc_light
    text-indent 2em
</style>