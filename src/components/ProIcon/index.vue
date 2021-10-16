<template>
  <span :class="iconSize">
    <icon-font :type="iconType" />
  </span>
</template>

<script>
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2324251_pm04guj7o19.js',
})
export default {
  name: 'Index',
  components: {
    IconFont,
  },
  props: ['iconType', 'iconSize'],
}
</script>

<style scoped lang="less">
.icons-list ::v-deep(.anticon) {
  /*font-size: 18px;*/
}
.large {
  .anticon {
    font-size: 16px;
  }
}
.small {
  .anticon {
    font-size: 12px;
  }
}
.default {
  font-size: 14px;
}
</style>
