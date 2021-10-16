/**
 * /*
 * vuex的actions模块
 *
 * @format
 */

import { getBasicUserInfo, getSchemaData } from '../api'

import { RECEIVE_TOKEN, RECEIVE_USER_INFO, RECEIVE_CUSTOMER_PROFILE_INFO, RECEIVE_SCHEMA } from './mutation-types'

export default {
  //存储token
  getToken({ commit, state }, info) {
    commit(RECEIVE_TOKEN, { token: info })
  },
  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await getBasicUserInfo()
    if (result.code === 0) {
      let storage = window.localStorage
      storage.nickname = result.result.nickname
      storage.realname = result.result.realname
      storage.avatar = result.result.avatar
      storage.username = result.result.username
      commit(RECEIVE_USER_INFO, { userInfo: result.result })
    }
  },
  // 存储单条用户详情信息
  getCustomerProfileInfo({ commit, state }, info) {
    localStorage.setItem('customerProfileInfo', JSON.stringify(info))
    commit(RECEIVE_CUSTOMER_PROFILE_INFO, { info })
  },
  //  获取模型表
  async getSchema({ commit, state }) {
    const res = await getSchemaData()
    localStorage.setItem('schema', JSON.stringify(res.result))
    commit(RECEIVE_SCHEMA, { schema: res.result })
  },
}
