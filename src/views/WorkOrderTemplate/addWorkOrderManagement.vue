<!-- @format -->

<template>
  <div class="addWorkOr">
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      v-bind="formItemLayoutWithOutLabel"
    >
      <a-form-item
        ref="workflow"
        label="选择工作流"
        name="workflow"
        v-bind="formItemLayout"
      >
        <a-select v-model:value="form.workflow">
          <a-select-option
            v-for="i in workflowDataList"
            :key="i.id"
            v-model:value="i.id"
          >
            {{ i.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        ref="name"
        label="工单模板名称"
        name="name"
        v-bind="formItemLayout"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item
        ref="description"
        label="工单模板描述"
        name="description"
        v-bind="formItemLayout"
      >
        <a-textarea
          v-model:value="form.description"
          class="textarea"
        />
      </a-form-item>
      <!-- <a-form-item   // 屏蔽字段为表单无线下拉增加字段内容
       v-for="(domain, index) in form.domains"
       :key="domain.key"
       v-bind="index === 0 ? formItemLayout : {}"
       :label="index === 0 ? '自定义内容描述' : ''"
       :name="['domains', index, 'value']"
       :rules="{
         required: true,
         message: '工单内容不能为空',
         trigger: 'change',
       }"
     >
       <a-input
       v-model:value="domain.value"
       style="width: 90%; margin-right: 8px"
       placeholder="请输入内容"

     />
       <MinusCircleOutlined
         v-if="form.domains.length > 1"
         class="dynamic-delete-button"
         :disabled="form.domains.length === 1"
         @click="removeDomain(domain)"
       />
     </a-form-item>
     <a-form-item
       v-bind="formItemLayoutWithOutLabel"

     >
       <a-button type="dashed" style="width: 60%" @click="addDomain">
         <PlusOutlined /> 添加自定义内容
       </a-button>
     </a-form-item>

     <a-form-item :wrapper-col="{ span: 26, offset: 20 }">
       <a-space >
         <a-button type="primary" @click="addItem">添加</a-button>
         <a-button @click="reset">重置</a-button>
       </a-space>
     </a-form-item>-->
    </a-form>
    <a-divider orientation="left">
      工单列表
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
          <a @click="deletItem(index, record)">删除</a>
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
          label="字段名称"
          name="name"
        >
          <a-input v-model:value="stepForm.name" />
        </a-form-item>
        <a-form-item
          ref="key"
          label="字段标识"
          name="key"
        >
          <a-input v-model:value="stepForm.key" />
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
          ref="required"
          label="是否必选"
          name="required"
        >
          <a-radio-group
            v-model:value="stepForm.required"
            name="radioGroup"
          >
            <a-radio value="0">
              是
            </a-radio>
            <a-radio value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          ref="data_type"
          label="字段类型"
          name="data_type"
        >
          <a-select v-model:value="stepForm.data_type">
            <a-select-option
              v-for="i in data_typeList"
              :key="i.value"
              v-model:value="i.id"
            >
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          ref="placeholder"
          label="占位符描述"
          name="placeholder"
        >
          <a-input v-model:value="stepForm.placeholder" />
        </a-form-item>
        <a-form-item
          ref="help_text"
          label="帮助提示"
          name="help_text"
        >
          <a-input v-model:value="stepForm.help_text" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { getSingleTemplate, getTemplate, delTemplate, postTemplate, putTemplate } from '@/api/workOrderManagement'
import { getWorkflow } from '@/api/workflow' // 获取工作流
import { message } from 'ant-design-vue'
let id = 0
export default {
  name: 'AddWorkOrderManagement',
  components: {
    PlusOutlined,
  },
  props: ['childrenData'],
  data() {
    return {
      index: '',
      workflowDataList: '',
      workflow: true,
      showAddModal: false,
      form: { ...this.childrenData.form },
      rules: {
        name: [{ required: true, message: '工单名称为必填', trigger: 'blur' }],
        describe: [{ required: true, message: '工单内容为必填', trigger: 'blur' }],
        workflow: [{ required: true, message: '工作流内容为必填', trigger: 'blur' }],
      },
      labelCol: {
        span: 4,
      },
      columns: [
        {
          title: '字段名称',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: '字段标识',
          dataIndex: 'key',
          align: 'center',
        },
        {
          title: '排序',
          dataIndex: 'ordering',
          align: 'center',
        },
        {
          title: '字段类型',
          dataIndex: 'data_type',
          align: 'center',
        },
        {
          title: '是否必填',
          dataIndex: 'required',
          align: 'center',
        },
        {
          title: '占位符描述',
          dataIndex: 'placeholder',
          align: 'center',
        },
        {
          title: '帮助提示',
          dataIndex: 'help_text',
          align: 'center',
        },
        {
          width: 150,
          title: '操作',
          dataIndex: 'operate',
          slots: { customRender: 'cz' },
          align: 'center',
        },
      ],
      dataSource: this.childrenData.dataSource,
      wrapperCol: {
        span: 14,
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 16, offset: 4 },
          sm: { span: 16, offset: 4 },
        },
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        },
      },
      workflowColumns: [
        {
          title: '字段名称',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: '字段标识',
          dataIndex: 'key',
          align: 'center',
        },
        {
          title: '排序',
          dataIndex: 'ordering',
          align: 'center',
        },
        {
          title: '字段类型',
          dataIndex: 'data_type',
          align: 'center',
        },
        {
          title: '是否必填',
          dataIndex: 'required',
          align: 'center',
        },
        {
          title: '占位符描述',
          dataIndex: 'placeholder',
          align: 'center',
        },
        {
          title: '帮助提示',
          dataIndex: 'help_text',
          align: 'center',
        },
        {
          width: 150,
          title: '操作',
          dataIndex: 'operate',
          slots: { customRender: 'cz' },
          align: 'center',
        },
      ],
      showStepModalTitle: '工单字段详情',
      stepForm: {
        data_type: '',
      },
      stepRules: {
        name: [{ required: true, message: '字段名称必填', trigger: 'blur' }],
        key: [{ required: true, message: '字段标识必填', trigger: 'blur' }],
        description: [{ required: true, message: '排序为必填', trigger: 'blur' }],
      },
      data_typeList: [
        {
          name: '字符串',
          id: '1',
        },
        /*  {
          name:'数字',
          id:"2"
        },
        {
          name:'浮点数',
          id:"3"
        },
        {
          name:'布尔值',
          id:"4"
        },
        {
          name:'日期',
          id:"5"
        },
        {
          name:'日期时间',
          id:"6"
        },
        {
          name:'单选',
          id:"7"
        },
        {
          name:'多选',
          id:"8"
        },
        {
          name:'下拉选择框',
          id:"9"
        },
        {
          name:'下拉多选',
          id:"10"
        },
        {
          name:'富文本',
          id:"11"
        },
        {
          name:'附件',
          id:"12"
        }*/
      ],
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const isWorkflow = await getWorkflow()
      if (isWorkflow.code === 0) {
        // 数据处理，数字类型的值表单无法校验
        isWorkflow.result.results.forEach(item => {
          item.id = item.id + ''
        })
      }
      this.workflowDataList = isWorkflow.result.results
    },
    addItem() {
      console.log(this.form)
      this.$refs.ruleForm
        .validate()
        .then(res => {
          this.dataSource.push(res)
          this.$refs.ruleForm.resetFields()
        })
        .catch(error => {
          console.log(error)
        })
    },
    reset() {
      this.$refs.ruleForm.resetFields()
    },
    edit(index, record) {
      this.index = index
      this.showStepModalTitle = '编辑'
      this.stepForm = { ...record }
      this.showAddModal = true
    },
    deletItem(index, record) {
      this.dataSource.splice(index, 1)
    },
    addStep() {
      this.showAddModal = !this.showAddModal
    },
    addstepItem() {
      this.$refs.stepForm
        .validate()
        .then(res => {
          if (this.showStepModalTitle === '编辑') {
            const index = this.index
            const obj = { ...this.stepForm }
            this.dataSource.splice(index, 1, obj)
          } else {
            this.dataSource.push(res)
          }
          this.showAddModal = false
          this.$refs.stepForm.resetFields()
        })
        .catch(error => {
          console.log(error)
        })
    },
    onCancel() {
      console.log('onCancel')
      this.$refs.stepForm.resetFields()
    },
    testInput(e) {
      this.stepForm.ordering = e.target.value.replace(/[^\d]/g, '')
    },
  },
}
</script>

<style scoped lang="less">
.addWorkOr {
  /* .textarea{
    height: 150px;
  }
  #describe{
    height: 150px;
  }*/
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.buttonPanding {
  padding: 0 25px 25px 25px;
}
.nowButton {
  padding: 0 25px 25px 25px;
}
</style>
