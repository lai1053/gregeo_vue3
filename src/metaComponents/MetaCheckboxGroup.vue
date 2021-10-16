<template>
  <a-checkbox-group v-model:value="value1" name="checkboxgroup" :disabled="disabled" @change="change">
    <a-row>
      <a-col v-for="i in plainOptions" :key="i.value" :span="props.span ? props.span : 24">
        <a-checkbox :value="i.id">
          {{ i.name }}
        </a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
</template>

<script>
export default {
  name: 'MetaCheckboxGroup',
  props: {
    props: Object,
    childDataChange: Function,
    childData: Object,
  },
  data() {
    return {
      plainOptions: this.props.option,
      disabled: this.props.disabled,
      value1: [],
      oldValue: '',
      newValue: '',
    }
  },
  watch: {
    props: {
      handler(value, oldValue) {
        this.plainOptions = value.option
      },
      deep: true,
    },
    childData: {
      handler(value, oldValue) {
        this.newValue = value
        this.oldValue = oldValue
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    change(e) {
      if (this.props.readKey) {
        // 公用一个key的方法行不通 会让人无法取消 所以还是点击下一步
        //console.log(this.newValue,'之前的数据');
        // let arr = []
        // console.log(e,'这是点击时候产生的数据');
        // e.forEach(i => {
        //   arr.push(i)
        // })
        // this.newValue &&
        //   this.newValue.forEach(i => {
        //     arr.push(i)
        //   })
        // const a = Array.from(new Set(arr))
        // console.log(a);
        this.$emit('childDataChange', e, this.props.key)
        return
      }

      //readKey:true,
      //console.log(e,this.value1 ,'这个是没有相同key的逻辑');
      this.$emit('childDataChange', e, this.props.key)
    },
  },
}
</script>

<style scoped lang="less"></style>
