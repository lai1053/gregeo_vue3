<!-- @format -->

<template>
  <a-radio-group v-model:value="value">
    <a-radio
      v-for="i in props.option"
      :key="i.value"
      :value="i.value"
      :disabled="disabled"
    >
      {{ i.name }}
    </a-radio>
  </a-radio-group>
</template>

<script>
export default {
  name: 'MetaRadioGroup',
  props: ['props', 'childData'],
  data() {
    return {
      disabled: this.props.disabled,
      value: this.childData,
    }
  },
  mounted() {
    // console.log(this.childData)
  },
}
</script>

<style scoped></style>
