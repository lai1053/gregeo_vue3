<!-- @format -->

<template>
  <a-textarea
    :class="props.size ? props.size : 'textarea'"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'MetaInputText',
  props: ['props'],
  data() {
    return {
      disabled: this.props.disabled,
    }
  },
}
</script>

<style scoped lang="less">
.textarea {
  height: 100px;
}
.large {
  height: 150px;
}
</style>
