<template>
  <a-table
    size="small"
    :data-source="dataSource"
    :columns="columns"
    :custom-row="onClickRow"
    :row-selection="{ selectedRowKeys: selectedRowKeys, type: 'radio', onChange: onChange }"
    type="radio"
    :row-key="
      (record, index) => {
        return index
      }
    "
    :pagination="false"
  >
    <template #edit="{ text, index }">
      <editable-cell
        :text="text"
        @change="val => onCellChange(index, 'plan_time', val)"
      />
    </template>
    <template #editContent="{ text, index }">
      <editable-cell
        :text="text"
        @change="val => onCellChange(index, 'content', val)"
      />
    </template>
    <template #editComplete_rate="{ text, index }">
      <editable-cell
        :text="text"
        :numbers="true"
        @change="val => onCellChange(index, 'complete_rate', val)"
      />
    </template>
    <template #operation="{ record, index }">
      <a-switch
        v-model:checked="record.required"
        checked-children="是"
        un-checked-children="否"
        @change="val => onCellChange(index, 'required', val)"
      />
    </template>
    <template #operation2="{ record, index }">
      <a-switch
        v-model:checked="record.complete"
        checked-children="已完成"
        un-checked-children="未完成"
        @change="val => onCellChange(index, 'complete', val)"
      />
    </template>
  </a-table>
  <div class="richText">
    <ProForm
      ref="tableForm"
      :pro-form-data="proFormData"
      @onEditChange="onEditChange"
    />
  </div>
</template>
<script>
import EditableCell from './MetaTableEditableCell'
import ProForm from '@/components/ProForm'
import { Modal, message } from 'ant-design-vue'
export default {
  components: {
    EditableCell,
    ProForm,
  },
  props: ['props', 'childDataChange', 'childData'],
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      dataSource: [],
      columns: [
        {
          title: '任务类型',
          dataIndex: 'name',
          width: '15%',
        },
        {
          title: '必要性',
          dataIndex: 'required',
          width: '10%',
          slots: { customRender: 'operation' },
        },
        {
          title: '计划时间',
          dataIndex: 'plan_time',
          width: '20%',
          slots: { customRender: 'edit' },
        },
        {
          title: '计划内容',
          dataIndex: 'content',

          width: '30%',
          slots: { customRender: 'editContent' },
        },
        {
          title: '完成度',
          width: '10%',
          dataIndex: 'complete_rate',
          slots: { customRender: 'editComplete_rate' },
        },

        {
          title: '状态',
          width: '13%',
          dataIndex: 'complete',
          slots: { customRender: 'operation2' },
        },
      ],
      proFormData: {
        form: {},
        tableEdit: true,
        formConfig: [
          {
            label: '执行过程说明',
            key: 'description',
            component: 'MetaInputText',
            span: 24,
            labelCol: {
              span: 0,
            },

            wrapperCol: {
              span: 24,
              offset: 0,
            },
            props: {
              size: 'large',
              inputType: 'tableCell',
            },
          },
        ],
      },
    }
  },
  computed: {},
  mounted() {
    this.dataSource = this.childData
  },
  methods: {
    onCellChange(key, dataIndex, value, r) {
      const dataSource = [...this.dataSource]
      const target = dataSource[key]
      console.log(key, dataIndex, value, target)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
        //console.log(dataSource);
        this.$emit('childDataChange', dataSource, this.props.key)
      }
    },
    onEditChange(e, path, inputType) {
      const index = this.selectedRowKeys[0]
      if (index === undefined) {
        message.error('请先选择列表里需要添加的条目')
        return
      }
      this.dataSource[index][path] = e
      this.$emit('childDataChange', this.dataSource, this.props.key)
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },

    onClickRow(record, index) {
      return {
        onClick: () => {
          let keys = []
          keys.push(index)
          this.selectedRowKeys = keys
          this.selectedRows = record
          this.richContent(record)
        },
      }
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.richContent(selectedRows[0])
    },
    richContent(data) {
      this.proFormData.form = { ...data }
    },
  },
}
</script>
<style lang="less"></style>
