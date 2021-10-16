<!-- @format -->

<template>
  <a-input-number
    :min="0"
    :max="100"
    :disabled="disabled"
    class="number"
    :formatter="value => `${value}%`"
    :parser="value => value.replace('%', '')"
  />
</template>

<script>
export default {
  name: 'MetaInputNumber',
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
