<template>
  <a-upload
    v-model:fileList="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="actionUrl"
    :data="oss"
    :disabled="disabled"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="avatar"
    >
    <div v-else>
      <!-- todo -->
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">
        Upload
      </div>
    </div>
  </a-upload>
</template>

<script>
import { yun_osss_token } from '@/api'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  data() {
    return {
      disabled: this.props.disabled,
      actionUrl: '',
      oss: {},
      fileList: [],
      loading: false,
      imageUrl: '',
    }
  },
  mounted() {
    console.log(this.props)
    if (this.childData && this.childData.length > 0) {
      this.fileList = this.childData
    }
  },
  methods: {
    handleChange(info) {
      this.$emit('childDataChange', this.fileList, this.props.key)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
      if (info.file.status === 'error') {
        this.loading = false
      }
    },
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
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
  },
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
