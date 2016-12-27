<template lang="pug">
#tab1.tab
  .content
    img.bg(src="../assets/img/bg_main.jpg")
    img.logo(src="../assets/img/logo.png", ref="logo")
    div.fengexian(ref="fengexian")
    p.main-text.webFont(ref="text") UNIQUE YOU NEED
</template>

<script>
export default {
  name: 'index-main',
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.logo.style.opacity = 1
      }, 1000)
      setTimeout(() => {
        this.$refs.fengexian.style.width = '70%'
      }, 1600)
      setTimeout(() => {
        this.$refs.text.style.opacity = 1
        this.$refs.text.style.transform = 'translate(-50%, 0)'
        this.$refs.text.style.webkitTransform = 'translate(-50%, 0)'
      }, 2400)
    })
  }
}
</script>

<style lang="stylus">
@import '../themes/'

.bg
  width 100%
  position relative

.logo, .main-text
  position absolute
  left 50%
  transition all 1s

.logo
  width 40%
  top 100px
  opacity 0
  transform translate(-50%, 0)
  -webkit-transform translate(-50%, 0)
  
.fengexian
  position absolute
  width 0%
  height 1px
  top 290px
  background #222
  margin-left 15%
  transition all .8s

.main-text
  top 310px
  font-size 18px
  opacity 0
  transform translate(-80%, 0)
  -webkit-transform translate(-80%, 0)
</style>