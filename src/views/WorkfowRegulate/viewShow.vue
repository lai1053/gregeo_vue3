<!-- @format -->

<template>
  <div class="viewShow">
    <a-divider orientation="left">
      进度详情
    </a-divider>
    <div :style="{ padding: '45px' }">
      <a-steps
        direction="horizontal"
        :current="now_process"
      >
        <template
          v-for="i in process_list"
          :key="i.id"
        >
          <a-step :title="i.name" />
        </template>
      </a-steps>
    </div>

    <a-divider orientation="left">
      进度处理
    </a-divider>
    <div
      v-if="status < 4"
      :style="{ padding: '25px' }"
    >
      <a-space size="large">
        <a-button
          type="primary"
          @click="liuZhuan"
        >
          流转
        </a-button>
        <a-button @click="reject">
          拒绝
        </a-button>
      </a-space>
    </div>
    <a-divider orientation="left">
      流转日志
    </a-divider>

    <a-list
      bordered
      :data-source="ticket_flow_log_ticket_records"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.handler }}&nbsp;{{ item.process }}&nbsp;{{ item.process_name }}&nbsp;{{ item.suggestion }}&nbsp;{{
            item.ticket_record
          }}&nbsp;
        </a-list-item>
      </template>
      <template #header>
        <div>{{ title }}</div>
      </template>
      <!-- <template #footer>
        <div>当前记录</div>
      </template>-->
    </a-list>

    <a-modal
      v-model:visible="rejectModal"
      title="请输入拒绝的原因"
      width="560px"
      :destroy-on-close="true"
      @ok="onRejectModal"
      @cancel="cancel"
    >
      <a-textarea v-model:value="rejectText" />
    </a-modal>
  </div>
</template>

<script>
import { getSingleWorkflow } from '@/api/workflow'
import { roamPostRecord, viewRecord } from '@/api/workflowRegulate'
import { message, Modal } from 'ant-design-vue'
export default {
  name: 'ViewShow',
  props: ['setloding', 'viewData', 'newViewData'],
  data() {
    return {
      rejectModal: false,
      rejectText: '',
      status: this.viewData.status,
      record: this.viewData.record,
      now_process: this.viewData.now_process,
      process_list: this.viewData.process_list,
      title: this.viewData.title,
      ticket_flow_log_ticket_records: this.viewData.ticket_flow_log_ticket_records,
    }
  },
  mounted() {},
  methods: {
    async liuZhuan() {
      this.$emit('setloding', true)
      const data = {
        id: this.viewData.id,
        log_status: 1,
        suggestion: '',
      }
      const res = await roamPostRecord(data)
      if (res.code != 0) {
        Modal.error({
          title: '请求失败',
          content: res.message,
        })
        return
      } else {
        this.updeView() // 更新数据源
      }
      this.rejectText = {}
      this.$emit('setloding', false)
    },
    async reject() {
      this.rejectModal = !this.rejectModal
    },
    async onRejectModal() {
      this.$emit('setloding', true)
      const data = {
        id: this.viewData.id,
        log_status: 2,
        suggestion: this.rejectText,
      }
      const res = await roamPostRecord(data)
      if (res.code != 0) {
        Modal.error({
          title: '请求失败',
          content: res.message,
        })
        this.$emit('setloding', false)
      } else {
        this.updeView() //更新视图
        this.rejectText = {}
      }
      this.$emit('setloding', false)
    },
    cancel() {
      this.rejectText = ''
    },
    async updeView() {
      const record = this.record
      console.log(record)
      const workflow = await getSingleWorkflow({ id: record.workflow })
      const res = await viewRecord({ id: record.id })
      if (workflow.code != 0 || res.code != 0) {
        message.error({
          title: '请求失败',
        })
        return
      }
      const now_process = workflow.result.process_list.findIndex(item => item.id === res.result.now_process)
      /* let viewShowData={
        record,
        id:res.result.id,
        process_list:workflow.result.process_list, // 当前进度数组
        now_process:now_process,//当前处在第几位子
        ticket_flow_log_ticket_records:res.result.ticket_flow_log_ticket_records, // 日志数据
        title:res.result.title
      }*/
      this.process_list = workflow.result.process_list
      this.now_process = now_process
      this.ticket_flow_log_ticket_records = res.result.ticket_flow_log_ticket_records
      this.title = res.result.title
      this.status = res.result.status
    },
  },
}
</script>

<style scoped lang="less">
.viewShow {
  padding: 25px;
}
</style>
