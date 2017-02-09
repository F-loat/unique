<template>
  <div class="unique">
    <x-header>意见反馈</x-header>
    <div class="x-content">
      <group title="向我们反馈您的需求">
        <x-input placeholder="标题"></x-input>
        <x-textarea :max="200" name="description" placeholder="描述"></x-textarea>
      </group>
      <x-button style="margin-top: 15px;">提交</x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, XTextarea, Group, XInput, XButton } from 'vux';

export default {
  name: 'fedback',
  components: {
    XHeader,
    XTextarea,
    Group,
    XInput,
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
</style>
