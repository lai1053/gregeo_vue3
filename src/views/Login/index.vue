<template>
  <div class="item">
    <div class="itemLeft">
      <div class="img">
        <div class="flower">
          <img src="https://ruiangeo-media.grewalleco.com/img/login/Login_People.png">
        </div>
      </div>
    </div>
    <div class="itemRight">
      <div class="login">
        <div class="logo">
          <img
            src="https://ruiangeo-media.grewalleco.com/img/login/Sign%20in_logo.svg"
            alt=""
          >
        </div>
        <a-form
          ref="ruleForm"
          class="form"
          :hide-required-mark="true"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <div v-if="displayKeys === 'login'">
            <a-form-item v-bind="validateInfos.username">
              <a-input
                v-model:value="modelRef.username"
                allow-clear
                size="large"
                placeholder="请输入您的账号"
                @blur="validate('username', { trigger: 'blur' }).catch(() => {})"
              >
                <template #prefix>
                  <IconFont type="iconSignin_accountnumber" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
              <a-input-password
                v-model:value="modelRef.password"
                size="large"
                autocomplete
                placeholder="请输入您的密码"
                @pressEnter="onSubmit"
              >
                <template #prefix>
                  <IconFont type="iconSignin_password" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                size="large"
                type="primary"
                block
                @click="onSubmit"
              >
                登录
              </a-button>
            </a-form-item>
            <a-form-item>
              <div class="toggle">
                <a
                  @click="
                    () => {
                      ;(displayKeys = 'retrievePassword'),
                        (buttonText = '发送验证码'),
                        (iconLoading = false),
                        displayKeysSwitch('retrievePassword')
                    }
                  "
                >忘记密码</a>&nbsp; |&nbsp;
                <a
                  @click="
                    () => {
                      ;(displayKeys = 'registered'),
                        (buttonText = '发送验证码'),
                        (iconLoading = false),
                        displayKeysSwitch('registered')
                    }
                  "
                >注册企业</a>
              </div>
            </a-form-item>
          </div>
          <div v-if="displayKeys === 'retrievePassword'">
            <a-form-item v-bind="validateInfos.email">
              <a-input
                v-model:value="modelRef.email"
                allow-clear
                size="large"
                placeholder="请输入您的邮箱账号"
                @blur="validate('email', { trigger: 'blur' }).catch(() => {})"
              >
                <template #prefix>
                  <IconFont type="iconSignin_accountnumber" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.code">
              <a-input-search
                v-model:value="modelRef.code"
                size="large"
                placeholder="请输入邮箱验证码"
                @search="sendECode(true)"
              >
                <template #prefix>
                  <IconFont type="iconSignin_VerificationCode" />
                </template>
                <template #enterButton>
                  <a-button
                    size="large"
                    type="primary"
                    :loading="iconLoading"
                  >
                    {{ buttonText }}
                  </a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
              <a-input-password
                v-model:value="modelRef.password"
                size="large"
                autocomplete
                placeholder="请输入您的新密码"
              >
                <template #prefix>
                  <IconFont type="iconSignin_password" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password_repeat">
              <a-input-password
                v-model:value="modelRef.password_repeat"
                size="large"
                autocomplete
                placeholder="请再次输入您的新密码"
                @blur="validate('password_repeat', { trigger: 'blur' }).catch(() => {})"
              >
                <template #prefix>
                  <IconFont type="iconSignin_password" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                size="large"
                type="primary"
                block
                @click="onSubmit"
              >
                确认
              </a-button>
            </a-form-item>
            <div class="goLogin">
              想起登录密码了，
              <a
                @click="
                  () => {
                    ;(displayKeys = 'login'),
                      (buttonText = '发送验证码'),
                      (iconLoading = false),
                      displayKeysSwitch('login')
                  }
                "
              >返回登录</a>
            </div>
          </div>
          <div v-if="displayKeys === 'registered'">
            <a-form-item v-bind="validateInfos.enterprise_name">
              <a-input
                v-model:value="modelRef.enterprise_name"
                allow-clear
                size="large"
                placeholder="请输入企业名称"
              >
                <template #prefix>
                  <IconFont type="iconSignin_Enterprise" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.realname">
              <a-input
                v-model:value="modelRef.realname"
                allow-clear
                size="large"
                placeholder="请输入管理员姓名"
              >
                <template #prefix>
                  <IconFont type="iconSignin_Name" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.email">
              <a-input
                v-model:value="modelRef.email"
                allow-clear
                size="large"
                placeholder="请输入您的邮箱账号"
                @blur="validate('email', { trigger: 'blur' }).catch(() => {})"
              >
                <template #prefix>
                  <IconFont type="iconSignin_accountnumber" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.code">
              <a-input-search
                v-model:value="modelRef.code"
                size="large"
                placeholder="请输入邮箱验证码"
                @search="sendECode(true)"
              >
                <template #prefix>
                  <IconFont type="iconSignin_VerificationCode" />
                </template>
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
            <a-form-item v-bind="validateInfos.password">
              <a-input-password
                v-model:value="modelRef.password"
                size="large"
                autocomplete
                placeholder="请输入大小写字母加数字的密码"
              >
                <template #prefix>
                  <IconFont type="iconSignin_password" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password_repeat">
              <a-input-password
                v-model:value="modelRef.password_repeat"
                size="large"
                autocomplete
                placeholder="请再次输入您的新密码"
                @blur="validate('password_repeat', { trigger: 'blur' }).catch(() => {})"
              >
                <template #prefix>
                  <IconFont type="iconSignin_password" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                block
                size="large"
                @click="onSubmit"
              >
                立即注册
              </a-button>
            </a-form-item>
            <div class="goLogin">
              已有账号，
              <a
                @click="
                  () => {
                    ;(displayKeys = 'login'),
                      (buttonText = '发送验证码'),
                      (iconLoading = false),
                      displayKeysSwitch('login')
                  }
                "
              >去登录</a>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2324251_pm04guj7o19.js',
})
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import { apiTokenAuth, send_email_code, recoverPassword, register } from '@/api'
let countdown = 60
export default {
  name: 'Index',
  components: {
    IconFont,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { ctx } = getCurrentInstance() // 获取当前组件实例
    let displayKeys = ref('login')
    const msg = reactive({
      resTitle: '',
      resMessage: '',
    })
    let modelRef = reactive({
      username: '', // 登录页的用户名
      email: '', // 注册和忘记密码用的邮箱名称
      code: '', // 邮箱验证码
      verify_code: '', // 注册验证码
      realname: '', // 注册姓名
      enterprise_name: '', // 企业名称
      password: '', // 密码
      password_repeat: '', // 重复的新密码
    })
    let rulesLogin = reactive({
      username: [
        {
          required: true,
          message: '请输入正确的邮箱地址',
          type: 'email',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入用户密码',
        },
      ],
      email: [
        {
          required: false,
          message: '请输入正确的邮箱地址',
          type: 'email',
          trigger: 'blur',
        },
      ],
      password_repeat: [
        {
          required: false,
          message: '请输入用户密码',
        },
      ],
      code: [
        {
          required: false,
          message: '请输入邮箱验证码',
        },
      ],
      enterprise_name: [],
      realname: [],
    })
    const displayKeysSwitch = e => {
      resetFields() // 先清除掉历史记录
      switch (e) {
        case 'login':
          rulesLogin.username = [
            {
              required: true,
              message: '请输入正确的邮箱地址',
              type: 'email',
              trigger: 'blur',
            },
          ]
          rulesLogin.password = [
            {
              required: true,
              message: '请输入用户密码',
            },
          ]
          rulesLogin.email = []
          rulesLogin.code = []
          rulesLogin.password_repeat = []
          rulesLogin.enterprise_name = []
          rulesLogin.realname = []
          break

        case 'retrievePassword':
          rulesLogin.username = []
          rulesLogin.enterprise_name = []
          rulesLogin.realname = []
          rulesLogin.email = [
            {
              required: true,
              message: '请输入正确的邮箱地址',
              type: 'email',
              trigger: 'blur',
            },
          ]
          rulesLogin.code = [
            {
              required: true,
              message: '请输入邮箱验证码',
            },
          ]
          rulesLogin.password = [
            {
              required: true,
              message: '请输入用户密码',
            },
          ]
          rulesLogin.password_repeat = [
            {
              required: true,
              message: '请输入用户密码',
            },
            {
              validator: checkPassword,
              trigger: 'blur',
            },
          ]
          break
        case 'registered':
          rulesLogin.enterprise_name = [
            {
              required: true,
              message: '请输入企业名称',
              type: 'string',
              trigger: 'blur',
            },
          ]
          rulesLogin.realname = [
            {
              required: true,
              message: '请输入管理员姓名',
              type: 'string',
              trigger: 'blur',
            },
          ]
          rulesLogin.email = [
            {
              required: true,
              message: '请输入正确的邮箱地址',
              type: 'email',
              trigger: 'blur',
            },
          ]
          rulesLogin.code = [
            {
              required: true,
              message: '请输入邮箱验证码',
            },
          ]
          rulesLogin.password = [
            {
              required: true,
              message: '请输入用户密码',
            },
          ]
          rulesLogin.password_repeat = [
            {
              required: true,
              message: '请输入用户密码',
            },
            {
              validator: checkPassword,
              trigger: 'blur',
            },
          ]
          rulesLogin.username = []
          break
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (modelRef.password === modelRef.password_repeat) {
        callback()
      } else {
        callback('两次输入不一致')
      }
    }
    const { resetFields, validate, validateInfos } = useForm(modelRef, reactive(rulesLogin))
    const onSubmit = e => {
      e.preventDefault()
      validate()
        .then(res => {
          // console.log(res);
          sendCode(res)
        })
        .catch(err => {
          console.log('error', err)
        })
    }

    const sendCode = async res => {
      const key = displayKeys.value
      switch (key) {
        case 'login':
          let data = {
            username: res.username,
            password: res.password,
          }
          delete window.localStorage.token
          let ret = await apiTokenAuth(data)
          if (ret.code === 0) {
            let storage = window.localStorage
            storage.token = ret.result
            store.dispatch('getToken', ret.result)
            store.dispatch('getUserInfo')
            router.replace({
              path: '/BasicLayout/loadingPage',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            })
          } else {
            message.error(ret.message)
          }
          break

        case 'retrievePassword':
          const data2 = {
            email: res.email,
            code: res.code,
            password: res.password,
            password_repeat: res.password_repeat,
          }
          const ret2 = await recoverPassword(data2)
          if (ret2.code === 0) {
            resetFields()
            message.success('修改成功')
          } else {
            message.error(ret2.message)
          }
          break

        case 'registered':
          const data3 = {
            email: res.email,
            password: res.password,
            verify_code: res.code,
            realname: res.realname,
            enterprise_name: res.enterprise_name,
          }
          const ret3 = await register(data3)
          if (ret3.code === 0) {
            message.success('注册成功')
            store.dispatch('getToken', ret3.result)
            store.dispatch('getUserInfo')
            router.replace({
              path: '/BasicLayout/customerProfile',
              query: {
                redirect: router.currentRoute.fullPath,
              },
            })
          } else {
            message.error(ret3.message)
          }
          break
      }
    }

    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
      validate,
      validateInfos,
      modelRef,
      msg,
      onSubmit,
      displayKeysSwitch,
      displayKeys,
    }
  },
  data() {
    return {
      //displayKeys:'login',
      iconLoading: false,
      buttonText: '发送验证码',
    }
  },
  mounted() {
    this.autoLogin()
  },
  methods: {
    async sendECode(type) {
      if (!this.modelRef.email) {
        message.error('请输入邮箱')
        return
      }
      //clearTimeout
      const that = this
      const timeout1 = setTimeout(function () {
        countdown--
        that.sendECode()
      }, 1000)

      this.iconLoading = true
      if (type === true) {
        const data = {
          code: 'EMAIL_CODE_SCENES_REGISTER',
          email: this.modelRef.email,
        }
        const a = await send_email_code(data)
        if (a.code != 0) {
          message.error(a.message)
        }
      }

      if (countdown == 0) {
        this.iconLoading = false
        this.buttonText = '点击重新获取'
        countdown = 60
        window.clearTimeout(timeout1)
      } else {
        this.buttonText = '重新发送' + '(' + countdown + ')'
      }
    },
    async autoLogin() {
      let storage = window.localStorage
      if (storage.token) {
        this.$router.replace({
          path: '/BasicLayout/customerProfile',
          query: {
            redirect: this.$router.currentRoute.fullPath,
          },
        })
      }
    },
  },
}
</script>

<style scoped lang="less">
.item {
  width: 100%;
  height: calc(100vh);
  display: flex;
  .itemLeft {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; //https://ruiangeo-media.grewalleco.com/img/login/Login_Background.svg
    background: url('https://ruiangeo-media.grewalleco.com/img/login/Login_Background.svg') no-repeat top left;
    background-size: cover;
    .flower {
      width: 482px;
      height: 768px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .itemRight {
    width: 75%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .login {
      width: 360px;
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 46px;
        img {
          width: 189px;
          height: 72px;
        }
      }
      .toggle {
        text-align: center;
      }
      .goLogin {
        text-align: center;
      }
    }
  }
}
</style>
