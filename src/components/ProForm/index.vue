<!-- @format -->

<template>
  <a-form
    ref="ruleForm"
    class="formRule"
    :layout="componentData.layout"
    :model="componentData.form"
  >
    <a-row>
      <a-col
        v-for="i in componentData.formConfig"
        :key="i.key"
        :span="i.span"
        :md="i.md"
        :sm="i.sm"
      >
        <p
          v-if="i.h3"
          class="formH3"
        />
        <div>
          <li>
            <h2 :span="i.span">
              {{ i.h3 }}
            </h2>
          </li>
        </div>

        <a-form-item
          :id="i.component === 'MetaRichText' ? 'metaRichTextItem' : 'Item'"
          :key="i.key"
          :ref="i.key"
          :colon="false"
          :label-align="i.labelAlign"
          :name="i.key"
          :rules="i.rules"
          :label-col="i.labelCol"
          :wrapper-col="i.wrapperCol"
        >
          <template #label>
            <span>{{ i.label }} &nbsp;
              <a-tooltip
                v-if="i.tooltip"
                :title="i.tooltip"
              >
                <QuestionCircleOutlined
                  class="QuestionCircleOutlined"
                /></a-tooltip>
            </span>
          </template>
          <component
            :is="i.component"
            v-model:value="componentData.form[i.key]"
            :props="i.props"
            :child-data="componentData.form[i.key]"
            @change="
              e => {
                checkValueType(e, i.key, i.props.inputType || '')
              }
            "
            @childDataChange="childDataChange"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { getRefOption } from '@/api'
import { createFromIconfontCN, QuestionCircleOutlined } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2324251_pm04guj7o19.js',
})
export default {
  name: 'Index',
  components: {
    IconFont,
    QuestionCircleOutlined,
  },
  props: {
    proFormData: Object,
    onEditChange: Function,
  },
  data() {
    return {
      componentData: {},
    }
  },
  watch: {
    proFormData: {
      handler(value, oldValue) {
        const data = cloneDeep(value)
        const schema = JSON.parse(localStorage.getItem('schema'))
        data.formConfig.forEach(i => {
          if (i.schemaOption) {
            i.props.option = schema[i.schemaOption].fields[i.key].choices
          }
        })

        this.componentData = { ...data }
      },
      deep: true,
    },
  },
  created() {
    this.optionConfig()
  },
  methods: {
    async optionConfig() {
      const schema = JSON.parse(localStorage.getItem('schema'))
      const data = cloneDeep(this.proFormData)
      data.formConfig.forEach(i => {
        // if(i.ref){
        //   let refUrl = i.ref.replace('__','/')
        //   const url = `api/manage/${refUrl}/`
        //   const res = await getRefOption(url)
        //   res.result.forEach((j)=>{
        //     j.value = j.id
        //   })
        //   i.props.option = res.result
        // }
        if (i.schemaOption) {
          i.props.option = schema[i.schemaOption].fields[i.key].choices
        }
      })

      this.componentData = { ...data }
    },
    childDataChange(value, path, type) {
      if (this.proFormData.tableEdit) {
        //表单内又欠表单的子级嵌套
        this.$emit('onEditChange', value)
        return
      }
      if (type === 'push') {
        let arr = this.componentData.form[path] || []
        arr.push(value)
        let arr2 = Array.from(new Set(arr))
        //
        this.componentData.form[path] = arr2
        return
      }
      this.componentData.form[path] = value
    },
    checkValueType(e, path, inputType) {
      if (!inputType) return
      if (inputType) {
        let data = e
        switch (inputType) {
          case 'tableCell': // 表格所需要的对象
            data = e.target.value
            //console.log(e.target.value, path, inputType);
            this.$emit('onEditChange', data, path, inputType)
            break
          case 'number': // 输入限定为数字
            data = e.target.value.replace(/[^\d\.]/g, '')
            break
          case 'datePickerDay': // 日期 天
            if (e === null) return
            data = moment(e).format('YYYY-MM-DD')
            break
          case 'datePickerMonth': //日期 月
            if (e === null) return
            data = moment(e).format('YYYY-MM')
            break
          case 'datePickerRange': //日期 月
            if (e === null) return
            if (e.length === 0) {
              data = []
            } else {
              data = [moment(e[0]).format('YYYY-MM-DD'), moment(e[1]).format('YYYY-MM-DD')]
            }
            this.componentData.form.start_time = moment(e[0]).format('YYYY-MM-DD')
            this.componentData.form.end_time = moment(e[1]).format('YYYY-MM-DD')
            break
        }
        this.componentData.form[path] = data
      }
    },
  },
}
</script>

<style scoped lang="less">
.QuestionCircleOutlined {
  color: #1890ff;
}
.formH3 {
  display: inline-block;
  height: 20px;
  h2 {
    margin-bottom: 0px !important;
  }
}
.formRule {
  .ant-col .ant-col-4 .ant-form-item-label .ant-form-item-label-left {
    line-height: 32px !important;
  }
  .ant-form-item-label {
    line-height: 32px !important;
  }
  .ant-form-item-control {
    line-height: 25px !important;
    .ant-form-item-label {
      line-height: 32px !important;
    }
  }
  .ant-form-item {
    margin-bottom: 0px !important;
    .ant-form-item-label {
      line-height: 32px !important;
    }
    .ant-form-item-control {
      line-height: 25px !important;
      .ant-form-item-label {
        line-height: 32px !important;
      }
      .quill-editor {
        .ant-form-item-control {
          line-height: 25px !important;
        }
      }
    }
  }
}
#metaRichTextItem {
  line-height: 25px !important;
  .ant-form-item-control {
    line-height: 25px !important;
  }
}
</style>
