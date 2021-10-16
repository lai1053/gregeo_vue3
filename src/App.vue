<!-- @format -->

<template>
  <!--  <div id="nav">-->
  <!--      <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </div>-->
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'

export default {
  data() {
    return {
      locale: zhCN,
    }
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
}
* {
  touch-action: pan-y;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
