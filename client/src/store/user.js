import Taro from '@tarojs/taro';
import { login, logout } from '@/apis/user.js';
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
  //获取openid
  async getOpenId({ commit }) {
    try {
      const { errMsg, result } = await Taro.cloud.callFunction({ name: 'login' });
      if (errMsg === 'cloud.callFunction:ok') {
        commit('set_openid', result.openid);
        Promise.resolve(result);
      } else {
        Promise.reject(errMsg);
      }
    } catch (error) {
      Promise.reject(error);
    }
  },
  //登录
  async login({ commit, state, dispatch }) {
    if (state.openid !== '') {
      try {
        const { code, data } = (await login()).data;
        if (code !== -1) {
          commit('set_userInfo', data.userInfo);
          Promise.resolve(data);
        } else {
          //从后台获取对应自定义响应码的文字描述
          Promise.reject();
        }
      } catch (error) {
        Promise.reject(error);
      }
    } else {
      dispatch('getOpenId');
    }
  },
  //登出
  async logout({ commit }) {
    try {
      const { code, data } = await logout();
      if (code !== -1) {
        commit('reset_openid');
        commit('reset_userInfo');
        Promise.resolve();
      } else {
        Promise.reject();
      }
    } catch (error) {
      Promise.reject(error);
    }
  },
};
const getters = {
  isLogin({ state }) {
    return state.openid.length !== 0;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
