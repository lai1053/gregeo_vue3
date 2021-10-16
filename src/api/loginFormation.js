import ajax from '@/api/ajax'

export const getList = (url, data, type) => ajax(url, data, (type = 'GET'))
