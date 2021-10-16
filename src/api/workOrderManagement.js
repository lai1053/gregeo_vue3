/** @format */

import ajax from '@/api/ajax'
/**
 *获取工单模板
 */

export const getTemplate = (data, type) => ajax('/api/manage/workflow/ticket/template/', (data = {}), (type = 'GET'))
/**
 *新建工单模板
 */
export const postTemplate = (data, type) => ajax('/api/manage/workflow/ticket/template/', data, (type = 'POST'))
/**
 *修改工单模板
 */
export const putTemplate = (data, type) =>
  ajax(`/api/manage/workflow/ticket/template/${data.id}/`, data, (type = 'PUT'))
/**
 *获取一条工单模板的详情
 */
export const getSingleTemplate = (data, type) =>
  ajax(`/api/manage/workflow/ticket/template/${data.id}/`, (data = {}), (type = 'GET'))
/**
 *删除工单模板
 */
export const delTemplate = (data, type) =>
  ajax(`/api/manage/workflow/ticket/template/${data.id}/`, (data = {}), (type = 'DELETE'))
