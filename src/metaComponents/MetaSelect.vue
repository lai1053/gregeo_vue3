<!-- @format -->

<template>
  <a-select
    :disabled="componentData.disabled"
    :get-popup-container="triggerNode => triggerNode.parentNode"
  >
    <template
      v-for="i in componentData.option"
      :key="i.value"
      :disabled="componentData.disabled"
    >
      <a-select-option :value="i.value">
        {{ i.name }}
      </a-select-option>
    </template>
  </a-select>
</template>

<script>
export default {
  name: 'MetaSelect',
  props: ['props'],
  data() {
    return {
      componentData: {},
    }
  },
  watch: {
    props: {
      handler(value, oldValue) {
        //console.log('接受到了新数据',value);
        //this.componentData = { ...value }
      },
      deep: true,
    },
  },
  mounted() {
    this.componentData = { ...this.props }
  },
  methods: {},
}
</script>

<style scoped lang="less"></style>
