<!-- @format -->

<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :action="actionUrl"
      :data="oss"
      :disabled="disabled"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < (props.maxLength ? props.maxLength : 6)">
        <plus-outlined />
        <div class="ant-upload-text">
          点击上传
        </div>
      </div>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        alt="example"
        style="width: 100%"
        :src="previewImage"
      >
    </a-modal>
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { yun_osss_token } from '@/api'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  components: {
    PlusOutlined,
  },
  props: ['props', 'childData', 'childDataChange'],
  data() {
    return {
      actionUrl: '',
      oss: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      disabled: this.props.disabled,
    }
  },
  watch: {
    childData: {
      handler(value, oldValue) {
        this.fileList = value
      },
      deep: true,
    },
  },
  mounted() {
    if (this.childData && this.childData.length > 0) {
      this.fileList = this.childData
    }
  },
  methods: {
    async beforeUpload(file) {
      let o = await yun_osss_token()
      const oss = o.result
      const obj = {
        success_action_status: 201,
        OSSAccessKeyId: oss.accessid,
        policy: oss.policy,
        Signature: oss.signature,
        key: oss.dir + oss.expire,
      }
      this.actionUrl = oss.host
      this.oss = obj
      file.uid = oss.expire
      file.photo = oss.dir + oss.expire
      file.url = this.actionUrl + oss.dir + oss.expire
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      console.log(fileList, '这里发生了改变')
      this.fileList = fileList
      this.$emit('childDataChange', this.fileList, this.props.key)
    },
  },
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
