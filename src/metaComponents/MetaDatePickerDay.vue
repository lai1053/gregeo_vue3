<!-- @format -->

<template>
  <a-date-picker
    class="datePicker"
    :disabled="disabled"
    :format="dateFormat"
  />
</template>

<script>
export default {
  name: 'MetaDatePickerDay',
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
