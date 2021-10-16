<!-- @format -->

<template>
  <a-spin
    tip="数据加载中"
    :delay="300"
    :spinning="loading"
  >
    <div class="item">
      <HeaderSearch
        :header-search-data="headerSearchData"
        @headerSearchClick="headerSearchClick"
      />
      <div class="itemRow" />
      <div class="content">
        <ProTableMenu
          :pro-table-menu-data="proTableMenuData"
          @menuClick="menuClick"
        />
        <ProTable
          :pro-table-data="proTableData"
          @tableDataClick="tableDataClick"
        />
      </div>
    </div>

    <a-modal
      v-model:visible="visible"
      title="请输入企业名称"
      width="460px"
      :confirm-loading="confirmLoading"
      :destroy-on-close="true"
      @ok="handleOk"
      @cancel="() => (enterpriseName = '')"
    >
      <a-input
        v-model:value="enterpriseName"
        :maxlength="50"
      />
    </a-modal>
  </a-spin>
</template>
<script>
import HeaderSearch from '@/components/HeadrSearch'
import ProTableMenu from '@/components/ProTableMenu'
import ProTable from '@/components/ProTable'
import moment from 'moment'
import { getList, create, deleteDate, schema } from '@/api/customerPorfile'
import { columns, tableData } from './fixedData'
import { Modal, message } from 'ant-design-vue'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { removeEmptyField } from '@/utils/removeEmptyField'
export default {
  components: {
    HeaderSearch,
    ProTableMenu,
    ProTable,
  },
  data() {
    return {
      loading: false,
      confirmLoading: false, //模态框loading
      url: '/api/manage/customer/enterprise/',
      schema: '', // 配置信息
      visible: false, //模态框显示
      enterpriseName: '', // 企业名称
      headerSearchData: [
        {
          label: '客户名称',
          component: 'metaInput',
          key: 'name',
          props: {
            key: 'name',
          },
        },
        {
          label: '产品名称',
          component: 'metaInput',
          key: 'product',
          props: {
            key: 'product',
            placeholder: '请输入',
          },
        },
        {
          label: '创建时间',
          component: 'MetaDatePickerRange',
          key: 'start_time',
          url: '',
          props: {
            props: {
              inputType: 'datePickerRange',
            },
          },
        },
        {
          label: '重要程度',
          component: 'MetaSelect',
          key: 'status',
          props: {
            key: 'status',
            option: [
              {
                name: '小客户',
                value: 1,
              },
              {
                name: '中客户',
                value: 2,
              },
              {
                name: '大客户',
                value: 3,
              },
              {
                name: '战略客户',
                value: 4,
              },
            ],
          },
        },
        {
          label: '部门名称',
          component: 'MetaSelect',
          key: 'departments',
          props: {
            key: 'departments',
            option: [],
          },
        },
        // {
        //   label: '客户经理',
        //   component: 'MetaSelect',
        //   key: 'users',
        //   props: {
        //     key: 'users',
        //     option: [
        //     ],
        //   },
        // },
      ],
      proTableMenuData: {
        title: '我的客户名录',
        menuList: [
          {
            type: 'primary',
            icon: 'iconicon-test2',
            text: '新增',
            features: 'add',
            size: 'small',
          },
          {
            title: '刷新',
            type: 'link',
            icon: 'iconList_Refresh',
            text: ' ',
            size: 'large',
            features: 'refresh',
          },
          {
            title: '行距',
            type: 'link',
            icon: 'iconList_Rowwidth',
            text: ' ',
            size: 'large',
            features: 'density',
            densityItem: [
              {
                features: 'density',
                key: 'default',
                name: '默认',
              },
              {
                features: 'density',
                key: 'middle',
                name: '中等',
              },
              {
                features: 'density',
                key: 'small',
                name: '紧凑',
              },
            ],
          },
          /* {
            title: '设置',
            type: 'link',
            size: 'large',
            icon: 'iconList_Setup',
            text: ' ',
            features: 'setUp',
          },*/
        ],
      },
      proTableData: {
        size: 'default',
        columns: columns,
        tableData: tableData,
        pagination: {
          page: 1, //-- 当前页
          size: 10, //-- 页大小
          count: 20, //--页总数
          pageSizeOptions: ['10', '20', '30'],
        },
      },
      params: {},
      belong: '',
    }
  },
  computed: {},
  created() {
    this.belong = JSON.parse(localStorage.getItem('belong')) //
    const arr = this.belong.results
    arr.forEach(i => {
      i.value = i.id
    })
    this.headerSearchData.forEach(i => {
      if (i.key === 'departments') {
        i.props.option = arr
      }
    })
  },
  mounted() {
    // 初始化调用接口信息
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      // 判定是否有配置文件
      //console.log(this.$store.state.schema)
      if (!this.$store.state.schema) {
        this.$store.dispatch('getSchema')
      }
      const aaa = JSON.parse(localStorage.getItem('schema'))
      this.schema = aaa && aaa.customer__enterprise

      let params = {
        page: this.proTableData.pagination.page,
        size: this.proTableData.pagination.size,
        ...this.params,
      }
      let a = removeEmptyField(params)
      const res = await getList(this.url, a, 'GET')
      if (res) {
        this.loading = false
        if (res.code === 0) {
          this.proTableData.tableData = this.configTable(res.result.results)
          //this.proTableData.tableData = res.result.results
          this.proTableData.pagination.count = res.result.count
        } else {
          return message.error('系统故障请重新刷新页面')
        }
      }
    },
    async handleOk() {
      const name = this.enterpriseName
      if (!name) {
        return message.error('请输入公司名称')
      }
      this.confirmLoading = !this.confirmLoading
      const res = await create(this.url, { name: name }, 'POST')
      if (res.code === 0) {
        // 企业信息封发到vuex
        const data = res.result
        this.$store.dispatch('getCustomerProfileInfo', data)
        this.$router.push('customerProfileInfo')
      } else {
        Modal.error({
          content: res.message,
        })
      }
      this.visible = false
      this.confirmLoading = !this.confirmLoading
    },
    configTable(data) {
      const color = {
        // 配置颜色信息
        4: '#FAAD14', //战略客户
        3: '#F5222D', //大客户客户
        2: '#1890FF', //中客户
        1: '#52C41A', //小客户
        // 0: '#FFFFFF', //未知
      }
      data.forEach(i => {
        if (i.status) {
          i.statusClassColor = color[i.status]
        }
      })

      //      console.log(data)
      //配置表格信息
      // console.log(this.schema)
      const fields = this.schema.fields
      fields &&
        Object.keys(fields).forEach(key => {
          if (fields[key].choices) {
            data.forEach(item => {
              item[key] = fields[key].choices[item[key]]
            })
          }
        })
      return data
    },
    headerSearchClick(data) {
      let add_time_start, add_time_end
      if (data.start_time) {
        add_time_start = moment(data.start_time[0]).format('YYYY-MM-DD')
        add_time_end = moment(data.start_time[1]).format('YYYY-MM-DD')
      }
      this.params = {
        add_time_start,
        add_time_end,
        product: data.product,
        status: data.status,
        name: data.name,
        departments: data.departments,
      }
      this.load()
    },
    menuClick(key, data) {
      switch (key) {
        case 'add':
          const addData = {
            isAdd: true,
          }
          this.$store.dispatch('getCustomerProfileInfo', addData)
          this.$router.push('customerProfileInfo')
          break
        case 'refresh':
          this.load()
          break

        case 'density':
          if (data.key) {
            this.proTableData.size = data.key
          } else {
            return
          }
          break

        case 'setUp':
          break
      }
    },
    tableDataClick(key, data) {
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
        case 'modification': // 修改数据需要把数据封发到vuex中
          this.$store.dispatch('getCustomerProfileInfo', data)
          this.$router.push('customerProfileInfo')
          //console.log('父组件数据', 'modification', data)
          break
        case 'deleteItem': // 删除
          console.log('父组件数据', 'deleteItem', data)
          const that = this
          Modal.confirm({
            title: '你确定要删除此信息么？',
            icon: createVNode(ExclamationCircleOutlined),
            content: '确认删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              const res = deleteDate(that.url, { id: data.id })
              if (res) {
                that.load()
              } else {
                that.$message.error(a.message)
              }
            },
            onCancel() {},
          })
          break
        case 'view':
          data.allDisabled = 'readOnly'
          this.$store.dispatch('getCustomerProfileInfo', data)
          this.$router.push('customerProfileInfo')
          break
      }
    },
  },
}
</script>

<style scoped lang="less">
.item {
}
.itemRow {
  background-color: #f0f2f5;
  width: 100%;
  height: 24px;
}

.content {
  padding-top: 20px;
}
</style>
