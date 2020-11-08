import Taro from '@tarojs/taro';
import { getOpenid, getWCInfo } from '@util/WeChat';
import { get_userInfo } from '@api/user.js';

const state = {
  openid: '',
  userInfo: null,
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
    state.userInfo = null;
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
        //由于会同时登陆过好几个用户，则先获取用户信息
        await Taro.setStorage({ key: 'openid', data: result.openid });
        return Promise.resolve(result);
      } else {
        return Promise.reject(errMsg);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  /**
   * 获取存储在微信的用户信息如昵称和头像url，优先
   */
  async getUserWeChat({ commit }) {
    try {
      await Taro.getSetting({
        async success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            await Taro.getUserInfo({
              success: function (res) {
                console.log(res);
                commit('set_userInfo', res.userInfo);
                return Promise.resolve(res.userInfo);
              },
            });
          }
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  /**
   * 小程序端的登录本质只是根据openid向后端请求个人信息
   * 根据code即自定义状态码确定该openid是否已
   * 小程序端不需要登出
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
      await dispatch('getOpenid');
      dispatch('login');
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
