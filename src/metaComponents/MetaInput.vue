<!-- @format -->

<template>
  <a-input
    :placeholder="placeholder"
    :addon-before="addonBefore"
    :addon-after="addonAfter"
    :disabled="disabled"
    :maxlength="maxlength"
  />
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'MetaInput',
  props: ['props'],
  data() {
    return {
      placeholder: this.props.placeholder,
      addonBefore: this.props.addonBefore,
      addonAfter: this.props.addonAfter,
      maxlength: this.props.maxlength,
      disabled: this.props.disabled,
    }
  },
  created() {
    //console.log(this.props);
  },
}
</script>

<style scoped></style>
