/** @format */

import { createApp, Vue } from 'vue'
import Antd from 'ant-design-vue'
import ProLayout from '@/backbone/ProLayout'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
const requireComponent = require.context('./metaComponents', false, /^\.\//)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  )
  // 全局注册组件
  app.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig,
  )
})
app.use(Antd).use(store).use(router).use(ProLayout).mount('#app')
