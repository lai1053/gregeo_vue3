<!-- @format -->

<template>
  <div class="enroll">
    <h1>账号注册</h1>
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        label="邮箱"
        v-bind="validateInfos.enrollName"
      >
        <a-input
          v-model:value="modelRef.enrollName"
          placeholder="请输入您的邮箱"
          @change="validate('name', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item
        label="邮箱验证码"
        v-bind="validateInfos.enrollemaliCode"
      >
        <a-input-search
          v-model:value="modelRef.enrollemaliCode"
          placeholder="请输入邮箱验证码"
          @search="sendECode(true)"
        >
          <template #enterButton>
            <a-button
              type="primary"
              :loading="iconLoading"
            >
              {{ buttonText }}
            </a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-form-item
        label="密码"
        v-bind="validateInfos.enrollPassword1"
      >
        <a-input
          v-model:value="modelRef.enrollPassword1"
          type="password"
          placeholder="请输入您的密码"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        v-bind="validateInfos.enrollPassword2"
      >
        <a-input
          v-model:value="modelRef.enrollPassword2"
          type="password"
          placeholder="请再次输入您的密码"
          @pressEnter="onSubmit"
          @blur="validate('enrollPassword2', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 18, offset: 4 }">
        <a-button
          type="primary"
          size="large"
          @click="onSubmit"
        >
          提交注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { createVNode } from 'vue'
import { reactive, toRaw, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'
import { register, send_email_code } from '../../api'
import { useStore } from 'vuex'
let countdown = 60
export default {
  name: 'Enroll',
  setup() {
    const store = useStore()
    const router = useRouter()
    const { ctx } = getCurrentInstance() // 获取当前组件实例
    const that = ctx
    let iconLoading = ref(false)
    let visible = false
    const modelRef = reactive({
      name: '',
      sub: {
        name: '',
      },
      enrollName: '',
      enrollemaliCode: '',
      enrollPassword1: '',
      enrollPassword2: '',
    })
    const checkPassword = (rule, value, callback) => {
      if (modelRef.enrollPassword1 === modelRef.enrollPassword2) {
        callback()
      } else {
        callback('两次输入不一致')
      }
    }
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        enrollName: [
          {
            required: true,
            message: '请输入用户名',
          },
          {
            pattern: /^[^\u4e00-\u9fa5\s]{0,}$/,
            message: '不能输入中文与空格',
            trigger: 'change',
          },
        ],
        enrollemaliCode: [
          {
            required: true,
            message: '请输入邮箱验证码',
          },
        ],
        enrollPassword1: [
          {
            required: true,
            message: '请输入用户密码',
          },
        ],
        enrollPassword2: [
          {
            required: true,
            message: '请输入用户密码',
          },
          {
            validator: checkPassword,
            trigger: 'blur',
          },
        ],
      }),
    )
    const onSubmit = async e => {
      e.preventDefault()
      validate()
        .then(res => {
          const data = {
            email: res.enrollName,
            verify_code: res.enrollemaliCode,
            password: res.enrollPassword1,
          }

          new Promise(function (resolve, reject) {
            let promise = register(data)
            promise.then(response => {
              if (response.code === 200 || response.code === 0) {
                store.dispatch('getToken', response.result)
                let storage = window.localStorage
                storage.token = response.result
                store.dispatch('getUserInfo')
                router.replace({
                  path: '/BasicLayout/customerProfile',
                  query: {
                    redirect: router.currentRoute.fullPath,
                  },
                })
                /*  that.$confirm({
                  title: '注册成功',
                  // icon: createVNode(ExclamationCircleOutlined),
                  content: createVNode('div', { style: 'color:black;' }, '点击确定确定继续'),
                  okText:'确定',
                  cancelText:'取消',
                  onOk() {
                    // ctx.$emit('toggel',true)
                    // console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  }
                });*/
              } else {
                alert(response.message)
                /*   that.$error({
                  title: '注册失败',
                  content: response.message,
                  okText:'确定',
                });*/
              }
            })
            promise.catch(error => {
              console.log(error, 'error')
            })
          })
        })
        .catch(err => {
          console.log('error', err)
        })
    }
    const handleOk = async () => {}
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      validate,
      validateInfos,
      modelRef,
      onSubmit,
      handleOk,
      visible,
    }
  },
  data() {
    return {
      visibles: true,
      iconLoading: false,
      buttonText: '发送验证码',
    }
  },
  methods: {
    async sendECode(type) {
      if (!this.modelRef.enrollName) {
        alert('请输入邮箱')
        return
      }
      const that = this
      this.iconLoading = true
      if (type === true) {
        const data = {
          code: 'EMAIL_CODE_SCENES_REGISTER',
          email: this.modelRef.enrollName,
        }
        const a = await send_email_code(data)
        if (a.code != 0) {
          alert(a.message)
        }
      }

      if (countdown == 0) {
        this.iconLoading = false
        this.buttonText = '点击重新获取'
        countdown = 60
      } else {
        this.buttonText = '重新发送' + '(' + countdown + ')'

        setTimeout(function () {
          countdown--
          that.sendECode()
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.enroll {
  width: 820px;
  height: 410px;
  margin-top: 6%;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 102, 179, 0.1);
  h1 {
    margin-top: 20px;
  }
}
</style>
