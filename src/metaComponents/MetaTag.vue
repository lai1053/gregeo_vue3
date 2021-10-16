<!-- @format -->

<template>
  <div>
    <template
      v-for="(tag, index) in tags"
      :key="index"
    >
      <a-tag
        :closable="true"
        :disabled="disabled"
        @close="handleClose(tag)"
      >
        {{ tag.name }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      v-model:value="inputValue"
      type="text"
      size="small"
      :disabled="disabled"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag
      v-else
      style="background: #fff; borderstyle: dashed"
      :disabled="disabled"
      @click="showInput"
    >
      <plus-outlined /> 点击新增标签
    </a-tag>
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { postCustomertag } from '@/api'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'MetaTag',
  components: {
    PlusOutlined,
  },
  props: ['props', 'childData', 'childDataChange'],
  data() {
    return {
      tags: [],
      inputVisible: false,
      inputValue: '',
      disabled: this.props.disabled,
    }
  },
  watch: {
    childData: {
      handler(value, oldValue) {
        this.tags = value
      },
      deep: true,
    },
  },
  mounted() {
    if (this.childData) {
      this.tags = this.childData
    }
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
      this.$emit('childDataChange', this.tags, this.props.key)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },

    async handleInputConfirm() {
      const inputValue = this.inputValue
      let res
      if (inputValue !== '') {
        const obj = {
          name: inputValue,
        }
        res = await postCustomertag(obj)
      }

      let tags = this.tags
      if (res.result && tags.indexOf(inputValue) === -1) {
        tags = [...tags, res.result]
      }

      this.$emit('childDataChange', tags, this.props.key)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
    },
  },
}
</script>

<style scoped></style>
