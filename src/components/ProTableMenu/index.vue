<!-- @format -->

<template>
  <a-row class="row">
    <a-col
      span="6"
      class="title"
    >
      {{ proTableMenuData.title }}
    </a-col>
    <a-col
      span="18"
      class="menuList"
    >
      <a-button
        v-for="(i, index) in proTableMenuData.menuList"
        :key="index"
        :ghost="i.ghost"
        :type="i.type"
        :class="i.type"
        @click="click(i.features)"
      >
        <a-dropdown>
          <a-tooltip
            placement="topLeft"
            :title="i.title"
            arrow-point-at-center
          >
            <a
              class="ant-dropdown-link"
              @click="e => e.preventDefault()"
            >
              <ProIcon
                :key="i.text"
                :icon-type="i.icon"
                :icon-size="i.size"
              />
              {{ i.text }}
            </a>
          </a-tooltip>
          <template
            v-if="i.densityItem"
            #overlay
          >
            <a-menu>
              <a-menu-item
                v-for="j in i.densityItem"
                :key="j.key"
                @click="click(j)"
              >
                {{ j.name }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-button>
    </a-col>
  </a-row>
</template>

<script>
import ProIcon from '@/components/ProIcon'
export default {
  name: 'Index',
  components: {
    ProIcon,
  },
  props: ['proTableMenuData', 'menuClick'],
  created() {},
  methods: {
    click(e) {
      let key
      if (typeof e === 'string') {
        key = e
      }
      if (typeof e === 'object') {
        key = e.features
      }
      console.log(key, e)
      if (!key) return

      this.$emit('menuClick', key, e)
    },
  },
}
</script>

<style scoped lang="less">
.row {
  padding-left: 30px;
  // padding-right: 25px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
}
.menuList {
  position: absolute;
  right: 25px;
}
.link {
  color: black;
}
</style>
