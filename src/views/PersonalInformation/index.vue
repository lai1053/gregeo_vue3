<template>
  <a-spin
    tip="数据加载中"
    :delay="1"
    :spinning="loading"
  >
    <div class="subItem">
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        @click="handleClick"
      >
        <a-menu-item key="1">
          基本设置
        </a-menu-item>
        <a-menu-item key="2">
          修改密码
        </a-menu-item>
      </a-menu>
      <div>
        <h2 v-if="selectKey === '1'">
          基本设置
        </h2>
        <h2 v-if="selectKey === '2'">
          修改密码
        </h2>
        <div
          v-if="selectKey === '1'"
          class="basisSet"
        >
          <ProForm
            ref="ruleForm"
            :pro-form-data="proFormData"
          />
        </div>
        <div
          v-if="selectKey === '2'"
          class="passwordSet"
        >
          <a-form
            ref="passwordForm"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item
              label-align="left"
              label="密码"
              v-bind="validateInfos.original_password"
            >
              <a-input
                v-model:value="modelRef.original_password"
                type="password"
                placeholder="请输入您的原来密码"
              />
            </a-form-item>
            <a-form-item
              label-align="left"
              label="输入新密码"
              v-bind="validateInfos.password"
            >
              <a-input-password
                v-model:value="modelRef.password"
                type="password"
                placeholder="请输入大小写字母加数字的密码"
                @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
            <a-form-item
              label-align="left"
              label="再次输入新密码"
              v-bind="validateInfos.password2"
            >
              <a-input-password
                v-model:value="modelRef.password2"
                type="password"
                placeholder="请输入大小写字母加数字的密码"
                @blur="validate('password2', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
          </a-form>
        </div>
        <div class="button">
          <a-button
            type="primary"
            @click="handleOk"
          >
            {{ selectKey === '1' ? '保存' : '修改密码' }}
          </a-button>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script>
import ProForm from '@/components/ProForm'
import { getBasicUserInfo, putBasicUserInfo, resetUserPassword } from '@/api'
import { message, Modal } from 'ant-design-vue'
import { reactive } from 'vue'
import { useForm } from '@ant-design-vue/use'
export default {
  components: {
    ProForm,
  },
  setup() {
    const modelRef = reactive({
      original_password: '',
      password: '',
      password2: '',
    })
    const checkPassword = (rule, value, callback) => {
      if (modelRef.password !== modelRef.password2) {
        callback('两次输入不一致')
      }
    }
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        original_password: [
          {
            required: false,
            message: '请输入用户密码',
          },
        ],
        password2: [
          {
            required: false,
            message: '请输入用户密码',
          },
          {
            validator: checkPassword,
            trigger: 'blur',
          },
        ],
      }),
    )
    return {
      validate,
      validateInfos,
      modelRef,
    }
  },
  data() {
    return {
      loading: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      selectKey: '1',
      labelCol: { span: 10 },
      wrapperCol: { span: 24 },
      proFormData: {
        layout: 'vertical',
        form: {},
        formConfig: [
          {
            label: '头像',
            key: 'avatar',
            span: 12,
            component: 'MetaUploadImage',
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 22,
              offset: 0,
            },
            props: {
              key: 'avatar',
              maxLength: 1,
            },
          },
          {
            label: '账号',
            key: 'username',
            component: 'MetaInput',
            span: 24,
            labelCol: {
              span: 14,
            },
            wrapperCol: {
              span: 14,
              offset: 0,
            },
            props: {
              key: 'username',
              type: '',
              disabled: true,
            },
          },
          {
            label: '姓名',
            key: 'realname',
            component: 'MetaInput',
            span: 24,
            labelCol: {
              span: 14,
            },
            wrapperCol: {
              span: 14,
              offset: 0,
            },
            props: {
              key: 'realname',
              type: '',
            },
          },
          {
            label: '昵称',
            key: 'nickname',
            component: 'MetaInput',
            span: 24,
            labelCol: {
              span: 14,
            },
            wrapperCol: {
              span: 14,
              offset: 0,
            },
            props: {
              key: 'nickname',
              type: '',
            },
          },
        ],
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      const res = await getBasicUserInfo()
      if (res.code === 0) {
        this.loading = false
        let arr = []
        if (res.result.avatar) {
          arr.push({
            uid: 1,
            url: res.result.avatar,
          })
          res.result.avatar = arr
        }
        this.proFormData.form = res.result
      }
    },
    handleClick(e) {
      this.selectKey = e.key
    },
    async handleOk() {
      if (this.selectKey === '1') {
        this.$refs.ruleForm.$refs.ruleForm
          .validateFields()
          .then(() => {
            // 更新企业数据

            let data = this.$refs.ruleForm.componentData.form
            console.log(data.avatar, 'this.$refs.ruleForm.componentData.form')
            let subData = {}
            let a = ''
            if (data.avatar.length === 1) {
              a = data.avatar[0].url
            }
            subData = { ...data }
            subData.avatar = a

            this.submit(subData)
          })
          .catch(error => {
            console.log('error', error)
          })
      }
      if (this.selectKey === '2') {
        const data = this.modelRef
        if (data.password !== data.password2) return
        const res = await resetUserPassword(data)
        if (res.code === 0) {
          this.modelRef.password = ''
          this.modelRef.password2 = ''
          this.modelRef.original_password = ''
          Modal.success({
            content: '修改成功',
          })
        } else {
          this.loading = false
          Modal.error({
            content: res.message,
          })
        }
      }
    },
    async submit(data) {
      if (this.selectKey === '1') {
        // 基本信息修改
        this.loading = true
        //const data = this.proFormData.form
        const res = await putBasicUserInfo(data)
        if (res.code === 0) {
          this.load()
        } else {
          message.error(res.message)
        }
      }
    },
  },
}
</script>
<style scoped lang="less">
.subItem {
  display: flex;
  padding: 25px;
  min-height: 660px;
  h2 {
    margin-left: 40px;
  }
  .basisSet {
    padding-left: 20px;
  }
  .passwordSet {
    width: 402px;
    padding-left: 44px;
  }
  .button {
    padding: 25px 0px 0px 45px;
  }
}
</style>
