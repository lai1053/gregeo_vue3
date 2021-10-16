/**
 * /*
 * vuex的mutations模块
 *
 * @format
 */

// import Vue from 'vue'
import { RECEIVE_TOKEN, RECEIVE_USER_INFO, RECEIVE_CUSTOMER_PROFILE_INFO, RECEIVE_SCHEMA } from './mutation-types'

export default {
  [RECEIVE_TOKEN](state, { token }) {
    state.token = token
  },
  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RECEIVE_CUSTOMER_PROFILE_INFO](state, { info }) {
    state.customerProfileInfo = info
  },
  [RECEIVE_SCHEMA](state, { schema }) {
    debugger
    state.schema = schema
  },
}
