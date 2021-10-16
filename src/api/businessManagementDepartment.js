import ajax from '@/api/ajax'

/**
 * 获取当前主企业信息
 */
export const currentInfo = (data, type) => ajax('/api/manage/company/info/current/', (data = {}), (type = 'GET'))

/**
 * 获取部门列表
 */
export const getDepartment = (data, type) => ajax('/api/manage/company/department/', (data = {}), (type = 'GET'))
/**
 * 创建部门
 */
export const createDepartment = (data, type) => ajax('/api/manage/company/department/', data, (type = 'POST'))
/**
 * 修改部门信息
 */
export const modifyDepartment = (data, type) => ajax(`/api/manage/company/department/${data.id}/`, data, (type = 'PUT'))
/**
 * 根据当前部门请求列表数据
 */
export const getUserList = (data, type) => ajax(`/api/manage/company/user/`, data, (type = 'GET'))
/**
 * 创建当前部门的新用户
 */
export const createCompanyUser = (data, type) => ajax(`/api/manage/company/user/`, data, (type = 'POST'))
/**
 * 获取当前部门列表数据详情
 */
export const getCompanyUser = (data, type) => ajax(`/api/manage/company/user/${data.id}/`, data, (type = 'GET'))
/**
 * 获取当前部门列表数据详情需要的角色信息
 */
export const getRole = (data, type) => ajax(`/api/manage/company/role/`, data, (type = 'GET'))
