<!-- @format -->

<template>
  <div class="addRegulae">
    <div class="form">
      <a-form
        ref="ruleForm"
        :model="modalForm"
        :rules="rules"
        :label-col="labelCols"
        :wrapper-col="wrapperCols"
      >
        <a-form-item
          ref="title"
          label="标题"
          name="title"
        >
          <a-input v-model:value="modalForm.title" />
        </a-form-item>
        <a-form-item
          ref="ticket_template"
          label="模板ID"
          name="ticket_template"
        >
          <a-select
            v-model:value="modalForm.ticket_template"
            placeholder="请选择您的工单模板"
            @change="selectTemplate"
          >
            <a-select-option
              v-for="i in template"
              :key="i.id"
            >
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!--   <a-form-item ref="current_process" label="当前进度名称" name="current_process">
          <a-input v-model:value="modalForm.current_process"></a-input>
        </a-form-item>
        <a-form-item ref="status" label="当前工单状态" name="status">
          <a-input v-model:value="modalForm.status"></a-input>
        </a-form-item>-->
        <template
          v-for="i in templateList"
          :key="i.id"
        >
          <a-form-item
            :ref="i.help_text"
            :label="i.help_text"
            :name="i.help_text"
          >
            <a-input v-model:value="form_data[i.help_text]" />
          </a-form-item>
          <!--<a-form-item :ref="i.key" :label="i.key" :name="i.key">
            <a-input v-model:value="form_data[i.key]"></a-input>
          </a-form-item>-->
          <a-form-item
            :ref="i.name"
            :label="i.name"
            :name="i.name"
          >
            <a-input v-model:value="form_data[i.name]" />
          </a-form-item>
          <a-form-item
            :ref="i.placeholder"
            :label="i.placeholder"
            :name="i.placeholder"
          >
            <a-input v-model:value="form_data[i.placeholder]" />
          </a-form-item>
        </template>
        <a-form-item>
          <div class="formButton">
            <a-space size="large">
              <a-button
                type="primary"
                @click="submit"
              >
                确定
              </a-button>
              <a-button @click="reset">
                重置
              </a-button>
            </a-space>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getTemplate, getSingleTemplate } from '@/api/workOrderManagement'
import { postRecord, putRecord } from '@/api/workflowRegulate'
import { Modal } from 'ant-design-vue'
import { modalForm } from '@/views/ClitenData/fixedData'
export default {
  name: 'AddRegulae',
  props: ['childData', 'putPost'],
  data() {
    return {
      modalForm: {
        ...this.childData,
      },
      form_data: {
        ...this.childData.form_data,
      },
      rules: {},
      labelCols: { span: 8 },
      wrapperCols: { span: 16 },
      template: [
        {
          id: '1',
          name: '模板一',
        },
        {
          id: '2',
          name: '模板二',
        },
      ],
      templateList: [],
      formItemLayout: {
        labelCol: {
          span: 20,
          push: 15,
        },
        wrapperCol: {
          span: 4,
        },
      },
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    async selectTemplate(i) {
      const res = await getSingleTemplate({ id: i })
      console.log(res)
      if (res.code === 0) {
        this.templateList = res.result.field_list
      }
    },
    async getTemplateList() {
      const res = await getTemplate()
      if (res.code === 0) {
        this.template = res.result.results
      } else {
        Modal.error({
          content: res.message,
        })
      }
    },
    submit() {
      this.$refs.ruleForm
        .validate()
        .then(res => {
          this.sendDataForm()
        })
        .catch(err => {
          console.log(err)
        })
    },
    async sendDataForm() {
      let res
      const data = {
        ...this.modalForm,
        form_data: this.form_data,
      }

      if (this.putPost) {
        res = await putRecord(data)
      } else {
        res = await postRecord(data)
      }

      if (res.code === 0) {
        this.$success({
          title: this.putPost ? '成功' : '成功',
          content: '您可以继续留在此页面新增信息或者返回上一层查看信息',
        })
        this.form_data = {}
        this.modalForm = {}
        //this.childData = {}
      } else {
        this.$error({
          title: '提交失败',
          content: res.message,
        })
      }
    },
    reset() {},
  },
}
</script>

<style scoped lang="less">
.addRegulae {
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  .form {
    width: 540px;
  }
  .formButton {
    width: 540px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
