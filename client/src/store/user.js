import Taro from '@tarojs/taro';

import { get_userInfo, logout } from '@/apis/user.js';

const state = {
  openid: '',
  userInfo: {},
};
const mutations = {
  set_openid(state, openid) {
    state.openid = openid;
  },
  reset_openid(state) {
    state.openid = '';
  },
  set_userInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  reset_userInfo(state) {
    state.userInfo = {};
  },
};
const actions = {
  /**
   * 获取openid
   */
  async getOpenid({ commit }) {
    try {
      const { errMsg, result } = await Taro.cloud.callFunction({ name: 'login' });
      if (errMsg === 'cloud.callFunction:ok') {
        commit('set_openid', result.openid);
        await Taro.setStorage('openid', result.openid);
        return Promise.resolve(result);
      } else {
        return Promise.reject(errMsg);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  /**
   * 小程序端的登录本质只是根据openid向后端请求个人信息
   * 根据code即自定义状态码确定该openid是否已
   */
  async login({ commit, state, dispatch }) {
    if (state.openid !== '') {
      try {
        const query = { openid: state.openid };
        const { code, data } = (await get_userInfo(query)).data;
        if (code !== -1) {
          if (code === 101) {
            commit('set_userInfo', { has_register: false });
          } else if (code === 102) {
            commit('set_userInfo', data.userInfo);
            return Promise.resolve(data);
          } else {
            return Promise.reject('错误');
          }
        } else {
          //从后台获取对应自定义响应码的文字描述
          return Promise.reject('错误');
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      dispatch('getOpenId');
    }
  },
  /**
   * 小程序端的登出本质只是清空本地缓存
   */
  async logout({ commit }) {
    commit('reset_openid');
    commit('reset_userInfo');
    await Taro.removeStorage('openid');
  },
};
const getters = {
  /**
   * 由于是判断函数则必须同步
   */
  isLogin(state) {
    return state.has_register;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
