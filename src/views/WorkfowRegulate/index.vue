<!-- @format -->

<template>
  <a-spin
    tip="数据加载中"
    :delay="300"
    :spinning="loding"
  >
    <div
      v-if="!addFlag"
      class="workflowRegulate"
    >
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
          @click="newAdd"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          新增工单
        </a-button>
      </div>
      <a-table
        class="nowButton"
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
            <a @click="view(record)">查看</a>&nbsp; <a @click="modification(record)">修改</a>&nbsp;
            <a @click="deletItem(record)">删除</a>&nbsp;
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
    <div v-if="addFlag">
      <div class="newAddButton">
        <a-button @click="onOff">
          返回上一层
        </a-button>
      </div>
      <addRegulae
        v-if="!isView"
        :child-data="childData"
        :add-flag="addFlag"
        :put-post="putPost"
      />
      <viewShow
        v-if="isView"
        :view-data="viewShowData"
        @setloding="setloding"
      />
    </div>
  </a-spin>
</template>

<script>
import { createVNode } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { getRecord, getSinRecord, delRecord, viewRecord } from '@/api/workflowRegulate'
import { getSingleWorkflow } from '@/api/workflow'
import addRegulae from '@/views/WorkfowRegulate/addRegulae'
import viewShow from '@/views/WorkfowRegulate/viewShow'
import { message, Modal } from 'ant-design-vue'
export default {
  name: 'Index',
  components: {
    PlusOutlined,
    addRegulae,
    viewShow,
  },
  data() {
    return {
      loding: true,
      addFlag: false,
      putPost: false,
      isView: false,
      dataSource: [],
      columns: [
        {
          title: 'title',
          dataIndex: 'title',
        },
        {
          title: 'current_process',
          dataIndex: 'current_process',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          width: 150,
          align: 'center',
        },
      ],
      childData: {},
      viewShowData: '',
      pagination: {
        page: 1, //-- 当前页
        size: 10, //-- 页大小
        count: 50, //--页总数
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const res = await getRecord()
      if (res.code === 0) {
        // /*  const columnsObj = res.result.results[0].form_data
        //   let columnsData = [],dataSourceData=[]
        //   Object.keys(columnsObj).forEach((key)=>{
        //     columnsData.push({
        //       title:key,
        //       dataIndex:key
        //     })
        //   })
        //   columnsData.push({
        //     title: '操作',
        //     dataIndex: 'cz',
        //     slots: { customRender: 'cz' },
        //     width:150,
        //     align:'center'
        //   },)*/
        //   res.result.results.forEach((i)=>{
        //     i.form_data.id = i.id
        //     dataSourceData.push(i.form_data)
        //   })

        this.dataSource = res.result.results
        this.pagination.count = res.result.count
      } else {
        Modal.error({
          title: '请求失败',
          content: 'ces',
        })
      }
      this.loding = false
    },
    onOff() {
      this.addFlag = !this.addFlag
      this.load()
    },
    newAdd() {
      this.isView = false
      this.addFlag = !this.addFlag
      this.childData = {}
    },
    search() {},
    reset() {},
    addList() {},
    // 查看
    async view(record) {
      const workflow = await getSingleWorkflow({ id: record.workflow })
      const res = await viewRecord({ id: record.id })
      if (workflow.code != 0 || res.code != 0) {
        message.error({
          title: '请求失败',
        })
        return
      }
      const now_process = workflow.result.process_list.findIndex(item => item.id === res.result.now_process)
      let viewShowData = {
        record: record,
        status: res.result.status,
        id: res.result.id,
        process_list: workflow.result.process_list, // 当前进度数组
        now_process: now_process, //当前处在第几位子
        ticket_flow_log_ticket_records: res.result.ticket_flow_log_ticket_records, // 日志数据
        title: res.result.title,
      }
      this.viewShowData = viewShowData

      this.addFlag = !this.addFlag
      this.isView = true
    },

    //修改
    async modification(record) {
      this.isView = false
      const res = await getSinRecord({ id: record.id })
      if (res.code === 0) {
        this.childData = res.result
        this.onOff()
        this.putPost = true
      } else {
        this.$error({
          content: res.message,
        })
      }
    },
    //删除
    deletItem(record) {
      const that = this
      Modal.confirm({
        title: '你确定要删除此信息么？',
        content: '确认删除？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.delet(record.id)
        },
        onCancel() {
          console.log('取消')
        },
      })
    },
    async delet(data) {
      const res = await delRecord({ id: data })
      if (res.code === 0) {
        this.load()
      }
    },
    onShowSizeChange() {},
    setloding(B) {
      this.loding = B
    },
  },
}
</script>

<style scoped lang="less">
.workflowRegulate {
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
