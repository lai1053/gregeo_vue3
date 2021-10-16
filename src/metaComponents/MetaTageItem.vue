<template>
  <span
    v-for="(i, index) in tagsItem"
    :key="index"
  >
    <a-tag
      class="item"
      @click="change(i)"
    >{{ i.name }}</a-tag>
  </span>
</template>

<script>
export default {
  name: 'MetaTageItem',
  props: ['props', 'childDataChange'],
  data() {
    return {
      tagsItem: this.props.option,
      arr: [],
    }
  },
  methods: {
    change(i) {
      this.$emit('childDataChange', i, this.props.forTargetKey, 'push')
    },
  },
}
</script>

<style scoped lang="less">
.item {
  cursor: pointer;
}
</style>
