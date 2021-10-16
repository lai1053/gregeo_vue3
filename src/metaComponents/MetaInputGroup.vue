<!-- @format -->

<template>
  <a-input-group>
    <a-row :gutter="8">
      <a-col
        v-for="(i, index) in MetaInputGroupData"
        :key="index"
        :span="i.span"
      >
        <a-input
          v-model:value="i.value"
          :disabled="disabled"
          @change="
            e => {
              onchange(e, index)
            }
          "
        />
      </a-col>
    </a-row>
  </a-input-group>
</template>

<script>
export default {
  name: 'MetaInputGroup',
  props: ['props', 'childDataChange', 'childData'],
  data() {
    return {
      disabled: this.props.disabled,
      MetaInputGroupData: {
        ...this.props.MetaInputGroupData,
      },
    }
  },
  watch: {
    childData: {
      handler(value, oldValue) {
        if (value) {
          if (value.length !== 0) {
            this.MetaInputGroupData = { ...value }
            //console.log(this.MetaInputGroupData, value, '数据监视')
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    //console.log(this.childData, 'MetaInputGroupData,mounted')
    if (this.childData && this.childData.length !== 0) {
      this.MetaInputGroupData = { ...this.childData }
    }
  },
  created() {
    //console.log(this.props,'a-input-group');
  },
  methods: {
    onchange(e, i) {
      //console.log(this.MetaInputGroupData,e, i,'this.MetaInputGroupData');
      const data = e.target.value.replace(/[^\d]/g, '')
      this.MetaInputGroupData[i].value = data
      //console.log(this.MetaInputGroupData,this.props,'props')
      this.$emit('childDataChange', this.MetaInputGroupData, 'phone')
    },
  },
}
</script>

<style scoped lang="less"></style>
