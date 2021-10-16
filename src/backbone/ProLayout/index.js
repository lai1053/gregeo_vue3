/** @format */

import ProLayout from './BasicLayout'
import ProLayoutFooter from './components/GlobalFooter'
import ProLayoutHeader from './components/GlobalHeader'

const install = function (app) {
  // 注册全局组件
  app.component('ProLayout', ProLayout)
  app.component('ProLayoutFooter', ProLayoutFooter)
  app.component('ProLayoutHeader', ProLayoutHeader)
}

export { ProLayout, ProLayoutFooter, ProLayoutHeader }

export default {
  install,
}
