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

      <div class="content">
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
      <div class="viewCart">
        <div class="title">
          <div class="titleImg">
            <a-avatar
              :src="viewCart.avatar"
              :size="64"
            />
          </div>
          <div class="titleText">
            <h2>{{ viewCart.username }}</h2>
            <span>
              <IconFont
                v-if="viewCart.gender === 1"
                type="iconboy"
              />
              <IconFont
                v-if="viewCart.gender === 2"
                type="icongirl"
              />
            </span>
          </div>
        </div>
        <a-divider />
        <div class="content">
          <a-row>
            <a-col
              span="10"
              class="colLeft"
            >
              邮箱账号:
            </a-col>
            <a-col
              span="14"
              class="colRight"
            >
              {{ viewCart.email }}
            </a-col>
          </a-row>
          <a-row>
            <a-col
              span="10"
              class="colLeft"
            >
              电话号码:
            </a-col>
            <a-col
              span="14"
              class="colRight"
            >
              {{ viewCart.phone }}
            </a-col>
          </a-row>
          <a-row>
            <a-col
              span="10"
              class="colLeft"
            >
              所属部门:
            </a-col>
            <a-col
              span="14"
              class="colRight"
            >
              {{ viewCart.department_name }}
            </a-col>
          </a-row>
          <a-row>
            <a-col
              span="10"
              class="colLeft"
            >
              部门角色:
            </a-col>
            <a-col
              span="14"
              class="colRight"
            >
              {{ viewCart.role_name }}
            </a-col>
          </a-row>
        </div>
      </div>
    </a-modal>
  </a-spin>
</template>
<script>
import HeaderSearch from '@/components/HeadrSearch'
import ProTable from '@/components/ProTable'
import { getUserList, getCompanyUser, getDepartment, getRole } from '@/api/businessManagementDepartment'
import { columns, tableData } from './fixedData'
import { Modal, message } from 'ant-design-vue'
import { removeEmptyField } from '@/utils/removeEmptyField'
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2324251_pm04guj7o19.js',
})
export default {
  components: {
    HeaderSearch,
    ProTable,
    IconFont,
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
          label: '所属角色',
          component: 'MetaSelect',
          key: 'role',
          props: {
            key: 'role',
            option: [],
          },
        },
        {
          label: '所属部门',
          component: 'MetaSelect',
          key: 'department',
          props: {
            key: 'department',
            placeholder: '请输入',
          },
        },
      ],
      proTableMenuData: {
        title: '客户关系',
        menuList: [
          {
            type: 'primary',
            icon: 'PlusOutlined',
            text: '新增',
            features: 'add',
          },
          {
            title: '刷新',
            type: 'link',
            icon: 'ReloadOutlined',
            text: ' ',
            features: 'refresh',
          },
          {
            title: '行距',
            type: 'link',
            icon: 'ColumnHeightOutlined',
            text: ' ',
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
          {
            title: '设置',
            type: 'link',
            icon: 'SettingOutlined',
            text: ' ',
            features: 'setUp',
          },
        ],
      },
      proTableData: {
        size: 'default',
        columns: columns,
        tableData: tableData,
        pagination: {
          page: 1, //-- 当前页
          size: 5, //-- 页大小
          count: 20, //--页总数
          pageSizeOptions: ['5', '10', '20', '30'],
        },
      },
      params: {},
      viewCart: {},
    }
  },
  mounted() {
    // 初始化调用接口信息
    this.paramsList()
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      const a = removeEmptyField(this.params)
      let params = {
        page: this.proTableData.pagination.page,
        size: this.proTableData.pagination.size,
        ...a,
      }
      const res = await getUserList(params)
      if (res) {
        this.loading = false
        if (res.code === 0) {
          this.proTableData.tableData = res.result.results
          this.proTableData.pagination.count = res.result.count
        } else {
          return message.error('系统故障请重新刷新页面')
        }
      }
    },
    async handleOk() {
      this.visible = false
    },
    async paramsList() {
      const roleRes = await getRole()
      const getDepartmentList = await getDepartment()
      roleRes.result.results.forEach(item => {
        item.value = item.id
      })
      getDepartmentList.result.results.forEach(item => {
        item.value = item.id
      })
      this.headerSearchData[0].props.option = roleRes.result.results
      this.headerSearchData[1].props.option = getDepartmentList.result.results
    },
    headerSearchClick(data) {
      this.params = {
        department: data.department,
        role: data.role,
      }
      this.load()
    },
    menuClick(key, data) {
      switch (key) {
        case 'add':
          this.visible = true
          break
        case 'refresh':
          ///this.load()
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
    async tableDataClick(key, data) {
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
          console.log('父组件数据', 'modification', data)
          break
        case 'deleteItem': // 删除
          break
        case 'view': // 查看
          const userRes = await getCompanyUser(data)
          if (userRes.code === 0) {
            this.viewCart = userRes.result
            this.modalTitle = '查看信息'
            this.visible = true
          } else {
            message.error(userRes.message)
          }
          break
      }
    },
  },
}
</script>

<style scoped lang="less">
.item {
}
.content {
  padding-top: 20px;
}
.viewCart {
  .colLeft {
    height: 34px;
    letter-spacing: 2px;
  }
  .colRight {
    text-align: left;
  }
  .title {
    height: 135px;
    //width:235px ;
    display: flex;
    justify-content: center;
    align-items: center;
    .titleImg {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    text-align: center;
    padding-bottom: 24px;
    .iconAddto::v-deep(.anticon) {
      margin-right: 6px;
      font-size: 24px;
    }
  }
  .titleText {
    padding-left: 10px;
    display: inline-block;
    h2 {
      display: inline-block;
    }
    span {
      margin-left: 5px;
      font-size: 24px;
    }
  }
  .ant-divider-horizontal {
    margin: 0 0 24px 0;
  }
}
</style>
