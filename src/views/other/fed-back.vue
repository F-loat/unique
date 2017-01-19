<template>
  <div>
    <x-header>意见反馈</x-header>
    <group title="向我们反馈您的需求">
      <x-input placeholder="标题"></x-input>
      <x-textarea :max="200" name="description" placeholder="描述"></x-textarea>
    </group>
    <x-button style="margin-top: 15px;">提交</x-button>
  </div>
</template>

<script>
import { XHeader, XTextarea, Group, XInput, XButton } from 'vux';

export default {
  name: '',
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
