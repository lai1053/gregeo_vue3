<!-- @format -->

<template>
  <div>
    <a-form
      ref="ruleForm"
      :model="modalForm"
      :rules="rules"
      :label-col="labelCols"
      :wrapper-col="wrapperCols"
    >
      <div class="fromContent">
        <div :style="{ display: 'inline-block', width: '40%', verticalAlign: 'top' }">
          <a-form-item
            ref="name"
            label="公司名称"
            name="name"
          >
            <a-input v-model:value="modalForm.name" />
          </a-form-item>
          <a-form-item
            ref="website"
            label="公司网址"
            name="website"
          >
            <a-input v-model:value="modalForm.website" />
          </a-form-item>
          <a-form-item
            ref="lxdh"
            label="公司电话"
            name="phone"
          >
            <a-input v-model:value="modalForm.phone" />
          </a-form-item>
          <a-form-item
            ref="address"
            label="公司地址"
            name="address"
          >
            <a-input v-model:value="modalForm.address" />
          </a-form-item>
          <a-form-item
            ref="output_type"
            label="产品类型"
            name="output_type"
          >
            <a-input v-model:value="modalForm.output_type" />
          </a-form-item>
          <a-form-item
            ref="yyzz"
            label="营业执照"
            name="yyzz"
          >
            <div class="clearfix">
              <a-upload
                v-model:fileList="fileList"
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :headers="headers"
                :show-upload-list="false"
                :action="actionUrl"
                :data="oss"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img
                  v-if="imageUrls"
                  :src="imageUrls"
                  alt="avatar"
                  :style="{ maxHeight: '150px', maxWidth: '200px' }"
                >
                <div v-else>
                  <!-- todo -->
                  <loading-outlined v-if="loadingUp" />
                  <plus-outlined v-else />
                  <div class="ant-upload-text">
                    点击上传
                  </div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
        </div>
        <div :style="{ display: 'inline-block', width: '40%' }">
          <a-form-item
            ref="industry"
            label="公司行业"
            name="industry"
          >
            <a-select v-model:value="modalForm.industry">
              <a-select-option
                v-for="i in industry"
                :key="i.value"
                @value="i.value"
              >
                {{ i.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            ref="scale"
            label="公司规模"
            name="scale"
          >
            <a-select v-model:value="modalForm.scale">
              <a-select-option
                v-for="i in scale"
                :key="i.value"
                @value="i.value"
              >
                {{ i.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            ref="enterprise_yield"
            label="公司产量"
            name="enterprise_yield"
          >
            <a-select
              v-model:value="modalForm.enterprise_yield"
              placeholder="请选择"
            >
              <a-select-option
                v-for="i in enterprise_yield"
                :key="i.value"
                @value="i.value"
              >
                {{ i.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            ref="status"
            label="业务状态"
            name="status"
          >
            <a-select
              v-model:value="modalForm.status"
              placeholder="请选择"
            >
              <a-select-option
                v-for="i in status"
                :key="i.value"
                @value="i.value"
              >
                {{ i.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            ref="level"
            label="客户级别"
            name="level"
          >
            <a-radio-group v-model:value="modalForm.level">
              <a-radio :value="1">
                一级
              </a-radio>
              <a-radio :value="2">
                二级
              </a-radio>
              <a-radio :value="3">
                三级
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            ref="pay_type"
            label="付款方式"
            name="pay_type"
          >
            <a-radio-group v-model:value="modalForm.pay_type">
              <a-radio value="0">
                其他
              </a-radio>
              <a-radio value="1">
                赊账
              </a-radio>
              <a-radio value="2">
                现结
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            ref="source"
            label="来源"
            name="source"
          >
            <a-radio-group v-model:value="modalForm.source">
              <a-radio value="1">
                指定
              </a-radio>
              <a-radio value="2">
                自主
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import { create, findSingle, upDate, deleteDate, yun_osss_token } from '../../api/clientData'
import { filterFormOld, form, tableData, columns, modalForm, modalFormOld, rules } from './fixedData'
import { PlusOutlined, LoadingOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'EnterpriseInfo',
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data() {
    return {
      modalForm: modalForm,
      rules,
      labelCols: { span: 8 },
      wrapperCols: { span: 16 },
      fileList: [],
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      actionUrl: '',
      changeUrl: '',
      oss: {},
      loadingUp: false,
      imageUrl: '',
      industry: [
        {
          name: '',
          value: 0,
        },
        {
          name: '化工',
          value: 1,
        },
        {
          name: '包材',
          value: 2,
        },
        {
          name: '加工',
          value: 3,
        },
      ],
      scale: [
        {
          name: '',
          value: 0,
        },
        {
          name: '0-20人',
          value: 1,
        },
        {
          name: '21-99人',
          value: 2,
        },
        {
          name: '100-299人',
          value: 3,
        },
        {
          name: '300-499人',
          value: 4,
        },
        {
          name: '500-1000人',
          value: 5,
        },
        {
          name: '1000人以上',
          value: 6,
        },
      ],
      enterprise_yield: [
        {
          name: '',
          value: 0,
        },
        {
          name: '100-500吨',
          value: 1,
        },
        {
          name: '500-999吨',
          value: 2,
        },
        {
          name: '1000吨以上',
          value: 3,
        },
      ],
      status: [
        {
          name: '',
          value: 0,
        },
        {
          name: '潜在客户',
          value: 1,
        },
        {
          name: '签约中',
          value: 2,
        },
        {
          name: '已签约',
          value: 3,
        },
        {
          name: '已完成',
          value: 4,
        },
      ],
    }
  },
  computed: {
    imageUrls() {
      let imgUrl = ''
      if (this.modalForm.photo != null && this.changeUrl === '') {
        imgUrl = this.modalForm.oss_host + this.modalForm.photo
      } else {
        imgUrl = this.changeUrl
      }

      return imgUrl
    },
  },
  mounted() {
    this.modalForm = {}
  },
  methods: {
    async beforeUpload(file) {
      let o = await yun_osss_token()
      const oss = o.result
      this.actionUrl = oss.host
      const obj = {
        success_action_status: 201,
        OSSAccessKeyId: oss.accessid,
        policy: oss.policy,
        Signature: oss.signature,
        key: oss.dir + oss.expire,
      }
      this.modalForm.photo = oss.dir + oss.expire
      this.modalForm.oss_host = oss.host
      this.oss = obj
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleChange(info) {
      /* console.log(info.file);*/
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.changeUrl = imageUrl
        })
        this.imageUrl = this.modalForm.oss_host + this.modalForm.photo
      }
      if (info.file.status === 'error') {
      }
    },
    tableCalbak() {},
  },
}
</script>

<style scoped></style>
