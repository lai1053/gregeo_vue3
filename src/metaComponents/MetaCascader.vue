<!-- @format -->

<template>
  <a-cascader
    :options="options"
    :disabled="disabled"
    expand-trigger="hover"
    placeholder="请选择"
    :get-popup-container="triggerNode => triggerNode.parentNode"
  />
</template>

<script>
import { arrayToTree } from '@/utils/arrayToThree'
export default {
  name: 'MetaCascader',
  props: ['props'],
  data() {
    return {
      options: [],
      disabled: this.props.disabled,
    }
  },
  mounted() {
    //console.log(this.props.option);
    this.options = arrayToTree(this.props.option)
  },
  methods: {
    onChange(value) {
      //console.log(value);
    },
  },
}
</script>

<style scoped lang="less"></style>
