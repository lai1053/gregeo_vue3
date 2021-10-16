import ajax from '@/api/ajax'

/**
 * 获取角色列表
 */
export const getDepartment = (data, type) => ajax('/api/manage/company/role/', (data = {}), (type = 'GET'))
/**
 * 创建用户角色
 */
export const createRole = (data, type) => ajax('/api/manage/company/role/', data, (type = 'POST'))
/**
 * 修改用户角色
 */
export const modifyRole = (data, type) => ajax(`/api/manage/company/role/${data.id}/`, data, (type = 'PUT'))
/**
 * 根据当前角色请求列表数据
 */
export const getUserList = (data, type) => ajax(`/api/manage/company/user/`, data, (type = 'GET'))
