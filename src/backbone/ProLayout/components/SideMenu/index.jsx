/**
 * 左侧的菜单导航
 */
import './index.scss'
import Menu from 'ant-design-vue/es/menu'
import {
  createFromIconfontCN
} from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2324251_pm04guj7o19.js',
})
const { Item: MenuItem, SubMenu: SubMenu, ItemGroup: ItemGroup } = Menu
const LeftSideMenu = {
  props: {
    collapsed: Boolean,
  },
  components:{
    IconFont
  },
  setup() {},
  mounted() {},
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['customerProfile']} defaultOpenKeys={['customerProfile']}>
        <MenuItem key="customerProfile">
          <router-link to="/BasicLayout/customerProfile">
            <span><IconFont type={'iconside_customer'}/>  销售管理</span>
          </router-link>
        </MenuItem>
        {/*<SubMenu*/}
        {/*  key="sub1"*/}
        {/*  titleClick="titleClick"*/}
        {/*  title={*/}
        {/*    <span>*/}
        {/*     <div className={'icons-list-side'}> <span>销售管理</span></div>*/}
        {/*    </span>*/}
        {/*  }>*/}
        {/*  /!* <MenuItem key="sub111">*/}
        {/*    <router-link to="/BasicLayout/clientData">*/}
        {/*      <PropertySafetyOutlined />*/}
        {/*      <span>客户资料</span>*/}
        {/*    </router-link>*/}
        {/*  </MenuItem> *!/*/}
        {/*  */}
        {/*</SubMenu>*/}

        <SubMenu
          key="iconside_WorkOrderSystem"
          titleClick="titleClick"
          title={
            <span>
               <div className={'icons-list-side'}><IconFont className={'icons'}  type={'iconside_Business'}/>   <span>企业管理</span></div>
            </span>
          }>
          <MenuItem key="businessManagementDepartment">
            <router-link to="/BasicLayout/BusinessManagementDepartment">
              <span>部门管理</span>
            </router-link>
          </MenuItem>
          <MenuItem key="businessManagementRoles">
            <router-link to="/BasicLayout/BusinessManagementRoles">
              <span>角色管理</span>
            </router-link>
          </MenuItem>
          <MenuItem key="businessManagementUser">
            <router-link to="/BasicLayout/BusinessManagementUser">
              <span>用户管理</span>
            </router-link>
          </MenuItem>
        </SubMenu>

        <SubMenu
          key="logInformation"
          titleClick="titleClick"
          title={
            <span>
               <div className={'icons-list-side'}><IconFont className={'icons'}  type={'iconside_Log'}/>   <span>日志管理</span></div>
            </span>
          }>
          <MenuItem key="logInformation">
            <router-link to="/BasicLayout/logInformation">
              <span>日志信息</span>
            </router-link>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="iconside_Personal"
          titleClick="titleClick"
          title={
            <span>
               <div className={'icons-list-side'}><IconFont className={'icons'}  type={'iconside_Personal'}/>   <span>个人设置</span></div>
            </span>
          }>
          <MenuItem key="personalInformation">
            <router-link to="/BasicLayout/personalInformation">
              <span>个人信息</span>
            </router-link>
          </MenuItem>
        </SubMenu>
        {/* <SubMenu
          key="sub2"
          titleClick="titleClick"
          title={
            <span>
              <FundViewOutlined />
              <span>工单系统</span>
            </span>
          }>
          <ItemGroup key="sub22">
            <MenuItem key="workflowRegulate">
              <router-link to="/BasicLayout/workflowRegulate">
                <UserOutlined />
                <span>工单管理</span>
              </router-link>
            </MenuItem>
            <MenuItem key="workOrderManagement">
              <router-link to="/BasicLayout/workOrderManagement">
                <span>
                  <SwitcherOutlined />
                  工单模板
                </span>
              </router-link>
            </MenuItem>
            <MenuItem key="workflow">
              <router-link to="/BasicLayout/workflow">
                <span>
                  <FundViewOutlined />
                  工作流
                </span>
              </router-link>
            </MenuItem>
          </ItemGroup>
        </SubMenu> */}


      </Menu>
    )
  },
}

export default LeftSideMenu
