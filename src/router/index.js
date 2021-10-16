/** @format */

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import BasicLayout from '@/layout/BasicLayout'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login/index'),
  },
  {
    path: '/BasicLayout',
    component: BasicLayout,
    children: [
      {
        path: 'loadingPage', //登录缓冲区
        component: () => import('@/views/LoadingPage/index'),
      },
      {
        path: 'clientData', //老客户资料
        component: () => import('@/views/ClitenData/index'),
      },
      {
        path: 'customerProfile', //客户资料
        component: () => import('@/views/CustomerProfile/index'),
      },
      {
        path: 'customerProfileInfo', //客户资料详情
        component: () => import('@/views/CustomerProfileInfo/index'),
      },
      {
        path: 'businessManagementDepartment', //企业管理部门
        component: () => import('@/views/BusinessManagementDepartment/index'),
      },
      {
        path: 'businessManagementRoles', //企业管理角色
        component: () => import('@/views/BusinessManagementRoles/index'),
      },
      {
        path: 'businessManagementUser', //企业管理用户
        component: () => import('@/views/BusinessManagementUser/index'),
      },
      {
        path: 'personalInformation', //个人信息修改
        component: () => import('@/views/PersonalInformation/index'),
      },
      {
        path: 'logInformation', //日志信息管理
        component: () => import('@/views/LogInformation/index'),
      },
      {
        path: 'workflowRegulate', //工单管理
        component: () => import('@/views/WorkfowRegulate/index'),
      },
      {
        path: 'workOrderManagement', // 工单模板
        component: () => import('@/views/WorkOrderTemplate/index'),
      },
      {
        path: 'workflow', // 工作流
        component: () => import('@/views/Workflow/index'),
      },
    ],
  },
  // {
  //   path: '/clientData', //客户资料
  //   component: () => import('@/components/ClitenData/index')
  //
  // },
]

const router = createRouter({
  history: createWebHistory('/'),
  mode: 'history',
  routes,
})

export default router
