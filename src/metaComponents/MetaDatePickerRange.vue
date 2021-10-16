<!-- @format -->

<template>
  <a-range-picker
    class="datePicker"
    :format="dateFormat"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'MetaDatePickerRange',
  props: ['props'],
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      disabled: this.props.disabled,
    }
  },
}
</script>

<style scoped lang="less">
.datePicker {
  width: 100% !important;
}
</style>
