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
      <!--          <a-col :span="4" :push="3"> <span>受理人：</span> </a-col>-->
      <!--          <a-col :span="8"><a-input placeholder="请输入你想要查询的受理人" :style="{maxWidth:'300px'}"></a-input></a-col>-->
      <!--          <a-col :span="4" :push="3"> <span>创建人：</span> </a-col>-->
      <!--          <a-col :span="8">-->
      <!--            <a-input placeholder="请输入你想要查询的工作流" :style="{maxWidth:'300px'}"></a-input>-->
      <!--          </a-col>-->
      <!--        </a-row>-->
      <!--        <div :style="{height:'15px'}"></div>-->
      <!--        <a-row>-->
      <!--          <a-col :span="24" :push="21">-->
      <!--            <a-space size="large">-->
      <!--              <a-button type="primary" @click="goUser">查询</a-button>-->
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
          @click="showAddItemModal"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          新增工作流
        </a-button>
      </div>
      <div class="tableRow">
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
              <!--<a @click="view(record)">查看</a>&nbsp;
                <a v-if="text==='2'" @click="takeEffect(record)">生效</a>&nbsp;-->
              <a @click="amend(record)">修改</a>&nbsp;
              <a @click="deletItem(record)">删除</a>
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
      <a-modal
        v-model:visible="showAddModal"
        :title="modalTitle"
        width="960px"
        :destroy-on-close="true"
        @ok="addItemList"
      >
        <addWorkflow
          v-if="!view_show"
          ref="addWorkflow"
          :child-data="childData"
          @load="load"
        />
        <viewShow v-if="view_show" />
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
import { createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { columns, tableData } from './fixdData'
import addWorkflow from './addWorkflow'
import viewShow from '@/views/WorkfowRegulate/viewShow'
import { getWorkflow, getSingleWorkflow, addSingleWorkflow, updataWorkflow, deleteWorkflow } from '@/api/workflow'
export default {
  name: 'Index',
  components: {
    PlusOutlined,
    viewShow,
    addWorkflow,
  }, // 工作流
  props: ['menuKey', 'selectedKeys'],
  data() {
    return {
      clientHeight: document.body.clientHeight - 115 + 'px',
      modalTitle: '',
      loding: true,
      showAddModal: false,
      view_show: false,
      pagination: {
        page: 1, //-- 当前页
        size: 10, //-- 页大小
        count: 50, //--页总数
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },
      dataSource: tableData,
      columns: columns,
      childData: {
        childDtaSource: [
          {
            id: '1',
            stepName: '第一步',
            approvingOfficers: '赖先生',
            addStatus: '已添加',
            cz: '1',
          },
        ],
        childDataForm: {
          name: '412341234',
          description: '12341234',
        },
      },
      childDataOld: {
        childDtaSource: [],
        childDataForm: {
          name: '',
          description: '',
        },
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const res = await getWorkflow()
      if (res.code === 0) {
        this.loding = false
        this.dataSource = res.result.results
        this.pagination.count = res.result.count
      }
    },
    goUser() {
      console.log('查询')
    }, //查询
    reset() {
      //重置
    },
    showAddItemModal() {
      this.modalTitle = '新增工作流'
      this.showAddModal = true
      this.view_show = false
      this.childDataOld.childDtaSource = []
      Object.assign(this.childData, this.childDataOld)
    },
    addItemList() {
      if (this.view_show != true) {
        const dataSource = this.$refs.addWorkflow.dataSource
        const fromData = this.$refs.addWorkflow.form
        if (this.checkForm(dataSource) === false) return
        const arrData = []
        dataSource.forEach(item => {
          arrData.push({
            name: item.name,
            description: item.description,
            ordering: item.ordering * 1,
            type: item.type * 1,
            participant_type: item.participant_type * 1,
            participant_users: item.participant_users_test,
          })
        })
        const data = {
          ...fromData,
          process_list: arrData,
        }
        this.$refs.addWorkflow.$refs.ruleForm
          .validate()
          .then(res => {
            if (this.modalTitle === '修改工作流') {
              this.sendRequest('upData', data)
            } else {
              this.sendRequest('add', data)
            }
          })
          .catch(error => {})
      } else {
        this.showAddModal = false // 查看步骤只有一个
      }
    },
    checkForm(dataSource) {
      let flag = true
      if (dataSource.length === 0) {
        this.$error({
          title: '输入错误',
          content: '工作流步骤不能为空',
        })
        flag = false
      }
      //检查是否有多个状态
      if (dataSource.length < 3) {
        message.error('至少要有一个初始状态，一个结束状态，一个执行状态')
        flag = false
      }
      return flag
    },
    async sendRequest(type, data) {
      if (type === 'add') {
        const res = await addSingleWorkflow(data)
        if (res.code === 0) {
          this.load()
        }
      } else {
        const res = await updataWorkflow(data)
        if (res.code === 0) {
          this.load()
        } else {
          Modal.error({
            title: '错误',
            content: res.message,
          })
          return
        }
      }
      this.showAddModal = false
    },
    onShowSizeChange(current, pageSize) {
      this.pagination.size = pageSize
    },
    view() {
      // 查看
      this.modalTitle = '查看信息'
      this.showAddModal = true
      this.view_show = true
    },
    async takeEffect(record) {
      // 生效
      const that = this
      Modal.confirm({
        title: '确认生效？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '生效后将开始新的工作流',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          console.log(that)
        },
        onCancel() {},
      })
    },
    deletItem(record) {
      //删除
      const that = this
      Modal.confirm({
        title: '你确定要删除此信息么？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确认删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.dele(record)
        },
        onCancel() {
          console.log('取消')
        },
      })
    },
    async dele(record) {
      const a = await deleteWorkflow({ id: record.id })
      if (a.code === 0) {
        this.load()
      } else {
        message.error(a.message)
      }
    },
    async amend(record) {
      this.modalTitle = '修改工作流'

      const data = {
        id: record.id,
      }
      const res = await getSingleWorkflow(data)
      const formData = {
        name: res.result.name,
        description: res.result.description,
        id: res.result.id,
      }
      if (res.code === 0) {
        const data = []

        this.childData.childDataForm = formData
        res.result.process_list.forEach(item => {
          let tex = ''
          item.participant_users.forEach(i => {
            tex = i.username
          })
          data.push({
            name: item.name,
            description: item.description,
            ordering: item.ordering + '',
            type: item.type * 1 + '',
            participant_type: item.participant_type * 1 + '',
            participant_users: tex,
            participant_users_test: item.participant_users,
            participant_usersList: tex,
          })
        })
        this.childData.childDtaSource = data
      }
      this.showAddModal = true
      this.view_show = false
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
  /*  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;*/
}
.nowButton {
  padding: 25px 25px 25px 25px;
}
.tableRow {
  padding: 25px;
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
