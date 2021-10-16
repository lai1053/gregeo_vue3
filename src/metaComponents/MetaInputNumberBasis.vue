<!-- @format -->

<template>
  <a-input-number
    class="number"
    :min="0"
    :max="10000"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'MetaInputNumberBasis',
  props: ['props'],
  data() {
    return {
      disabled: this.props.disabled,
    }
  },
}
</script>

<style scoped>
.number {
  width: 100%;
}
</style>
