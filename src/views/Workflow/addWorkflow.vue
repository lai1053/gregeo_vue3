<!-- @format -->

<template>
  <div class="addWorkflow">
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        ref="name"
        label="工作流名称"
        name="name"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item
        ref="description"
        label="工作流描述"
        name="description"
      >
        <a-textarea v-model:value="form.description" />
      </a-form-item>
    </a-form>
    <a-divider orientation="left">
      流程配置
    </a-divider>
    <div class="nowButton">
      <a-button
        class="menu"
        type="primary"
        @click="addStep"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        添加步骤
      </a-button>
    </div>
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
      <template #cz="{ index, record }">
        <span>
          <a @click="edit(index, record)">编辑</a>&nbsp;
          <a @click="deletItem(record)">删除</a>
        </span>
      </template>
    </a-table>
    <a-modal
      v-model:visible="showAddModal"
      :title="showStepModalTitle"
      @ok="addstepItem"
      @cancel="onCancel"
    >
      <a-form
        ref="stepForm"
        :model="stepForm"
        :rules="stepRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item
          ref="name"
          label="步骤名称"
          name="name"
        >
          <a-input v-model:value="stepForm.name" />
        </a-form-item>
        <a-form-item
          ref="type"
          label="步骤类型"
          name="type"
        >
          <a-select
            v-model:value="stepForm.type"
            placeholder="请选择对应的状态"
          >
            <a-select-option value="1">
              初始状态
            </a-select-option>
            <a-select-option value="0">
              执行状态
            </a-select-option>
            <a-select-option value="2">
              完成状态
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          ref="participant_type"
          label="审批类型"
          name="participant_type"
        >
          <a-select
            v-model:value="stepForm.participant_type"
            placeholder="请选择对应的状态"
          >
            <a-select-option value="0">
              无人处理
            </a-select-option>
            <a-select-option value="1">
              单人处理
            </a-select-option>
            <a-select-option value="2">
              多人处理
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          ref="participant_users"
          label="审批人员"
          name="participant_users"
        >
          <a-select
            v-model:value="stepForm.participant_users"
            show-search
            placeholder="请输入您要搜索的审批人"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option
              v-for="d in stepForm.data"
              :key="d.value"
            >
              {{ d.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          ref="ordering"
          label="步骤顺序"
          name="ordering"
        >
          <a-input
            v-model:value="stepForm.ordering"
            :style="{ width: '50px' }"
            @change="testInput"
          />当前执行顺序排在第{{ stepForm.ordering }}位
        </a-form-item>
        <a-form-item
          ref="description"
          label="步骤描述"
          name="description"
        >
          <a-textarea v-model:value="stepForm.description" />
        </a-form-item>
      </a-form>
      <span>温馨提示：执行顺序不可重复，系统会按照您的执行程序排列优先级</span>
    </a-modal>
  </div>
</template>

<script>
import jsonp from 'fetch-jsonp'
import querystring from 'querystring'
let timeout
let currentValue
import { createVNode } from 'vue'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { fuzzy_query } from '@/api/workflow'
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    })
    const urlOld = `https://suggest.taobao.com/sug?${str}`
    //const url = `https://api.grewalleco.com/api/user/fuzzy_query/?username=${value}`
    const url = `http://192.168.0.102:80/api/user/user/fuzzy_query/?username=${value}`
    fuzzy_query({ username: value }).then(d => {
      if (d.code === 0) {
        const data = []
        let tests = []
        d.result.forEach(item => {
          tests.push(item.id)
          data.push({
            value: item.id,
            text: item.username,
            test: tests,
          })
        })
        callback(data)
      }
    })
    /*  jsonp(url)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });*/
  }

  timeout = setTimeout(fake, 300)
}
export default {
  name: 'AddWorkflow',
  components: {
    PlusOutlined,
  },
  props: ['load', 'childData'],
  data() {
    return {
      showStepModalTitle: '添加步骤',
      showAddModal: false,
      index: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        ...this.childData.childDataForm,
      },
      dataSource: this.childData.childDtaSource,
      sendDataSource: [],
      rules: {
        name: [{ required: true, message: '工作流名称为必填', trigger: 'blur' }],
        description: [{ required: true, message: '工作流内容为必填', trigger: 'blur' }],
      },
      stepForm: {
        name: '',
        type: '',
        participant_users: '',
        participant_type: '',
        ordering: '',
        description: '',
        data: [],
        value: undefined,
      },
      stepFormOld: {
        name: '',
        type: '',
        participant_users: '',
        participant_type: '',
        ordering: '',
        description: '',
        data: [],
        value: undefined,
      },
      stepRules: {
        name: [{ required: true, message: '步骤名称为必填', trigger: 'blur' }],
        type: [{ required: true, message: '步骤类型为必填', trigger: 'blur' }],
        /* participant_users:[
          { required: true, message: '审批人员为必填', trigger: 'blur' }
        ],*/
        participant_type: [{ required: true, message: '审批类型为必填', trigger: 'blur' }],
        ordering: [{ required: true, message: '步骤顺序为必填', trigger: 'change' }],
        description: [{ required: true, message: '步骤描述为必填', trigger: 'blur' }],
      },
      columns: [
        {
          title: '步骤顺序',
          dataIndex: 'ordering',
          align: 'center',
        },
        {
          title: '步骤名称',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: '步骤描述',
          dataIndex: 'description',
          align: 'center',
        },
        {
          title: '步骤类型',
          dataIndex: 'type',
          align: 'center',
        },
        {
          title: '审批人员',
          dataIndex: 'participant_usersList',
          align: 'center',
        },
        {
          title: '审批状态',
          dataIndex: 'participant_type',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'cz',
          slots: { customRender: 'cz' },
          align: 'center',
        },
      ],
    }
  },
  methods: {
    handleSearch(value) {
      fetch(value, data => (this.stepForm.data = data))
    },
    handleChange(value) {
      this.stepForm.value = value
      fetch(value, data => (this.stepForm.data = data))
    },
    testInput(e) {
      this.stepForm.ordering = e.target.value.replace(/[^\d]/g, '')
    },
    addStep() {
      Object(this.stepForm, this.stepFormOld)
      this.showStepModalTitle = '添加步骤'
      this.showAddModal = true
    },
    adddiv() {
      this.dataSource.splice(this.index, 1)
    },
    edit(index, record) {
      this.index = index
      this.showStepModalTitle = '编辑步骤'
      this.stepForm = { ...record }
      this.showAddModal = true
    },
    deletItem() {
      this.dataSource.splice(this.index, 1)
    },
    async addstepItem() {
      this.$refs.stepForm
        .validate()
        .then(res => {
          //检查ID是否相同
          let idFlag = false

          this.dataSource.forEach(item => {
            if (item.ordering === res.ordering) {
              idFlag = true
            }
          })
          if (idFlag) {
            message.error('执行步骤不能相同')
            return
          }
          let participant_users_list = ''

          if (this.stepForm.data) {
            this.stepForm.data.forEach(item => {
              if (item.value === res.participant_users) {
                participant_users_list = item.text
              }
            })
          }
          const obj = {
            name: res.name,
            description: res.description,
            ordering: res.ordering * 1,
            type: res.type * 1,
            participant_type: res.participant_type * 1,
            participant_users: res.participant_users,
            participant_users_test: res.participant_users ? [res.participant_users] : [],
            participant_usersList: participant_users_list,
          }

          if (this.showStepModalTitle === '编辑步骤') {
            const index = this.index

            this.dataSource.splice(index, 1, obj)
          } else {
            this.dataSource.push(obj)
          }
          this.$refs.stepForm.resetFields()
          Object.assign(this.stepForm)
          this.showAddModal = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    onCancel() {
      console.log('onCancel')
      this.$refs.stepForm.resetFields()
    },
  },
}
</script>

<style scoped lang="less">
.addWorkflow {
  min-width: 900px;
}
.nowButton {
  padding: 0 25px 25px 25px;
}
</style>
