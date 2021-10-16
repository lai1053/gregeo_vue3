<!-- @format -->

<template>
  <div>
    <div :style="{ padding: '25px' }">
      <span><a-button
              :style="{ color: 'black', boxShadow: 'none' }"
              ghost
              @click="testName"
            >产品</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName"
        >功能</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName"
        >关于</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName"
        >我们</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName"
        >实力</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName"
        >前景</a-button>
        <a-button
          :style="{ color: 'black' }"
          ghost
          @click="testName(true)"
        >共赢</a-button>
      </span>
      <div class="logo">
        <a-button @click="toggel(true)">
          登录
        </a-button>
        <a-button @click="toggel(false)">
          注册
        </a-button>
      </div>
    </div>
    <div>
      <div
        v-if="loginEnroll"
        class="item"
      >
        <div id="img">
          <img
            :style="{ width: '150px', height: '150px' }"
            alt="Vue logo"
            src="../../assets/log.png"
          >
        </div>
        <div>
          <div class="longin">
            <div class="longinHead">
              <div :style="{ padding: '20px' }">
                欢迎登录德恒系统
              </div>
              <a-form
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
              >
                <a-form-item
                  label="账号"
                  v-bind="validateInfos.name"
                >
                  <a-input
                    v-model:value="modelRef.name"
                    placeholder="请输入您的账号"
                    @change="validate('name', { trigger: 'blur' }).catch(() => {})"
                  />
                </a-form-item>
                <a-form-item
                  label="密码"
                  v-bind="validateInfos.password"
                >
                  <a-input
                    v-model:value="modelRef.password"
                    type="password"
                    placeholder="请输入您的密码"
                    @pressEnter="onSubmit"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 18, offset: 4 }">
                  <a-button
                    type="primary"
                    @click="onSubmit"
                  >
                    登录
                  </a-button>
                  <a-button
                    style="margin-left: 10px"
                    @click="reset"
                  >
                    重置
                  </a-button>
                </a-form-item>
              </a-form>
              <!--   <div>testInput</div>
                 <a-input v-model:value="inputTest.name" @change="inputTestTax"></a-input>-->
            </div>
            <div />
          </div>
        </div>
      </div>
      <div
        v-if="!loginEnroll"
        :style="{ background: '#fff', padding: '24px', minHeight: '510px', display: 'flex', justifyContent: 'center' }"
      >
        <Enroll @toggel="toggel" />
      </div>
    </div>

    <div class="isbottom">
      <a
        href="https://beian.miit.gov.cn/"
      ><img
        src="../../assets/img.png"
        alt=""
      >版权所有©Ruiangeo 2020 粤ICP备2020104405号</a>
    </div>
  </div>
</template>

<script>
import { reactive, toRaw, getCurrentInstance, ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'
import { dhzyTEST, userLgion, apiTokenAuth, register } from '../../api'
import { useStore } from 'vuex'
import Enroll from '@/views/Login/Enroll'
export default {
  name: 'Login',
  components: {
    Enroll,
  },
  setup(props, context) {
    const { ctx } = getCurrentInstance() // 获取当前组件实例
    const that = ctx
    const store = useStore()
    const router = useRouter()
    let visible = ref(false)
    const msg = reactive({
      resTitle: '',
      resMessage: '',
    })
    const modelRef = reactive({
      name: '',
      password: '',
    })
    const handleOk = () => {
      visible = false
    }

    // 测试正则校验
    const inputTest = reactive({
      name: '',
    })
    const inputTestTax = e => {
      let a = e.target.value.replace(/[\u4E00-\u9FA5\s]/g, '')
      inputTest.name = a
      // console.log(e.target.value);
    }

    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        name: [
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
        password: [
          {
            required: true,
            message: '请输入用户密码',
          },
        ],
      }),
    )
    const onSubmit = e => {
      e.preventDefault()
      validate()
        .then(res => {
          //router.push({path:'/Home'})
          let data = {
            username: res.name,
            password: res.password,
          }
          delete window.localStorage.token
          new Promise(function (resolve, reject) {
            let ret = apiTokenAuth(data)

            ret.then(response => {
              if (response.code === 0) {
                // ctx.$store.dispatch('getToken',response.result)
                let storage = window.localStorage
                storage.token = response.result
                store.dispatch('getToken', response.result)
                store.dispatch('getUserInfo')
                router.replace({
                  path: '/BasicLayout/customerProfile',
                  query: {
                    redirect: router.currentRoute.fullPath,
                  },
                })
              } else {
                /*    that.$error({
                  title: '注册失败',
                  content: response.message,
                  okText:'确定',
                });*/
                alert(response.message)
              }
            })
          })
        })
        .catch(err => {
          console.log('error', err)
        })
    }
    const reset = async () => {
      resetFields()

      // let res = await dhzyTEST()
      //console.log(ctx.$store.state.token);
    }
    let testTatx = ref(123)

    const testName = e => {
      if (e === true) {
        ctx.$confirm({
          title: '测试成功',
          // icon: createVNode(ExclamationCircleOutlined),
          content: createVNode('div', { style: 'color:black;' }, '点击确定确定继续'),
          okText: '确定',
          cancelText: '取消',
          onOk() {
            // ctx.$emit('toggel',true)
            // console.log('OK');
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      } else {
        alert('项目持续开发中，敬请期待')
      }
    }
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      validate,
      validateInfos,
      reset,
      modelRef,
      inputTest,
      inputTestTax,
      onSubmit,
      testTatx,
      testName,
      visible,
      msg,
      handleOk,
    }
  },
  data() {
    return {
      loginEnroll: true,
    }
  },
  methods: {
    toggel(type) {
      this.loginEnroll = type
    },
  },
}
</script>

<style lang="less" scoped>
.logo {
  float: right;
}
#img {
  height: 180px;

  margin-top: 8%;
}
.item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.isbottom {
  //border-bottom: 1px solid #f6f6f6;
  overflow: hidden;
  //box-shadow: 0 1px 4px rgba(0,21,41,.08);
  //transition:all .3s cubic-bezier(.645,.045,.355,1),border 0s,background 0s,color 0s;
  position: fixed;
  width: 100%;
  z-index: 200;
  bottom: 10px;
  align-items: center;
  text-align: center;
  a {
    color: #000;
  }
}
.longinHead {
  width: 100%;
  height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
.longin {
  width: 520px;
  height: 280px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 102, 179, 0.1);
}
</style>
