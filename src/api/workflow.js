/** @format */

import ajax from '@/api/ajax'

/**
 *模糊查询用户数据
 */
export const fuzzy_query = (data, type) => ajax('/api/user/user/fuzzy_query/', data, (type = 'GET'))
/**
 *获取工作流页面数据
 */
export const getWorkflow = (data, type) => ajax('/api/manage/workflow/', (data = {}), (type = 'GET'))
/**
 *获取单个工作流视图详情
 */
export const getSingleWorkflow = (data, type) => ajax(`/api/manage/workflow/${data.id}/`, (data = {}), (type = 'GET'))
/**
 *新增工作流
 */
export const addSingleWorkflow = (data, type) => ajax('/api/manage/workflow/', data, (type = 'POST'))
/**
 *更新工作流
 */
export const updataWorkflow = (data, type) => ajax(`/api/manage/workflow/${data.id}/`, data, (type = 'PUT'))
/**
 *删除工作流
 */
export const deleteWorkflow = (data, type) => ajax(`/api/manage/workflow/${data.id}/`, (data = {}), (type = 'DELETE'))
