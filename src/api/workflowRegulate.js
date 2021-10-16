/** @format */

import ajax from '@/api/ajax'
const url = '/api/manage/workflow/ticket/record/'

export const getRecord = (data, type) => ajax(url, (data = {}), (type = 'GET'))
export const postRecord = (data, type) => ajax(url, data, (type = 'POST'))
export const putRecord = (data, type) => ajax(`${url}${data.id}/`, data, (type = 'PUT'))
export const getSinRecord = (data, type) => ajax(`${url}${data.id}/`, (data = {}), (type = 'GET'))
export const delRecord = (data, type) => ajax(`${url}${data.id}/`, (data = {}), (type = 'DELETE'))
export const roamPostRecord = (data, type) => ajax(`${url}${data.id}/roam/`, data, (type = 'POST'))
export const viewRecord = (data, type) => ajax(`${url}${data.id}/view/`, (data = {}), (type = 'GET'))
