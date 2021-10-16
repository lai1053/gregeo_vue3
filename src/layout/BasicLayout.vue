<!-- @format -->

<template>
  <pro-layout :width="1000">
    <template #default>
      <router-view />
    </template>

    <template #headerRender>
      这里是 header
    </template>

    <template #footerRender>
      <pro-layout-footer
        copyright=""
        :links="links"
      />
    </template>
  </pro-layout>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          // key: '德恒',
          // href: 'http://baidu.com',
          // title: '我是德恒'
        },
      ],
    }
  },
}
</script>
