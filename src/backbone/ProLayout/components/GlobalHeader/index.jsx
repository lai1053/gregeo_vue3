/**
 * 顶部的导航栏
 */

import VueTypes from 'vue-types'
import Layout from 'ant-design-vue/es/layout'
import {Dropdown,Menu,Avatar} from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import './index.scss'
import { mapState, mapGetters } from 'vuex'
import { DownOutlined } from '@ant-design/icons-vue';
import ProIcon from '@/components/ProIcon'

// import {createRouter} from 'vue-router'
// const router = createRouter()
// 定义对应的属性
const ProLayoutHeaderProps = {
  collapsed: VueTypes.bool,
  onCollapse: VueTypes.func,
}

// 定义组价你
const ProLayoutHeader = {
  name: 'ProLayoutHeader',

  props: ProLayoutHeaderProps,

  methods: {
    greet() {
      this.$emit('collapse', !this.collapsed)
    },
    logout() {
      delete window.localStorage.token
      delete window.localStorage.nickname
      delete window.localStorage.avatar
      delete window.localStorage.username
      this.$router.replace({ path: '/' })
    },
  },
  components:{
    DownOutlined,

  },
  computed: {
    ...mapState(['userInfo']),
    getUserBasic() {
      let data = {}
      if (!this.userInfo) {
        data = {
          nickname: this.userInfo.nickname,
          avatar: this.userInfo.avatar,
          username: this.userInfo.username,
        }
      } else {
        data = {
          nickname: window.localStorage.nickname,
          avatar: window.localStorage.avatar,
          username: window.localStorage.username,
        }
      }

      return data
    },
  },
  render(instance) {
    // 渲染顶部导航菜单左侧的 icon，点击可以打开或者收缩左侧菜单
    const iconCollapse = instance.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
    const getUserBasic = instance.getUserBasic
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={instance.logout}>退出登录</a>
        </Menu.Item>

      </Menu>
    );
    return (
      <Layout.Header class="ant-layout-fixed-header">
        <div>
          <span className={'collapsedLog'} onClick={instance.greet}>
            {' '}
            <iconCollapse />
          </span>
          <span style={{   paddingBottom: '25px' }}>欢迎使用德恒系统</span>
          <div class="userBreviary">
            <span></span>&nbsp;&nbsp; &nbsp;&nbsp;
            <Avatar src={getUserBasic.avatar}> </Avatar>
            &nbsp;&nbsp;
            &nbsp;
            <span>{getUserBasic.testName}</span>
            <Dropdown overlay={menu}>
              <a style={{     color: 'rgba(0, 0, 0, 0.65)'}} onClick={e => e.preventDefault()}>
                {getUserBasic.username}
                <DownOutlined class={'icon'}/>
              </a>
            </Dropdown>

          </div>
        </div>
      </Layout.Header>
    )
  },
}

export default ProLayoutHeader
