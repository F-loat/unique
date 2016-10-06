<template lang="pug">
#tab3.tab.view
  header.bar.bar-nav
    h1.title 照片蛋糕
  .content
    #canvasWrap
      canvas#canvas 您的设备不支持canvas元素
    .row
      .col-50
        input(type='file', accept='image/*', v-on:change='drawImage')
        a#photo-upload.button.button-big.button-warning(href='#') 上传照片
      .col-50
        a#photo-next.button.button-big.disabled(href='#') 确定
</template>

<script>
</script>

<style lang="stylus">
/*照片蛋糕界面样式*/
#tab3
  .content
    background-color #fbfafa
    bottom 2.5rem
  .row
    position absolute
    bottom 3.2rem
    width 92%
    margin-left 2%
  .col-50
    position relative
  input
    width 100%
    height 100%
    opacity 0
    position absolute
    z-index 9

#canvasWrap
  margin-top 16%
</style>