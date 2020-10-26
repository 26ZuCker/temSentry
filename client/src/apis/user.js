import Taro from '@tarojs/taro';
import apiConfig from './apiConfig.js';

const { BASE_API, promisifyHttp } = apiConfig;

const userApiMap = {
  login: { method: 'POST', url: 'login' },
  logout: { method: 'POST', url: 'logout' },
  hasPost: { method: 'POST', url: 'hasPost' },
};

const login = promisifyHttp(Taro, BASE_API, userApiMap['login']);
const logout = promisifyHttp(Taro, BASE_API, userApiMap['logout']);
/**
 * 是否填写过该问卷
 */
const hasPost = promisifyHttp(Taro, BASE_API, userApiMap['hasPost']);

export { login, logout, hasPost };