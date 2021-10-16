<!-- @format -->

<template>
  <div>
    <QuillEditor
      ref="quill"
      v-model:value="quill.content"
      :has-border="quill.border"
      :width="quill.width"
      :placeholder="quill.placeholder"
      :img-accept="quill.imgAccept"
      @change="changes"
      @upload="upload"
      @blur="blur"
    />
  </div>
</template>

<script>
import QuillEditor from '@/components/quill-editor'
import axios from 'axios'
import { yun_osss_token } from '@/api'

export default {
  name: 'MetaRichText',
  components: {
    QuillEditor,
  },
  props: ['props', 'childData', 'childDataChange', 'change'],
  data() {
    return {
      quill: {
        border: true,
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        content: this.childData || '',
        placeholder: '请输入',
        imgAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      },
      actionUrl: '',
    }
  },
  methods: {
    async upload(imgurl, insert) {
      insert(imgurl, 'center')
    },
    changes() {
      const data = this.$refs.quill.getContent()
      this.$emit('childDataChange', data, this.props.key)
    },
    blur() {},
  },
}
</script>

<style scoped lang="less">
.quillEditor {
}
</style>
