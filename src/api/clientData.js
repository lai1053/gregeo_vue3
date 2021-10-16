/**
 * 德恒致远客户资料模块模块
 *
 * @format
 */

import ajax from '@/api/ajax'
/**
 * 获取配置文件
 */
export const schema = (data, type) => ajax('/api/common/models/schema/', (data = {}), (type = 'GET'))
/**
 * 获取文件上传目标地址
 */
export const yun_osss_token = (data, type) => ajax('/api/common/aliyun-oss-token/', (data = {}), (type = 'GET'))
/**
 * 列表查询
 */
export const enterpriselist = (data, type) => ajax('/api/user/manage/enterprise/', data, (type = 'GET'))
/**
 * 新增用户数据
 */

export const enterprise = (data, type) => ajax('/api/user/manage/enterprise/', data, (type = 'POST'))

/**
 * 修改用户数据
 */

export const enterprisePut = (data, type) => ajax(`/api/user/manage/enterprise/${data.id}/`, data, (type = 'PUT'))

/**
 * 删除客户API
 */

export const deleteUser = (url, data, type) => ajax(url, data, (type = 'DELETE'))

/**
 * 获取单条客户信息
 */

export const getOneUserInfo = (url, data, type) => ajax(`${url}${data.id}/`, (data = {}), (type = 'GET'))

/**
 * CRUD 企业信息列表
 */
export const create = (url, data, type) => ajax(url, data, (type = 'POST'))

export const findAllSingle = (url, data, type) => ajax(`${url}`, (data = {}), (type = 'GET'))
export const findSingle = (url, data, type) => ajax(`${url}${data.id}/`, (data = {}), (type = 'GET'))

export const upDate = (url, data, type) => ajax(`${url}${data.id}/`, data, (type = 'PUT'))

export const deleteDate = (url, data, type) => ajax(`${url}${data.id}/`, (data = {}), (type = 'DELETE'))

/**
 * 获取企业信息树状图配置
 */
export const getTree = (url, data, type) =>
  ajax((url = '/api/user/manage/enterprise/schema/'), (data = {}), (type = 'GET'))

/**
 * 获取企业联级信息
 */
export const getCascaer = (url, data, type) => ajax(url, (data = {}), (type = 'GET'))
