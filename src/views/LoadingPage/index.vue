<template>
  <a-spin tip="系统数据加载中请稍后">
    <div class="item" />
  </a-spin>
</template>

<script>
// 这个是所有数据的缓存模块
import { getQualification, getSchemaData, getCustomertag, getBelong } from '@/api'
export default {
  name: 'Index',
  created() {
    this.load()
  },
  methods: {
    async load() {
      //资质选项配置信息
      const qualificationRes = await getQualification()
      let type1 = []
      let type2 = []
      qualificationRes.result &&
        qualificationRes.result.results.forEach(i => {
          if (i.type === 1) type1.push(i)
          if (i.type === 2) type2.push(i)
        })
      if (qualificationRes.code === 0) {
        const obj = {
          type1,
          type2,
          all: qualificationRes.result.results,
        }
        localStorage.setItem('qualification', JSON.stringify(obj))
      } else {
        alert(qualificationRes.message + '请重新登录')
        return
      }

      // 获取标签信息
      const getCustomertagRes = await getCustomertag()
      const data = {
        customertag: getCustomertagRes.result.results,
      }
      localStorage.setItem('customertag', JSON.stringify(data))

      // 获取当前登录用户所属部门以及下级部门列表
      const getBelongRes = await getBelong()
      localStorage.setItem('belong', JSON.stringify(getBelongRes.result))
      console.log(getBelongRes)

      // 获取表字段基础信息
      const res = await getSchemaData()
      if (res.code === 0) {
        localStorage.setItem('schema', JSON.stringify(res.result))
        const that = this
        setTimeout(function () {
          that.$router.replace({
            path: '/BasicLayout/customerProfile',
            query: {
              redirect: that.$router.currentRoute.fullPath,
            },
          })
        }, 1000)
      } else {
        alert('数据加载失败请重新登录')
      }
    },
  },
}
</script>

<style scoped lang="less">
.item {
  height: 80vh;
  width: 100%;
}
</style>
