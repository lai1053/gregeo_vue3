/**
 * 基础通用结构组件，包含菜单，头部导航，底部
 *
 * 用户可根据约定传入对应的 props，渲染基础可用的结构组件
 */

import { h } from 'vue'
import VueTypes from 'vue-types'
import Layout from 'ant-design-vue/es/layout'
import SideMenu from './components/SideMenu'
import GlobalHeader from './components/GlobalHeader'
import { getComponentFromProp, isFun } from './utils'
import './BasicLayout.scss'
const { Sider } = Layout

const renderTopHeader = props => {
  // 渲染顶部导航菜单
  return <GlobalHeader {...props} />
}

const GrewallProLayout = {
  name: 'GrewallProLayout',
  components:{
  },
  data() {
    return {
      collapsed: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  props: {
    width: VueTypes.Integer,
  },

  methods: {
    handleCollapse(collapsed) {
      this.collapsed = collapsed
    },
    test() {
      this.$router.replace({
        path: '/BasicLayout/loadingPage',
        query: {
          redirect: this.$router.currentRoute.fullPath,
        },})
    },
  },
  mounted() {
    this.test()
  },

  render(instance) {
    // 默认内容渲染
    const defaultContentRender = getComponentFromProp(instance, 'default')
    // 顶部导航
    // const headerRender = getComponentFromProp(instance, 'headerRender')
    // 页面底部渲染
    const footerRender = getComponentFromProp(instance, 'footerRender')

    // 顶级样式类
    const layoutClass = {
      'ant-pro-basicLayout': true,
      'grewall-pro-layout-trigger': true,
    }

    const viewContentClass = {
      'grewall-pro-layout-content': true,
    }
    return (
      <Layout class={layoutClass}>
        <Sider collapsed={instance.collapsed}>
          <div class="logo">
            <img
              className={'logoImg'}
              src={instance.collapsed ? require('@/assets/login/white_logo_No text.svg') : require('@/assets/login/white_logo .svg')}
            />
          </div>
          <SideMenu collapsed={instance.collapsed}></SideMenu>
        </Sider>

        <Layout>
          {renderTopHeader({
            collapsed: instance.collapsed,
            onCollapse: instance.handleCollapse,
          })}

          <div class={viewContentClass}>{defaultContentRender}</div>

          {(footerRender !== false && <div>{(isFun(footerRender) && footerRender(h)) || footerRender}</div>) || null}
        </Layout>
      </Layout>
    )
  },
}

export default GrewallProLayout
