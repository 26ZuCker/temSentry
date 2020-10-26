import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const userApiMap = {
  get_userInfo: { method: 'POST', url: 'get_userInfo' },
  logout: { method: 'POST', url: 'logout' },
  hasPost: { method: 'POST', url: 'hasPost' },
};

const get_userInfo = promisifyHttp(Taro, BASE_API, userApiMap['get_userInfo']);
const logout = promisifyHttp(Taro, BASE_API, userApiMap['logout']);
/**
 * 是否填写过该问卷
 */
const hasPost = promisifyHttp(Taro, BASE_API, userApiMap['hasPost']);

export { get_userInfo, logout, hasPost };
