<!-- @format -->

<template>
  <a-spin
    tip="数据加载中"
    :delay="300"
    :spinning="loding"
  >
    <div class="workOrderManagement">
      <!--      <div class="searchInput">-->
      <!--        <a-row>-->
      <!--          <a-col :span="4" :push="3"> <span>提交人：</span> </a-col>-->
      <!--          <a-col :span="8"><a-input placeholder="请输入你想要查询的信息" :style="{maxWidth:'300px'}"></a-input></a-col>-->
      <!--          <a-col :span="4" :push="3"> <span>受理人：</span> </a-col>-->
      <!--          <a-col :span="8">-->
      <!--            <a-input placeholder="请输入你想要查询的信息" :style="{maxWidth:'300px'}"></a-input>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--        <div :style="{height:'15px'}"></div>-->
      <!--        <a-row>-->
      <!--          <a-col :span="24" :push="21">-->
      <!--            <a-space size="large">-->
      <!--              <a-button type="primary" @click="search">查询</a-button>-->
      <!--              <a-button @click="reset">重置</a-button>-->
      <!--            </a-space>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--      </div>-->
      <!--      <a-divider />-->
      <div class="nowButton">
        <a-button
          class="menu"
          type="primary"
          @click="addList('add')"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          新增工单模板
        </a-button>
      </div>
      <div class="nowButton">
        <a-table
          :data-source="dataSource"
          :columns="columns"
          :pagination="false"
          :row-key="
            (record, index) => {
              return index
            }
          "
          bordered
        >
          <template #cz="{ record }">
            <span>
              <!-- <a @click="view(record)">查看</a>&nbsp;-->
              <a @click="modification(record)">修改</a>&nbsp; <a @click="deletItem(record)">删除</a>&nbsp;
            </span>
          </template>
        </a-table>
        <div class="pagination">
          <a-pagination
            v-model:current="pagination.page"
            :page-size="pagination.size"
            :total="pagination.count"
            :page-size-options="pagination.pageSizeOptions"
            show-size-changer
            @showSizeChange="onShowSizeChange"
          >
            <template #buildOptionText="props">
              <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
              <span v-else>全部</span>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="showAddModal"
      :title="modalTitle"
      width="960px"
      :destroy-on-close="true"
      @ok="addItemList"
    >
      <addWorkOrderManagement
        v-if="!view_show"
        ref="WorkOrderManagement"
        :children-data="childrenData"
      />
      <viewShow v-if="view_show" />
    </a-modal>
  </a-spin>
</template>

<script>
import { createVNode } from 'vue'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { columns, tableData } from './fixedData'
import { Modal, message } from 'ant-design-vue'
import viewShow from '@/views/WorkfowRegulate/viewShow'
import addWorkOrderManagement from '@/views/WorkOrderTemplate/addWorkOrderManagement'
import { getSingleTemplate, getTemplate, delTemplate, postTemplate, putTemplate } from '@/api/workOrderManagement'
export default {
  name: 'Index',
  components: {
    PlusOutlined,
    viewShow,
    addWorkOrderManagement,
  }, // 工单管理
  props: ['menuKey', 'selectedKeys'],
  data() {
    return {
      loding: true,
      showAddModal: false,
      modalTitle: '',
      view_show: false,
      pagination: {
        page: 1, //-- 当前页
        size: 10, //-- 页大小
        count: 50, //--页总数
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },
      dataSource: tableData,
      columns: columns,
      childrenData: {
        form: {
          name: '',
          describe: '',
        },
        dataSource: [],
      },
      childrenDataOld: {
        form: {
          name: '',
          describe: '',
        },
        dataSource: [],
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const res = await getTemplate()
      if (res.code == 0) {
        this.loding = false
        this.dataSource = res.result.results
        this.pagination.count = res.result.count
      } else {
        message.error(res.message)
      }
    },
    onShowSizeChange(current, pageSize) {
      this.pagination.size = pageSize
    },
    async addList() {
      this.loding = true
      this.loding = false

      this.modalTitle = '新增'
      this.view_show = false
      this.showAddModal = true

      this.loding = false
    },
    view(record) {
      this.modalTitle = '查看'
      this.view_show = true
      this.showAddModal = true
    },
    async modification(record) {
      const data = {
        id: record.id,
      }
      const res = await getSingleTemplate(data)
      console.log(res)
      if (res.code === 0) {
        this.childrenData = {
          form: {
            ...res.result,
          },
          dataSource: res.result.field_list,
        }
      }
      this.showAddModal = !this.showAddModal
      this.view_show = false
      this.modalTitle = '修改'
    },
    deletItem(record) {
      const that = this
      Modal.confirm({
        title: '你确定要删除此信息么？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          const data = {
            id: record.id,
          }
          that.delet(data)
        },
        onCancel() {
          console.log('取消')
        },
      })
    },
    async delet(data) {
      const res = await delTemplate(data)
      if (res.code === 0) {
        this.load()
      }
    },
    search() {
      console.log('搜索')
    },
    reset() {},
    async addItemList() {
      const sendData = this.$refs.WorkOrderManagement.form
      const sendArr = this.$refs.WorkOrderManagement.dataSource
      let res
      const data = {
        ...sendData,
        field_list: sendArr,
      }
      if (data.field_list.length === 0) {
        message.error('缺少工单模板必填信息')
        return
      }
      if (this.modalTitle === '修改') {
        res = await putTemplate(data)
      } else {
        res = await postTemplate(data) //新增操作
      }

      if (res.code === 0) {
        this.load()
      }

      this.showAddModal = !this.showAddModal
      Object.assign(this.childrenData, this.childrenDataOld)
    },
  },
}
</script>

<style scoped lang="less">
.workOrderManagement {
  display: flex;
  flex-direction: column;
}
.searchInput {
  padding: 25px 0px 0px 25px;
  .ant-row {
    align-items: center;
  }
}
.nowButton {
  padding: 25px 25px 25px 25px;
}
.pagination {
  height: 65px;
  padding-top: 15px;
  .ant-pagination {
    position: absolute;
    right: 10px;
  }
}
</style>
