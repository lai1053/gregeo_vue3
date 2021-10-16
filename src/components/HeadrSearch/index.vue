/* eslint-disable */
<!-- @format -->

<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form
        ref="ruleForm"
        layout="horizontal"
        :model="form"
      >
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col
              v-for="i in headerSearchData"
              :key="i.key"
              :md="8"
              :sm="24"
            >
              <a-form-item
                :label="i.label"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 15, offset: 0 }"
              >
                <component
                  :is="i.component"
                  v-model:value="form[i.key]"
                  :props="i.props"
                  @pressEnter="onSubmit"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button
            type="primary"
            @click="onSubmit"
          >查询</a-button>
          <a-button
            style="margin-left: 8px"
            @click="resetForm"
          >重置</a-button>
          <a
            v-if="headerSearchData.length > 3"
            style="margin-left: 8px"
            @click="toggleAdvanced"
          >
            {{ advanced ? '收起' : '展开' }}
            <DownOutlined
              v-if="!advanced"
              class="icon"
            /><UpOutlined
              v-if="advanced"
              class="icon"
            />
          </a>
        </span>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
export default {
  name: 'Index',
  components: {
    DownOutlined,
    UpOutlined,
  },
  props: ['headerSearchData', 'headerSearchClick'],
  data() {
    return {
      advanced: false,
      form: {},
    }
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onSubmit() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$emit('headerSearchClick', this.form)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.form = {}
    },
  },
}
</script>

<style scoped lang="less">
.no-name {
  color: red;
  font-size: 24px;
}
.fold {
  width: calc(100% - 216px);
  height: 2.5rem;
  display: inline-block;
  overflow: hidden;
}
.icon {
  font-size: 12px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
