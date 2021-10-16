/**
 * /*
 * 与后台交互模块
 *
 * @format
 */

import ajax from './ajax'
/**
 *德恒致远用户登录模块
 */

/**
 * 注册账户
 */
export const register = data => ajax('/api/manage/user/register/', data, 'POST')
/**
 * 用户登录
 */
export const apiTokenAuth = data => ajax('/api/manage/user/login/', data, 'POST')
/**
 * 用户忘记密码
 */
export const recoverPassword = data => ajax('/api/manage/user/password/recover/', data, 'POST')

/**
 * 刷新用户token
 */
export const apiTokenRefresh = () => ajax('/api/manage/user/api-token-refresh/')
/**
 * 检验用户token
 */
export const apiTokenVerify = () => ajax('/api/manage/user/api-token-verify/')

/**
 * 获取用户基本信息
 */

export const getBasicUserInfo = (data, type) => ajax('/api/manage/user/userinfo/retrieve/', (data = {}), (type = 'GET'))

/**
 * 修改用户基本信息
 */

export const putBasicUserInfo = (data, type) => ajax(`/api/manage/user/userinfo/reset/`, data, (type = 'POST'))

/**
 * 修改用户密码
 */

export const resetUserPassword = (data, type) => ajax(`/api/manage/user/password/reset/`, data, (type = 'POST'))

/**
 * 获取邮箱验证码
 */

export const send_email_code = (data, type) => ajax('/api/manage/common/send-email-code/', data, (type = 'POST'))

/**
 * 获取oss上传信息
 */
export const yun_osss_token = (data, type) => ajax('/api/manage/common/aliyun-oss-token/', (data = {}), (type = 'GET'))

/**
 * 获取配置文件
 */
export const getSchemaData = (data, type) => ajax('/api/manage/common/models/schema/', (data = {}), (type = 'GET'))
/**
 * 获取ref配置项
 */
export const getRefOption = (url, data, type) => ajax(url, (data = {}), (type = 'GET'))
/**
 * 获取企业资质的option选项
 */
export const getQualification = (data, type) =>
  ajax('/api/manage/customer/qualitycertificate/', (data = {}), (type = 'GET'))
/**
 * 创建客户标签
 */
export const postCustomertag = (data, type) => ajax('/api/manage/customer/customertag/', data, (type = 'POST'))
/**
 * 获取常用的标签列表
 */
export const getCustomertag = (data, type) => ajax('/api/manage/customer/customertag/', (data = {}), (type = 'GET'))
/**
 * 获取常用的标签列表
 */
export const getPlanprocesstemplate = (data, type) =>
  ajax('/api/manage/customer/planprocesstemplate/', (data = {}), (type = 'GET'))
/**
 * 获取当前登录用户所属部门以及下级部门列表
 */
export const getBelong = (data, type) => ajax('/api/manage/company/department/belong/', (data = {}), (type = 'GET'))
