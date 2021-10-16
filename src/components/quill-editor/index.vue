<!-- @format -->

<template>
  <div
    ref="quillEditorBox"
    class="quill-editor"
    :class="{
      'quill-fullscreen': isFullscreen,
      'quill-no-border': !hasBorder,
      disabled: disabled,
    }"
    :style="{
      width: isFullscreen ? '' : width + 'px',
      height: isFullscreen ? '' : height + 'px',
      zIndex: zIndex,
    }"
  >
    <div ref="quillEditor" />
    <input
      ref="img-input"
      type="file"
      :accept="imgAccept"
      style="display: none"
    >
    <div ref="img-input2">
      <a-upload
        style="display: none"
        :action="actionUrl"
        :file-list="fileList"
        :data="oss"
        class="upload"
        type="file"
        :accept="imgAccept"
        :before-upload="beforeUpload"
        @change="
          val => {
            this.handleChange(val)
          }
        "
      >
        <div style="display: none">
          <div
            style="display: none"
            class="ant-upload-text"
          >
            点击上传
          </div>
        </div>
      </a-upload>
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import toolbar from './toolbar'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import icons from './icons'
import { ImageResize } from './modules/image-resize'
import './quill-editor.css'
import { yun_osss_token } from '@/api'
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'QuillEditor',
  props: {
    id: String,
    value: String,
    width: Number,
    height: Number,
    placeholder: String,
    toolbar: [Object, Array],
    zIndex: [String, Number],
    fullscreen: {
      type: Boolean,
      default: false,
    },
    syncOutput: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'snow',
    },
    hasBorder: Boolean,
    disabled: Boolean,
    imgAccept: String,
    showFullButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fileList: [],
      actionUrl: '',
      oss: '',
      imgurl: '',
      content: '',
      isFullscreen: this.fullscreen,
      quill: null,
      Quill: Quill,
    }
  },
  watch: {
    fullscreen(val) {
      this.isFullscreen = val
    },
    value(val, oldVal) {
      if (val !== this.content) {
        this.setContent(val)
      }
    },
    disabled(val, oldVal) {
      this.setDisabled(val)
    },
  },
  mounted() {
    this.createQuill()
    // console.log(this.props,this.placeholder,this,'this.placeholder ');
  },
  methods: {
    createQuill() {
      let quillEditor = this.$refs.quillEditor

      let quill = new Quill(quillEditor, {
        debug: 'warn',
        modules: {
          formula: false,
          syntax: false,
          history: {
            delay: 1000,
            userOnly: true,
          },
          imageResize: {
            displaySize: true,
          },
          toolbar: this.toolbar || toolbar,
        },
        placeholder: this.placeholder || '这里输入内容...',
        // bounds: '#editor-container',
        theme: this.theme, // bubble / snow
      })

      if (this.theme === 'snow' && this.showFullButton) {
        this.initFullBtn()
      }

      this.quill = quill

      // init content
      this.setContent(this.value)

      // init img control
      //this.initImgInput()

      quill.on('text-change', delta => {
        this.content = this.getContent()
        // console.log('text-change', this.content)
        if (this.syncOutput) {
          this.$emit('input', this.content)
        }
        this.$emit('change', this.quill)
      })

      quill.on('selection-change', range => {
        if (!range) {
          this.$emit('blur', this.quill)
        } else {
          this.$emit('focus', this.quill)
        }
      })

      this.$emit('init', quill, this)
    },
    initFullBtn() {
      let childs = this.$refs.quillEditorBox.children
      let fullBtn = document.createElement('SPAN')
      fullBtn.className = 'ql-formats ql-resize'
      fullBtn.style = 'float: right;margin-right: 0;'
      let that = this
      function setSizeBtn() {
        let icon = ''
        if (that.isFullscreen) {
          icon = icons.minsize
        } else {
          icon = icons.maxsize
        }
        fullBtn.innerHTML = '<button type="button" class="ql-fullscreen">' + icon + '</button>'
      }
      setSizeBtn()
      fullBtn.addEventListener(
        'click',
        () => {
          this.isFullscreen = !this.isFullscreen
          setSizeBtn()
        },
        false,
      )
      for (let i in childs) {
        if (childs[i].className.indexOf('ql-toolbar') > -1) {
          childs[i].append(fullBtn)
          break
        }
      }
    },
    async beforeUpload() {
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
      this.imgurl = this.actionUrl + oss.dir + oss.expire
    },
    handleChange(info) {
      if (info) {
        const that = this
        that.$emit('upload', that.imgurl, that.insertImage)
      }
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    initImgInput() {
      let imgInput = this.$refs['img-input']
      // let imgInput2 = this.$refs['img-input2']
      // let upload = document.querySelector('.upload')
      // console.log(imgInput,imgInput2,upload,this.$refs);
      imgInput.addEventListener('change', () => {
        if (imgInput.files.length > 0) {
          // this.$emit('upload', imgInput.files[0], this.insertImage)
        }
      })
      let btns = this.quill.getModule('toolbar')
      btns.addHandler('image', () => {
        imgInput.click()
        //document.querySelector('.ant-upload-text').click()
      })
    },
    insertImage(src, align) {
      let range = this.quill.getSelection()
      this.quill.insertEmbed(range.index, 'text', '\n')
      this.quill.insertEmbed(range.index + 1, 'image', src)
      this.quill.insertEmbed(range.index + 2, 'text', '\n')
      this.quill.formatText(range.index + 1, 2, 'align', align || 'center')
    },
    setContent(val) {
      this.quill.container.firstChild.innerHTML = val
      // this.quill.clipboard.dangerouslyPasteHTML(val)
      return this.quill
    },
    setDisabled(val) {
      this.quill.enable(!val)
    },
    getContent(val) {
      return this.quill.container.firstChild.innerHTML
    },
  },
}
</script>
