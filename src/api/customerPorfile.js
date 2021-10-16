/**
 * 德恒致远客户资料模块模块
 *
 * @format
 */

import ajax from '@/api/ajax'

// 获取配置文件
/**
 * 获取配置文件
 */
export const schema = (data, type) => ajax('/api/manage/common/models/schema/', (data = {}), (type = 'GET'))
/**
 * CRUD 企业信息列表
 */
/**
 * 列表查询
 */
export const getList = (url, data, type) => ajax(url, data, (type = 'GET'))

export const create = (url, data, type) => ajax(url, data, (type = 'POST')) //创建一条企业数据

export const findSingle = (url, data, type) => ajax(`${url}`, data, (type = 'GET')) // 查找单条企业数据

export const findAllSingle = (url, data, type) => ajax(`${url}`, (data = {}), (type = 'GET')) // 查找企业所有数据

export const upData = (url, data, type) => ajax(`${url}`, data, (type = 'PUT')) // 更新一条数据

export const deleteDate = (url, data, type) => ajax(`${url}`, (data = {}), (type = 'DELETE')) // 删除一条数据
