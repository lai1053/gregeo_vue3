<template>
  <a-spin
    tip="数据加载中"
    :delay="1"
    :spinning="loading"
  >
    <div>
      <a-tabs @change="callback">
        <a-tab-pane
          :key="0"
          tab="登录日志"
        />
        <a-tab-pane
          :key="1"
          tab="操作日志"
          force-render
        />
      </a-tabs>
      <ProTable
        :pro-table-data="proTableData"
        @tableDataClick="tableDataClick"
      />
    </div>
  </a-spin>
</template>

<script>
import ProTable from '@/components/ProTable'
import { getList } from '@/api/loginFormation'
export default {
  name: 'Index',
  components: {
    ProTable,
  },
  data() {
    return {
      loading: false,
      proTableData: {
        size: 'default',
        columns: [
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '设备',
            dataIndex: 'device',
            key: 'device',
          },
          {
            title: '浏览器',
            dataIndex: 'browser',
            key: 'browser',
          },
          {
            title: '操作系统',
            dataIndex: 'system',
            key: 'system',
            width: 200,
          },
        ],
        tableData: [],
        pagination: {
          page: 1, //-- 当前页
          size: 5, //-- 页大小
          count: 20, //--页总数
          pageSizeOptions: ['5', '10', '20', '30'],
        },
      },
      key: 0,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    callback(key) {
      this.key = key
      this.load()
    },
    async load() {
      this.loading = true
      const params = {
        page: this.proTableData.pagination.page,
        size: this.proTableData.pagination.size,
        record_type: this.key,
      }
      const url = '/api/manage/apitrack/apirequesttrack/'
      const res = await getList(url, params)
      if (res.code === 0) {
        this.loading = false
        this.proTableData.pagination.count = res.result.count
        this.proTableData.tableData = res.result.results // 把接口数据添加给表格数据
      }
    },
    async tableDataClick(key, data) {
      //列表页回信息
      switch (key) {
        case 'pagination':
          console.log('父组件数据', 'pagination', data)
          this.proTableData.pagination = data
          this.load()
          break
        case 'sorter':
          console.log('父组件数据', 'sorter', data)
          break
        case 'selectedRowData':
          console.log('父组件数据', 'selectedRowData', data)
          break
        case 'modification': // 修改数据
          break
        case 'deleteItem':
          break
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
