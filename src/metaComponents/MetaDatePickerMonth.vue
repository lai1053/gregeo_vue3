<!-- @format -->

<template>
  <a-month-picker
    class="datePicker"
    :format="dateFormat"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: 'MetaDatePickerMonth',
  data() {
    return {
      dateFormat: 'YYYY-MM',
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
